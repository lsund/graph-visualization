/*****************************************************************************

* File Name: gradient.c

* Author: Ludvig Sundström

* Description: The gradient of the objective function.

* Creation Date: 06-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "minimizer.h"
#include "graph.h"
#include "constants.h"
#include "util.h"

struct vertex **vs;
struct bond *bs;
int dim, nv, elen, sx, sy, nb;

static void addForce(struct point f, int i, float df[])
{
    df[i * 2] += f.x;
    df[i * 2 + 1] += f.y;
}

static void df1(float df[])
{
    int i, cx, cy;
    float dx, dy;
    struct vertex *vi;
    struct point frc;
    cx = sx / 2;
    cy = sy / 2;
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dx = vi->pos->x - (float) cx;    
        dy = vi->pos->y - (float) cy;
        frc.x = -2 * WG * dx;
        frc.y = -2 * WG * dy;
        addForce(frc, i, df);
    }
}

static void df2rep(float df[])
{
    int i, j;
    float dij, dx, dy, critlen;
    struct point frci;
    struct vertex *vi, *vj;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            dx = vi->pos->x - vj->pos->x;
            dy = vi->pos->y - vj->pos->y; 
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) <  0.01) {
                dij = 0.01;
            } 
            critlen = vi->radius + vj->radius + PADDING;
            if (critlen > dij) {
                frci.x = -2 * WR * dx * (critlen - dij) / dij;
                frci.y = -2 * WR * dy * (critlen - dij) / dij;
            } else {
                frci.x = 0;
                frci.y = 0;
            }
            addForce(frci, i, df);
            addForce(negate(frci), j, df);
        }
    }
}

static void df2attr(float df[])
{
    int i;
    float d0i, dx, dy, di, wi;
    struct bond bi;
    struct point frci;
    for (i = 0; i < nb; i++) {
        bi = *(bs + i);  
        wi = bi.fst->mass * bi.snd->mass * DEFAULT_STIFFNESS;
        d0i = bi.dist0 * elen;
        dx = bi.fst->pos->x - bi.snd->pos->x;
        dy = bi.fst->pos->y - bi.snd->pos->y; 
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  0.01) {
            di = 0.01;
        } 
        frci.x = -2 * wi * dx * (di - d0i) / di;
        frci.y = -2 * wi * dy * (di - d0i) / di;
        addForce(frci, bi.fst->id, df);
        addForce(negate(frci), bi.snd->id, df);
    }
}

static void df2(float df[]) 
{
    df2attr(df);
    df2rep(df);
}


void df3(struct point *ps, float df[])
{
    //TBI TODO
}

void df(float arr[], float df[]) 
{
    int i;
    for (i = 0; i < nv * 2; i += 2) {
        struct vertex *vptr = *(vs + i / 2);
        vptr->pos->x = arr[i];
        vptr->pos->y = arr[i + 1];
    }
    df1(df);
    df2(df);
    /*df3(ps, df);*/
}

