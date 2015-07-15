/*****************************************************************************

 * Author : Numerical recepies in C, modiefied by Ludvig Sundström

 * File Name : frprmn.c

 * Purpose : Performs Fletcher-Reeves-Polak-Ribiere minimization Given a
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

#define FREEALL free(xi);free(h);free(g);

/**
 * 1. Projects the positions of the vertices vs of length nv on to the array
 * vsarr of length nv * 2
 * 2. Projects the id's of the connecting vertices of the bonds bs of length bn
 * to the array bsarr of length nb * 2
 */
static void graph_toarrays(struct vertex **vs, struct bond **bs, float *vsarr, 
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

void linmin(struct vertex **vs, struct bond **bs, int nv, int nb, float xi[],
        int n, float *fret, float (*func)());

void frprmn(struct vertex **vs, struct bond **bs, int nv, int nb, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)())
{
    int i, its, n;
    float gg, gam, fp, dgg;
    float *g, *h, *xi;

    float *varr;
    int *barr;
    varr = malloc(sizeof(float) * nv * 2);
    barr = malloc(sizeof(int) * nb * 2);
    
    n = nv * 2;
    
    g = vector(n);
    h = vector(n);
    xi = vector(n);

    fp = (*func)(vs, bs, nv, nb);
    (*dfunc)(vs, bs, nv, nb, xi);
        
    for (i = 0; i < n; i++) {
        g[i] = -xi[i];
        xi[i] = h[i] = g[i];
    }
    for (its = 0; its < ITMAX; its++) {
        
        graph_toarrays(vs, bs, varr, barr, nv, nb);

        if (EMSCRIPT) {
            EM_ASM_({
                window.EXPORTS.processCdata($0, $1, $2, $3);
            }, varr, barr, nv * 2, nb * 2);
            emscripten_sleep(500);
        } else {
            sleep(0.5);
            for (i = 0; i < nv; i++) {
                printf("%f %f\n", (*(vs + i))->pos.x, (*(vs + i))->pos.y);
            }
        }

        *iter = its;
        linmin(vs, bs, nv, nb, xi, n, fret, func);
        if (2.0 * fabs(*fret - fp) <= ftol * (fabs(*fret) + fabs(fp) + EPS)) {
            free(varr);
            free(barr);
            FREEALL;
            return;
        }
        fp = (*func)(vs, bs, nv, nb);
        (*dfunc)(vs, bs, nv, nb, xi);
        dgg = gg = 0.0;
        for (i = 0; i < n; i++) {
            gg += g[i] * g[i];
            dgg += (xi[i] + g[i]) * xi[i];
        }
        if (fabs(gg) < EPS) {
            free(varr);
            free(barr);
            FREEALL;
            return;
        }
        gam = dgg / gg;
        for (i = 0; i < n; i++) {
            g[i] = -xi[i];
            xi[i] = h[i] = g[i] + gam * h[i];
        }
    }
    free(varr);
    free(barr);
    FREEALL;
    return;
    /*rt_error("Too many iterations in frprmn()");*/
}

