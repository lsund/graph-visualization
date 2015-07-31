/*****************************************************************************

 * Author : Numerical recepies in C, modiefied by Ludvig Sundström

 * File Name : frprmn.c

 * Purpose : Performs Fletcher-Reeves-Polak-Ribiere minimization GPiven a
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

#include "graph.h"
#include "vertex.h"
#include "zone2d.h"
#include "constants.h"
#include "util.h"

#include "emscripten.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

static void js_interact(float *varr, int *barr, int *zarr, GP gp)
{
    if (EMSCRIPT) {
        EM_ASM_({
            window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5);
        }, varr, barr, zarr, gp->nv * 2, gp->nb * 2, gp->nz * 3);
        emscripten_sleep(INTERVAL);
    }
}

/**
 * 1. Projects the positions of the vertices vs of length nv on to the array
 * vsarr of length nv * 2
 * 2. Projects the id's of the connecting vertices of the bonds bs of length bn
 * to the array bsarr of length nb * 2
 */
static void graph_toarrays(GP gp, float *vsarr, int *bsarr, int *zarr)
{
    int i;
    for (i = 0; i < gp->nv; i++) {
        *(vsarr + i * 2) = (*(gp->vps + i))->pos.x;
        *(vsarr + i * 2 + 1) = (*(gp->vps + i))->pos.y;
    }
    for (i = 0; i < gp->nb; i++) {
        *(bsarr + i * 2) = (*(gp->bps + i))->fst->id;
        *(bsarr + i * 2 + 1) = (*(gp->bps + i))->snd->id;
    }
    for (i = 0; i < gp->nz; i++) {
        ZP z = *(gp->zps + i);
        *(zarr + i * 3) = z->minx;
        *(zarr + i * 3 + 1) = z->miny;
        *(zarr + i * 3 + 2) = z->width;
    }
}

void linmin(GP gp, float *fret);

void frprmn(GP gp, float ftol, int *iter, float *fret)
{
    int i, its, n;
    float gg, gam, dgg;

    float *varr;
    int *barr;
    varr = malloc(sizeof(float) * gp->nv * 2);
    barr = malloc(sizeof(int) * gp->nb * 2);
    
    n = gp->nv * 2;
    
    (*gp->calc_e)(gp);
    (*gp->calc_f)(gp);

    float e;
    e = gp->energy;
        
    for (i = 0; i < n; i += 2) {
        VP vp = *(gp->vps + i / 2);
        vp->g.x = -vp->vel.x;
        vp->g.y = -vp->vel.y;
        vp->vel.x = vp->h.x = vp->g.x;
        vp->vel.y = vp->h.y = vp->g.y;
    }
    for (its = 0; its < ITMAX; its++) {
        
        int *zarr = malloc(sizeof(int) * gp->nz * 3);
        graph_toarrays(gp, varr, barr, zarr);

        if (EMSCRIPT) {
            js_interact(varr, barr, zarr, gp);
        } else {
            for (i = 0; i < gp->nv; i++) {
                //NOOP
            }
        }
        free(zarr);

        *iter = its;
        linmin(gp, fret);
        if (2.0 * fabs(*fret - e) <= ftol * (fabs(*fret) + fabs(e) + EPS)) {
            free(varr);
            free(barr);
            return;
        }
        (*gp->calc_e)(gp);
        (*gp->calc_f)(gp);
        e = gp->energy;
        dgg = gg = 0.0;
        for (i = 0; i < gp->nv; i++) {
            VP vp = *(gp->vps + i);
            gg += vp->g.x * vp->g.x;
            gg += vp->g.y * vp->g.y;
            dgg += (vp->vel.x + vp->g.x) * vp->vel.x;
            dgg += (vp->vel.y + vp->g.y) * vp->vel.y;
        }
        if (fabs(gg) < EPS) {
            free(varr);
            free(barr);
            return;
        }
        gam = dgg / gg;
        for (i = 0; i < gp->nv; i++) {
            VP vp = *(gp->vps + i);
            vp->g.x = -vp->vel.x;
            vp->g.y = -vp->vel.y;
            vp->vel.x = vp->h.x = vp->g.x + gam * vp->h.x;
            vp->vel.y = vp->h.y = vp->g.y + gam * vp->h.y;
        }
    }
    free(varr);
    free(barr);
    return;
}

