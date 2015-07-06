/*****************************************************************************

* File Name: gradient.c

* Author: Ludvig Sundström

* Description: The gradient of the objective function.

* Creation Date: 06-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "math2D.h"
#include "constants.h"
#include "util.h"

extern const int dim, nv, elen, sx, sy;
extern const float *fdm, *ml, *rl, *w0;

static void addForce(struct point f, int i, float df[])
{
    df[i * 2] += f.x;
    df[i * 2 + 1] += f.y;
}

static void df1(struct point *ps, float df[])
{
    int i, cx, cy;
    float dx, dy;
    struct point pi, frc;
    cx = sx / 2;
    cy = sy / 2;
    for (i = 0; i < nv; i++) {
        pi = *(ps + i);
        dx = pi.x - (float) cx;    
        dy = pi.y - (float) cy;
        frc.x = 2 * WG * dx;
        frc.y = 2 * WG * dy;
        addForce(frc, i, df);
    }
}

static void df2(struct point *ps, float df[]) 
{
    int i, j, ij; 
    float wij, d0ij, dij, dx, dy, ri, rj, critlen;
    struct point pi, pj, frca, frcr, frc;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            pi = *(ps + i);
            pj = *(ps + j);
            ij = i * nv + j;
            wij = ml[i] * ml[j] * w0[ij];
            d0ij = fdm[ij] * elen;
            dx = pi.x - pj.x;
            dy = pi.y - pj.y; 
            ri = rl[i];
            rj = rl[j];
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) <  0.01) {
                dij = 0.01;
            } 
            critlen = ri + rj + PADDING;
            // Need to filter out the actual connected nodes here TODO
            frca.x = -2 * wij * dx * (dij - d0ij) / dij;
            frca.y = -2 * wij * dy * (dij - d0ij) / dij;

            if (ri + rj + PADDING > dij) {
                frcr.x = -2 * WR * dx * (critlen - dij) / dij;
                frcr.y = -2 * WR * dy * (critlen - dij) / dij;
            } else {
                frcr.x = 0;
                frcr.y = 0;
            }
            frc = add(frca, frcr);
            addForce(frc, i, df);
            addForce(negate(frc), j, df);
        }
    }
}

void df3(struct point *ps, float df[])
{
    //TBI TODO
}

void df(float arr[], float df[]) 
{
    struct point* ps = arrtop(arr, nv);
    df1(ps, df);
    df2(ps, df);
    /*df3(ps, df);*/
    free(ps);
}

