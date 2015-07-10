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
#include "constants.h"
#include "util.h"

static void addForce(struct point f, int i, float *df)
{
    *(df + i * 2) += f.x;
    *(df + i * 2 + 1) += f.y;
}

static void df1(struct vertex **vs, float *df)
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

static void df2rep(struct vertex **vs, float *df)
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
            if (fabs(dij) < MIN_DIST) {
                dij = MIN_DIST;
            } 
            critlen = vi->radius + vj->radius + PADDING;
            if (critlen > dij) {
                frci.x = 2 * WR * dx * (dij - critlen) / dij;
                frci.y = 2 * WR * dy * (dij - critlen) / dij;
            } else {
                frci.x = 0;
                frci.y = 0;
            }
            addForce(frci, i, df);
            addForce(negate(frci), j, df);
        }
    }
}

static void df2attr(struct bond *bs, float *df)
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

static void df2(struct vertex **vs, struct bond *bs, float *df) 
{
    df2attr(bs, df);
    df2rep(vs, df);
}


void df3(struct point *ps, struct bond *bs, float *df)
{
    //TBI TODO
}

void df(struct vertex **vs, struct bond *bs, float *df) 
{
    df1(vs, df);
    df2(vs, bs, df);
}


//////// TESTS 

#include "../../tests/minunit.h"

char *test_gradient() {

    struct vertex **vs_test;
    struct bond *bs_test;

    float gap = 100; 
    int nv = 8; 
    float dist = 1;
    float stiffness = 1;
    float mass = 1;
    float radius = 1;
    char type = 'r';
    int sx = 300;
    int sy = 300;

    return 0;
}



