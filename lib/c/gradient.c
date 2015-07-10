/*****************************************************************************

* File Name: gradient.c

* Author: Ludvig Sundström

* Description: The gradient of the objective function.

* Creation Date: 06-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "constants.h"
#include "util.h"

static void addForce(struct point f, int i, float *df)
{
    *(df + i * 2) += f.x;
    *(df + i * 2 + 1) += f.y;
}

static void dfunc1(struct vertex **vs, int nv, float *df)
{
    int i, cx, cy;
    float dx, dy;
    struct vertex *vi;
    struct point frc;
    cx = PANEL_X / 2;
    cy = PANEL_Y / 2;
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dx = vi->pos->x - (float) cx;    
        dy = vi->pos->y - (float) cy;
        frc.x = -2 * WG * dx;
        frc.y = -2 * WG * dy;
        addForce(frc, i, df);
    }
}

static void dfunc2rep(struct vertex **vs, int nv, float *df)
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

static void dfunc2attr(struct bond *bs, int nb, float *df)
{
    int i;
    float d0i, dx, dy, di, wi;
    struct bond bi;
    struct point frci;
    for (i = 0; i < nb; i++) {
        bi = *(bs + i);  
        wi = bi.fst->mass * bi.snd->mass * DEFAULT_STIFFNESS;
        d0i = bi.dist0 * SPRING_LENGTH;
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

static void dfunc2(struct vertex **vs, struct bond *bs, int nv, int nb, 
        float *df) 
{
    dfunc2attr(bs, nb, df);
    dfunc2rep(vs, nv, df);
}


void dfunc3(struct point *ps, struct bond *bs, float *df)
{
    //TBI TODO
}

void dfunc(struct vertex **vs, struct bond *bs, int nv, int nb, float *df) 
{
    dfunc1(vs, nv, df);
    dfunc2(vs, bs, nv, nb, df);
}


//////// TESTS 

#include "../../tests/minunit.h"

/*char *test_gradient() {*/

    /*struct vertex **vs_test;*/
    /*struct bond *bs_test;*/

    /*float gap = 100; */
    /*int nv = 8; */
    /*float dist = 1;*/
    /*float stiffness = 1;*/
    /*float mass = 1;*/
    /*float radius = 1;*/
    /*char type = 'r';*/

    /*return 0;*/
/*}*/

