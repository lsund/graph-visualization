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

static float func1(const Vptr *vs, const int nv) {
    // Should we add repulsion from walls here? TODO
    int i, cx, cy;
    float dxc, dyc, rtn;
    Vptr vptr;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;
    rtn = 0;
    for (i = 0; i < nv; i++) {
        vptr = *(vs + i);
        dxc = vptr->pos.x - (float) cx;    
        dyc = vptr->pos.y - (float) cy;
        rtn += WG * (powf(dxc, 2) + powf(dyc, 2));
    }
    return rtn;
}

static float func2attr(const Bptr *bs, const int nb) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    Bptr bptr;
    rtn = 0; for (i = 0; i < nb; i++) {
        bptr = *(bs + i);
        d0i = bptr->dist0 * SPRING_LENGTH;
        wi = bptr->fst->mass * bptr->snd->mass * bptr->k;
        dx = bptr->fst->pos.x - bptr->snd->pos.x;
        dy = bptr->fst->pos.y - bptr->snd->pos.y;
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  MIN_DIST) {
            di = MIN_DIST;
        } 
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}

static float func2rep(const Vptr *vs, const int nv) 
{
    int i, j;
    float rtn, ri, rj, dx, dy, dij, critlen;
    Vptr vi, vj;
    rtn = ri = rj = dx = dy = dij = critlen = 0.0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            if (vj != NULL  && vi != NULL) {
                ri = vi->radius;
                rj = vj->radius;
                dx = vi->pos.x - vj->pos.x;
                dy = vi->pos.y - vj->pos.y;
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

static float func2(const Vptr *vs, const Bptr *bs, const int nv, const int nb) 
{
    return func2attr(bs, nb) + func2rep(vs, nv);
}

static float func3(const BpairPtr bpairs) 
{
    float rtn, xji, yji, xjk, yjk, theta;
    Vector2d vecji, vecjk;
    Vptr vi, vj, vk;
    BpairPtr cur = bpairs;
    rtn = 0; 
    while (cur->next) {
        vi = cur->fst->fst;
        vj = cur->fst->snd; 
        vk = cur->snd->snd;
        xji = vj->pos.x - vi->pos.x;
        yji = vj->pos.y - vi->pos.y;
        xjk = vj->pos.x - vk->pos.x;
        yjk = vj->pos.y - vk->pos.y;
        vecji = mk_vector2d(xji, yji);
        vecjk = mk_vector2d(xjk, yjk);
        float scalp = dot(vecji, vecjk);
        float lenp = (vecji.len * vecjk.len);
        if (equal(0, lenp)) {
            lenp = MIN_DIST;
        }
        float div = scalp / lenp;
        /*// (div) [-1, 1]*/
        if (!in_range(-1.0, 1.0, div)) {
            if (equal(-1.0, div)) {
                div += MIN_DIST;
            } else if (equal(1.0, div)) {
                div -= MIN_DIST;
            } else {
                printf("%f\n", div);
                rt_error("Wrong acos range");
            }
        }
        theta = acosf(div);
        rtn += WANG * powf((theta - THETA0), 2);
        cur = cur->next;
    }
    return rtn;
}

static float func4() 
{
    // Edge crossings TODO
    return 0.0;
}

float func(const Gptr graph) 
{
    Vptr *vs = graph->vs;
    Bptr *bs = graph->bs;
    BpairPtr bpairs = graph->bpairs;
    int nv = graph->nv;
    int nb = graph->nb;
    float f1 = func1(vs, nv);
    float f2 = func2(vs, bs, nv, nb);
    float f3 = func3(bpairs);
    float rtn = f1 + f2 + f3; 
    return rtn;
}

