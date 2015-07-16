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

#define FREEALL free(h);free(g);

/**
 * 1. Projects the positions of the vertices vs of length nv on to the array
 * vsarr of length nv * 2
 * 2. Projects the id's of the connecting vertices of the bonds bs of length bn
 * to the array bsarr of length nb * 2
 */
static void graph_toarrays(Vptr *vs, Bptr *bs, float *vsarr, 
        int *bsarr, const int nv, const int nb)
{
    int i;
    for (i = 0; i < nv; i++) {
        *(vsarr + i * 2) = (*(vs + i))->pos.x;
        *(vsarr + i * 2 + 1) = (*(vs + i))->pos.y;
    }
    for (i = 0; i < nb; i++) {
        *(bsarr + i * 2) = (*(bs + i))->fst->id;
        *(bsarr + i * 2 + 1) = (*(bs + i))->snd->id;
    }
}

void linmin(Gptr graph, int n, float *fret, float (*func)(Gptr));

void frprmn(Gptr graph, float ftol, int *iter, float *fret, 
        float (*func)(Gptr), void (*dfunc)(Gptr))
{
    int i, its, n;
    float gg, gam, fp, dgg;
    float *g, *h;

    float *varr;
    int *barr;
    varr = malloc(sizeof(float) * graph->nv * 2);
    barr = malloc(sizeof(int) * graph->nb * 2);
    
    n = graph->nv * 2;
    
    g = vector(n);
    h = vector(n);
    
    fp = (*func)(graph);
    (*dfunc)(graph);
        
    for (i = 0; i < n; i += 2) {
        Vptr vptr = *(graph->vs + i / 2);
        g[i] = -vptr->vel.x;
        g[i + 1] = -vptr->vel.y;
        vptr->vel.x = h[i] = g[i];
        vptr->vel.y = h[i + 1] = g[i + 1];
    }
    for (its = 0; its < ITMAX; its++) {
        
        graph_toarrays(graph->vs, graph->bs, varr, barr, graph->nv, graph->nb);

        if (EMSCRIPT) {
            EM_ASM_({
                window.EXPORTS.processCdata($0, $1, $2, $3);
            }, varr, barr, graph->nv * 2, graph->nb * 2);
            emscripten_sleep(500);
        } else {
            sleep(0.5);
            for (i = 0; i < graph->nv; i++) {
                /*printf("%f %f\n", (*(graph.vs + i))->pos.x, */
                        /*(*(graph.vs + i))->pos.y);*/
            }
        }

        *iter = its;
        linmin(graph, n, fret, func);
        if (2.0 * fabs(*fret - fp) <= ftol * (fabs(*fret) + fabs(fp) + EPS)) {
            free(varr);
            free(barr);
            FREEALL;
            return;
        }
        fp = (*func)(graph);
        (*dfunc)(graph);
        dgg = gg = 0.0;
        for (i = 0; i < n; i += 2) {

            gg += g[i] * g[i];
            gg += g[i + 1] * g[i + 1];

            Vptr vptr = *(graph->vs + i / 2);
            dgg += (vptr->vel.x + g[i]) * vptr->vel.x;
            dgg += (vptr->vel.y + g[i + 1]) * vptr->vel.y;

        }
        if (fabs(gg) < EPS) {
            free(varr);
            free(barr);
            FREEALL;
            return;
        }
        gam = dgg / gg;
        for (i = 0; i < n; i += 2) {
            Vptr vptr = *(graph->vs + i / 2);
            g[i] = -vptr->vel.x;
            g[i + 1] = -vptr->vel.y;
            vptr->vel.x = h[i] = g[i] + gam * h[i];
            vptr->vel.y = h[i + 1] = g[i + 1] + gam * h[i + 1];

        }
    }
    free(varr);
    free(barr);
    FREEALL;
    return;
    /*rt_error("Too many iterations in frprmn()");*/
}

