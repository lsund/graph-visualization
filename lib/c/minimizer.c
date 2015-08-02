/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 
 * Description: Defines an object able to 'minimize' the energy of the graph
 * G(V, B) created by the set of Vertices V and Bonds B defined in JSON format.
 
 * Creation Date: 24-06-2015

 *****************************************************************************/
/*****************************************************************************

 * Author : Numerical recepies in C, modiefied by Ludvig Sundström

 * File Name : conjugate_gradient.c

 * Purpose : Performs Fletcher-Reeves-Polak-Ribiere minimization
 * GraphPointeriven a Set of vertices vs and a set of bonds bs, performs
 * minimization on a
 * function func using its gradient calculated by dfunc. The convergence
 * tolerance of func is ftol.  Returned quatities are p - the location of the
 * minimum, iter - the number of iterations performed and fret - the minimum
 * value of value.  Calls routine linmin to perform line minimizations.

 * Creation Date : 25-06-2015

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <unistd.h>

#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "linmin.h"
#include "energy.h"
#include "gradient.h"

#include "emscripten.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

#define FREE_ALL free(varr); free(barr); free(zarr);

static void initialize_arrays(float **varr, int **barr, int **zarr, 
        int nv, int nb, int nz)
{
    *varr = (float *) Util_allocate(nv * 2, sizeof(float));
    *barr = (int *) Util_allocate(nb * 2, sizeof(int));
    *zarr = (int *) Util_allocate(nz * 3, sizeof(int));
}

/**
 * 1. Projects the positions of the vertices vs of length nv on to the array
 * vsarr of length nv * 2
 * 2. Projects the id's of the connecting vertices of the bonds bs of length bn
 * to the array bsarr of length nb * 2
 */
static void graph_toarrays(GraphPointer gp, float *vsarr, int *bsarr, int *zarr)
{
    int i;
    for (i = 0; i < gp->vs.n; i++) {
        *(vsarr + i * 2) = (*(gp->vs.set + i))->pos.x;
        *(vsarr + i * 2 + 1) = (*(gp->vs.set + i))->pos.y;
    }
    for (i = 0; i < gp->bs.n; i++) {
        *(bsarr + i * 2) = (*(gp->bs.set + i))->fst->id;
        *(bsarr + i * 2 + 1) = (*(gp->bs.set + i))->snd->id;
    }
    for (i = 0; i < gp->grd->nz; i++) {
        ZP z = *(gp->grd->zps + i);
        *(zarr + i * 3) = z->minx;
        *(zarr + i * 3 + 1) = z->miny;
        *(zarr + i * 3 + 2) = z->width;
    }
}

static void js_interact(float *varr, int *barr, int *zarr, GraphPointer gp)
{
    if (EMSCRIPT) {
        graph_toarrays(gp, varr, barr, zarr);
        EM_ASM_({
            window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5);
        }, varr, barr, zarr, gp->vs.n * 2, gp->bs.n * 2, gp->grd->nz * 3);
    }
}

static int close_to_target(float fret, float e, float ftol)
{
    return 2.0 * fabs(fret - e) <= ftol * (fabs(fret) + fabs(e) + EPS);
}

static void conjugate_gradient(GraphPointer gp, float ftol)
{

    float *varr;
    int *barr, *zarr;
    initialize_arrays(&varr, &barr, &zarr, gp->vs.n, gp->bs.n, gp->grd->nz);
    
    Graph_run_objective(gp);

    VertexSet_apply_forces(gp->vs, gp->vs.n, 1, INITIALIZE);

    float e;
    e = gp->e;
    
   int i; 
    for (i = 0; i < ITMAX; i++) {
        
        float fret = 0.0;
        linmin(gp, &fret);

        if (close_to_target(fret, e, ftol)) break;

        Graph_run_objective(gp);

        e = gp->e;

        float gg, dgg;
        dgg = gg = 0.0;
        VertexSet_calculate_score(gp->vs, gp->vs.n, &gg, &dgg); 

        if (fabs(gg) < EPS) break;
        
        float gam;
        gam = dgg / gg;
        VertexSet_apply_forces(gp->vs, gp->vs.n, gam, UPDATE);
    }
    js_interact(varr, barr, zarr, gp);
    FREE_ALL;
    return;
}

int Minimizer_run(const char *fname) 
{

    GraphPointer gp;
    gp = Graph_create(fname, Energy_local, Gradient_local);

    conjugate_gradient(gp, FTOL);

    printf("Done, local optimization\n");
    
    Graph_free(gp);

    return 0;
}


