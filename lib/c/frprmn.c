/*****************************************************************************

 * Author : Numerical recepies in C, modiefied by Ludvig Sundström

 * File Name : frprmn.c

 * Purpose : Performs Fletcher-Reeves-Polak-Ribiere minimization Gptriven a
 * Set of vertices vs and a set of bonds bs, performs minimization on a
 * function func using its gradient calculated by dfunc. The convergence
 * tolerance of func is ftol.  Returned quatities are p - the location of the
 * minimum, iter - the number of iterations performed and fret - the minimum
 * value of value.  Calls routine linmin to perform line minimizations.

 * Creation Date : 25-06-2015

 *****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>

#include "constants.h"
#include "util.h"

#include "emscripten.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

static void js_interact(float *varr, int *barr, int *zarr, Gptr graph)
{
    if (EMSCRIPT) {
        EM_ASM_({
            window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5);
        }, varr, barr, zarr, graph->nv * 2, graph->nb * 2, graph->nz * 3);
        emscripten_sleep(INTERVAL);
    }
}

/**
 * 1. Projects the positions of the vertices vs of length nv on to the array
 * vsarr of length nv * 2
 * 2. Projects the id's of the connecting vertices of the bonds bs of length bn
 * to the array bsarr of length nb * 2
 */
static void graph_toarrays(Gptr graph, float *vsarr, int *bsarr, int *zarr)
{
    int i;
    for (i = 0; i < graph->nv; i++) {
        *(vsarr + i * 2) = (*(graph->vs + i))->pos.x;
        *(vsarr + i * 2 + 1) = (*(graph->vs + i))->pos.y;
    }
    for (i = 0; i < graph->nb; i++) {
        *(bsarr + i * 2) = (*(graph->bs + i))->fst->id;
        *(bsarr + i * 2 + 1) = (*(graph->bs + i))->snd->id;
    }
    for (i = 0; i < graph->nz; i++) {
        Zptr z = *(graph->zs + i);
        *(zarr + i * 3) = z->minx;
        *(zarr + i * 3 + 1) = z->miny;
        *(zarr + i * 3 + 2) = z->width;
    }
}

void linmin(Gptr graph, int n, float *fret, void (*func)(Gptr));

void frprmn(Gptr graph, float ftol, int *iter, float *fret, 
        void (*func)(Gptr), void (*dfunc)(Gptr))
{
    int i, its, n;
    float gg, gam, fp, dgg;

    float *varr;
    int *barr;
    varr = malloc(sizeof(float) * graph->nv * 2);
    barr = malloc(sizeof(int) * graph->nb * 2);
    
    n = graph->nv * 2;
    
    (*func)(graph);
    (*dfunc)(graph);
    fp = graph->energy;
        
    for (i = 0; i < n; i += 2) {
        Vptr vptr = *(graph->vs + i / 2);
        vptr->g.x = -vptr->vel.x;
        vptr->g.y = -vptr->vel.y;
        vptr->vel.x = vptr->h.x = vptr->g.x;
        vptr->vel.y = vptr->h.y = vptr->g.y;
    }
    for (its = 0; its < ITMAX; its++) {
        
        int *zarr = malloc(sizeof(int) * graph->nz * 3);
        graph_toarrays(graph, varr, barr, zarr);

        if (EMSCRIPT) {
            js_interact(varr, barr, zarr, graph);
        } else {
            for (i = 0; i < graph->nv; i++) {
                //NOOP
            }
        }
        free(zarr);

        *iter = its;
        linmin(graph, n, fret, func);
        if (2.0 * fabs(*fret - fp) <= ftol * (fabs(*fret) + fabs(fp) + EPS)) {
            free(varr);
            free(barr);
            return;
        }
        (*func)(graph);
        (*dfunc)(graph);
        fp = graph->energy;
        dgg = gg = 0.0;
        for (i = 0; i < graph->nv; i++) {
            Vptr vptr = *(graph->vs + i);
            gg += vptr->g.x * vptr->g.x;
            gg += vptr->g.y * vptr->g.y;
            dgg += (vptr->vel.x + vptr->g.x) * vptr->vel.x;
            dgg += (vptr->vel.y + vptr->g.y) * vptr->vel.y;
        }
        if (fabs(gg) < EPS) {
            free(varr);
            free(barr);
            return;
        }
        gam = dgg / gg;
        for (i = 0; i < graph->nv; i++) {
            Vptr vptr = *(graph->vs + i);
            vptr->g.x = -vptr->vel.x;
            vptr->g.y = -vptr->vel.y;
            vptr->vel.x = vptr->h.x = vptr->g.x + gam * vptr->h.x;
            vptr->vel.y = vptr->h.y = vptr->g.y + gam * vptr->h.y;
        }
    }
    free(varr);
    free(barr);
    return;
}

