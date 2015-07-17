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

static void dfunc1(Vptr *vs, int nv)
{
    int i, cx, cy;
    float dx, dy;
    Vptr vi;
    Vector2d frc;
    cx = PANEL_X / 2;
    cy = PANEL_Y / 2;
    frc = mk_vector2d(0, 0);
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dx = vi->pos.x - (float) cx;    
        dy = vi->pos.y - (float) cy;
        frc.x = -2 * WG * dx;
        frc.y = -2 * WG * dy;
        vi->vel = add(vi->vel, frc);
    }
}

static void dfunc2rep(Vptr *vs, int nv)
{
    int i, j;
    float dij, dx, dy, critlen;
    Vector2d frc, negfrc;
    Vptr vi, vj;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            dx = vi->pos.x - vj->pos.x;
            dy = vi->pos.y - vj->pos.y; 
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) < MIN_DIST) {
                dij = MIN_DIST;
            } 
            critlen = vi->radius + vj->radius + PADDING;
            if (critlen > dij) {
                frc.x = 2 * WR * dx * (dij - critlen) / dij;
                frc.y = 2 * WR * dy * (dij - critlen) / dij;
            } else {
                frc.x = 0;
                frc.y = 0;
            }
            negfrc.x = -frc.x;
            negfrc.y = -frc.y;
            vi->vel = add(vi->vel, frc);
            vj->vel = add(vj->vel, negfrc);
        }
    }
}

static void dfunc2attr(Bptr *bs, int nb)
{
    int i;
    float d0i, dx, dy, di, wi;
    Bptr bptr;
    Vector2d frc, negfrc;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);
    for (i = 0; i < nb; i++) {
        bptr = *(bs + i);  
        wi = bptr->fst->mass * bptr->snd->mass * DEFAULT_STIFFNESS;
        d0i = bptr->dist0 * SPRING_LENGTH;
        dx = bptr->fst->pos.x - bptr->snd->pos.x;
        dy = bptr->fst->pos.y - bptr->snd->pos.y; 
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  0.01) {
            di = 0.01;
        } 
        frc.x = -2 * wi * dx * (di - d0i) / di;
        frc.y = -2 * wi * dy * (di - d0i) / di;
        negfrc.x = -frc.x;
        negfrc.y = -frc.y;
        bptr->fst->vel = add(bptr->fst->vel, frc);
        bptr->snd->vel = add(bptr->snd->vel, negfrc);
    }
}

static void dfunc2(Vptr *vs, Bptr *bs, int nv, int nb)
{
    dfunc2attr(bs, nb);
    dfunc2rep(vs, nv);
}

static void check_divzero (const float a, const float b, 
                           const float c, const float d)
{
    if (equal(0, a) || equal(0, b) || 
        equal(0, c) || equal(0, d)) 
    {
        rt_error("Division by zero");
    }
}

static void get_coords(Vptr vi, Vptr vj, Vptr vk,
        float *xji, float *yji, float *xjk, float *yjk)
{
    *xji = vj->pos.x - vi->pos.x;
    *yji = vj->pos.y - vi->pos.y;
    *xjk = vj->pos.x - vk->pos.x;
    *yjk = vj->pos.y - vk->pos.y;
}

static void mk_vectors(float xji, float yji, float xjk, float yjk, 
        Vector2d *vecji, Vector2d *vecjk, Vector2d *frcji, Vector2d *frcjk)
{
    *vecji = mk_vector2d(xji, yji);
    *vecjk = mk_vector2d(xjk, yjk);
    *frcji = mk_vector2d(0, 0);
    *frcjk = mk_vector2d(0, 0);
}

static void prepare_d3(Vector2d vecji, Vector2d vecjk, float xji, float yji, 
        float xjk, float yjk, float *scalp, float *lenp, float *bsqji, float
        *bsqjk, float *dsq, float *dsub, float *div, float *bj, float *bk)
{
    *scalp = dot(vecji, vecjk);
    *lenp = vecji.len * vecjk.len;
    *bsqji = powf((powf(xji, 2) + powf(yji, 2)), (3/2)) * vecjk.len;
    *bsqjk = powf((powf(xjk, 2) + powf(yjk, 2)), (3/2)) * vecji.len;
    *dsq = (powf(xji, 2) + powf(yji, 2)) * (powf(xjk, 2) + powf(yjk, 2));
    check_divzero(*lenp, *bsqji, *bsqjk, *dsq);
    *dsub = pow(*scalp, 2) / *dsq;
    *div = *scalp / *lenp;
    *bj = *scalp / *bsqji;
    *bk = *scalp / *bsqjk;
    check_range(div, -1.0, 1.0);
}

static void calc_gradient(float xji, float yji, float xjk, float yjk, float a,
        float bj, float bk, float c, float d, float *dxji, float *dyji, float
        *dxjk, float *dyjk) 
{
        float aver[4], bver[4];

        aver[0] = xjk * a;
        bver[0] = xji * bj;
        aver[1] = yjk * a;
        bver[1] = yji * bj;
        aver[2] = xji * a;
        bver[2] = xjk * bk;
        aver[3] = yji * a;
        bver[3] = yjk * bk;
        
        *dxji = -2 * WANG * (aver[0] - bver[0]) * c / d;
        *dyji = -2 * WANG * (aver[1] - bver[1]) * c / d;
        *dxjk = -2 * WANG * (aver[2] - bver[2]) * c / d;
        *dyjk = -2 * WANG * (aver[3] - bver[3]) * c / d;
}

static void dfunc3(const BpairPtr bpairs)
{
    float xji, yji, xjk, yjk, scalp, lenp, bsqji, bsqjk, dsq, dsub, div, a, bj,
          bk, c, d, dxji, dyji, dxjk, dyjk;
    Vector2d vecji, vecjk, frcji, frcjk;
    Vptr vi, vj, vk;
    BpairPtr cur = bpairs;
    while (cur->next) {
        vi = cur->fst->fst;
        vj = cur->fst->snd; 
        vk = cur->snd->snd;
        
        get_coords(vi, vj, vk, &xji, &yji, &xjk, &yjk);
        mk_vectors(xji, yji, xjk, yjk, &vecji, &vecjk, &frcji, &frcjk);
        prepare_d3(vecji, vecjk, xji, yji, xjk, yjk, &scalp, &lenp, &bsqji, 
                &bsqjk, &dsq, &dsub, &div, &bj, &bk);
        
        if (dsub >= 1.0) {
            if (equal(1.0, dsub)) {
                dsub -= MIN_DIST;
            } else {
                rt_error("Negative square root argument");
            }
        }

        a = 1 / lenp;
        c = acosf(div) - THETA0;
        d = sqrtf(1 - dsub);  
        
        calc_gradient(xji, yji, xjk, yjk, a, bj, bk, c, d, 
                &dxji, &dyji, &dxjk, &dyjk);

        frcji.x = dxji; 
        frcji.y = dyji; 

        frcjk.x = dxjk; 
        frcjk.y = dyjk; 

        vi->vel = add(vi->vel, frcji);
        vk->vel = add(vk->vel, frcjk);

        cur = cur->next;
    }
}

void dfunc(Gptr graph) 
{
    Vptr *vs = graph->vs;
    Bptr *bs = graph->bs;
    BpairPtr bpairs = graph->bpairs;
    int nv = graph->nv;
    int nb = graph->nb;
    dfunc1(vs, nv);
    dfunc2(vs, bs, nv, nb);
    dfunc3(bpairs);
}

