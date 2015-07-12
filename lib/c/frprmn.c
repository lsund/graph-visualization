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

#include "constants.h"
#include "util.h"

#define FREEALL free(xi);free(h);free(g);

void linmin(struct vertex **vs, struct bond **bs, int nv, int nb, float xi[],
        int n, float *fret, float (*func)());

void frprmn(struct vertex **vs, struct bond **bs, int nv, int nb, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)())
{
    int i, its, n;
    float gg, gam, fp, dgg;
    float *g, *h, *xi;
    
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
        *iter = its;
        linmin(vs, bs, nv, nb, xi, n, fret, func);
        if (2.0 * fabs(*fret - fp) <= ftol * (fabs(*fret) + fabs(fp) + EPS)) {
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
            FREEALL;
            return;
        }
        gam = dgg / gg;
        for (i = 0; i < n; i++) {
            g[i] = -xi[i];
            xi[i] = h[i] = g[i] + gam * h[i];
        }
    }
    FREEALL
    rt_error("Too many iterations in frprmn()");
}

