/*****************************************************************************

* File Name: objective.c 
* Author: Ludvig Sundström

* Description: The objective function F = F1 + F2 + F3 + F4 where FN considers
* N nodes. 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "util.h"

#include "../../tests/minunit.h"

static float func1(struct vertex **vs, int nv) {
    // Should we add repulsion from walls here? TODO
    int i, cx, cy;
    float dxc, dyc, rtn;
    struct vertex *vi;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;
    rtn = 0;
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dxc = vi->pos->x - (float) cx;    
        dyc = vi->pos->y - (float) cy;
        rtn += WG * (powf(dxc, 2) + powf(dyc, 2));
    }
    return rtn;
}

static float func2attr(struct bond **bs, int nb) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    struct bond *bptr;
    rtn = 0; for (i = 0; i < nb; i++) {
        bptr = *(bs + i);
        d0i = bptr->dist0 * SPRING_LENGTH;
        wi = bptr->fst->mass * bptr->snd->mass * bptr->k;
        dx = bptr->fst->pos->x - bptr->snd->pos->x;
        dy = bptr->fst->pos->y - bptr->snd->pos->y;
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  MIN_DIST) {
            di = MIN_DIST;
        } 
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}

static float func2rep(struct vertex **vs, int nv) 
{
    int i, j;
    float rtn, ri, rj, dx, dy, dij, critlen;
    struct vertex *vi, *vj;
    rtn = ri = rj = dx = dy = dij = critlen = 0.0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            if (vj != NULL  && vi != NULL && 
                    vi->pos != NULL && vj->pos != NULL) 
            {
                ri = vi->radius;
                rj = vj->radius;
                dx = vi->pos->x - vj->pos->x;
                dy = vi->pos->y - vj->pos->y;
                dij = sqrtf(dx * dx + dy * dy);
                if (fabs(dij) < MIN_DIST) {
                    dij = MIN_DIST;
                } 
                critlen = ri + rj + PADDING;
                if (critlen > dij) {
                    rtn += WR * powf(dij - critlen, 2);
                }
            } else {
                rt_error("NULL-pointer: func2rep()");
            }
        }
    }
    return rtn;
}

static float func2(struct vertex **vs, struct bond **bs, int nv, int nb) 
{
    return func2attr(bs, nb) + func2rep(vs, nv);
}

static float func3(struct vertex **vs, int nv) 
{
    int i, j, k; 
    float rtn, xji, yji, xjk, yjk, theta;
    struct vector2d *vecji, *vecjk;
    struct vertex *vi, *vj, *vk;
    rtn = 0; 
    for (i = 0; i < nv - 2; i++) {
        for (j = i + 1; j < nv - 1; j++) {
            for (k = j + 1; k < nv; k++) {
                vi = *(vs + i);
                vj = *(vs + j);  
                vk = *(vs + k);
                xji = vj->pos->x - vi->pos->x;
                yji = vj->pos->y - vi->pos->y;
                xjk = vj->pos->x - vk->pos->x;
                yjk = vj->pos->y - vk->pos->y;
                vecji = mk_vector2d(xji, yji);
                vecjk = mk_vector2d(xjk, yjk);
                float scalp = dot(vecji, vecjk);
                float lenp = (vecji->len * vecjk->len);
                if (equal(0, lenp)) {
                    lenp = MIN_DIST;
                }
                theta = acosf(scalp / lenp);
                rtn += WANG * powf((theta - THETA0), 2);
                free(vecji);
                free(vecjk);
            }
        }
    }
    /*return rtn;*/
    return 0.0;
}

static float func4() 
{
    // Edge crossings TODO
    return 0.0;
}


float func(struct vertex **vs, struct bond **bs, int nv, int nb) 
{
    float f1 = func1(vs, nv);
    float f2 = func2(vs, bs, nv, nb);
    float f3 = func3(vs, nv);
    float rtn = f1 + f2;
    /*float rtn = f1 + f2 + f3; */
    return rtn;
}
///////////////////////////////////////

char *test_objective() {

    /*struct vertex **vs_test;*/
    /*struct bond *bs_test;*/

    /*float gap = 100; */
    /*int nv = 8; */
    /*float dist = 1;*/
    /*float stiffness = 1;*/
    /*float mass = 1;*/
    /*float radius = 1;*/
    /*char type = 'r';*/

    /*int nb = 0;*/
    /*vs_test = malloc(sizeof(struct vertex) * nv);*/
    /*bs_test = malloc(sizeof(struct bond) * nv * nv);*/

    /*mu_assert("Need to be able to allocate", vs_test != NULL);*/
    /*mu_assert("Need to be able to allocate ", bs_test != NULL);*/
    /*for (int i = 0; i < nv; i++) {*/
        /*struct point *pos = mk_point(0, i * gap);*/
        /**(vs_test + i) = mk_vertex(i, pos, mass, radius, type);*/
        /*mu_assert("mk_vertex should not give NULL", *(vs_test + i) != NULL);*/
    /*}*/
    /*for (int i = 0; i < nv - 1; i++) {*/
        /*for (int j = i + 1; j < nv; j++) {*/
            /*struct vertex *vi = *(vs_test + i);*/
            /*struct vertex *vj = *(vs_test + j);*/
            /**(bs_test + nb) = mk_bond(vi, vj, dist, stiffness);*/
            /*nb++;*/
        /*}*/
    /*}*/

    /*float e = func(vs_test, bs_test, nv, nb);*/
    /*float e1 = func1(vs_test, nv);*/
    /*float e2a = func2attr(bs_test, nb);*/
    /*float e2r = func2rep(vs_test, nv);*/
    /*printf("%f\n", e1);*/
    /*mu_assert("total energy should be bigger than 0", e > 0 );*/
    /*mu_assert("energy of f1 should be bigger than 0", e1 > 0 );*/
    /*mu_assert("energy of attraction 2 should be bigger than 0", e2a > 0 );*/
    /*mu_assert("energy of repuslsino 2 should be bigger than 0", e2r > 0 );*/


    /*return 0;*/
}

