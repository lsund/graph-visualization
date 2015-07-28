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

void dfunc1(const Gptr g)
{
    int i, cx, cy;
    Vptr vi;
    cx = PANEL_X / 2;
    cy = PANEL_Y / 2;
    for (i = 0; i < g->nv; i++) {
        vi = *(g->vs + i);

        float dx, dy;
        dx = (float) cx - vi->pos.x;
        dy = (float) cy - vi->pos.y;

        Vector2d frc;
        frc = mk_vector2d(0, 0);
        frc.x = 2 * WG * dx;
        frc.y = 2 * WG * dy;
        vi->vel = add(vi->vel, frc);
    }
}

static void apply_repulsion(const Vptr vi, const Vptr vj)
{
    Vector2d frc, negfrc;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);

    float dx, dy;
    dx = vj->pos.x - vi->pos.x;
    dy = vj->pos.y - vi->pos.y; 
    
    float dij, critlen;
    dij = sqrtf(dx * dx + dy * dy);
    if (equal(dij, 0)) {
        dij = MIN_DIST;
    } 
    critlen = vi->radius + vj->radius + PADDING;
    
    float wi, wj;
    wi = WR;
    wj = WR;
    if (critlen > dij) {
        frc.x = 2 * wi * dx * (dij - critlen) / dij;
        frc.y = 2 * wj * dy * (dij - critlen) / dij;
    } else {
        frc.x = 0;
        frc.y = 0;
    }
    negfrc.x = -frc.x;
    negfrc.y = -frc.y;
    vi->vel = add(vi->vel, frc);
    vj->vel = add(vj->vel, negfrc);
}

void dfunc2rep(const Gptr g)
{
    int i;
    for (i = 0; i < g->npz; i++) {
        Zptr z = *(g->populated_zones + i);
        Vptr vi = z->members;
        while (vi->next) {
            Vptr vj;
            vj = vi->next; 
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;
            }
            vi = vi->next;
        }
    }
    ZpairPtr zpair = g->adjacent_zones;
    while (zpair) {
        Vptr vi;
        vi = zpair->fst->members;
        while (vi) {
            Vptr vj;
            vj = zpair->snd->members;
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        zpair = zpair->next;
    }
}

void dfunc2attr(const Gptr g)
{
    int i;
    float d0i, dx, dy, di, wi;
    Bptr bptr;
    Vector2d frc, negfrc;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);
    for (i = 0; i < g->nb; i++) {
        bptr = *(g->bs + i);  
        wi = bptr->fst->mass * bptr->snd->mass * bptr->k;
        d0i = bptr->dist0 * SPRING_LENGTH;
        dx = bptr->snd->pos.x - bptr->fst->pos.x;
        dy = bptr->snd->pos.y - bptr->fst->pos.y; 
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  MIN_DIST) {
            di = MIN_DIST;
        } 
        frc.x = 2 * wi * dx * (di - d0i) / di;
        frc.y = 2 * wi * dy * (di - d0i) / di;
        negfrc.x = -frc.x;
        negfrc.y = -frc.y;
        bptr->fst->vel = add(bptr->fst->vel, frc);
        bptr->snd->vel = add(bptr->snd->vel, negfrc);
    }
}

void dfunc2(const Gptr g)
{
    dfunc2attr(g);
    dfunc2rep(g);
}

static void get_coords(Vptr vi, Vptr vj, Vptr vk,
        float *xji, float *yji, float *xjk, float *yjk)
{
    *xji = vi->pos.x - vj->pos.x;
    *yji = vi->pos.y - vj->pos.y;
    *xjk = vk->pos.x - vj->pos.x;
    *yjk = vk->pos.y - vj->pos.y;
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
        float xjk, float yjk, float *a1, float *a2, float *b, float *c1, 
        float *c2, float *d)
{

    *a1 = (xjk * yji - yjk * xji);
    *a2 = (yjk * xji - xjk * yji);
    *b = THETA0 - angle(vecji, vecjk);
    *c1 = vecjk.len * powf((powf(xji, 2) + powf(yji, 2)), (3/2));
    *c2 = vecji.len * powf((powf(xjk, 2) + powf(yjk, 2)), (3/2));
    float dn = pow(*a2, 2);
    float dd = (powf(xji, 2) + powf(yji, 2)) * (powf(xjk, 2) + powf(yjk, 2));
    if (dd < MIN_DIST) {
        dd = MIN_DIST;
    }
    float dsq = dn / dd;
    if (dsq < 0) {
        rt_error("Negative square root argument");
    }
    *d = sqrtf(dn / dd);
}

static void calc_gradient(float xji, float yji, float xjk, float yjk, float a1,
        float a2, float b, float c1, float c2, float d, 
        float *dxji, float *dyji, float *dxjk, float *dyjk) 
{
        float aver[4];

        aver[0] = 2 * yji * a1;
        aver[1] = 2 * xji * a2;
        aver[2] = 2 * yjk * a2;
        aver[3] = 2 * xjk * a1;
        
        float c1d = c1 * d;
        float c2d = c2 * d;

        if (c1d < MIN_DIST) {
            c1d = MIN_DIST; 
        } 
        if (c2d < MIN_DIST) {
            c2d = MIN_DIST;
        }

        *dxji = -(aver[0] * b) / c1d;
        *dyji = -(aver[1] * b) / c1d;
        *dxjk = -(aver[2] * b) / c2d;
        *dyjk = -(aver[3] * b) / c2d;
}

void dfunc3(const Gptr g)
{
    if (g->connected == NULL) {
        return;
    }
    float xji, yji, xjk, yjk, a1, a2, b, c1, c2, d, dxji, dyji, dxjk, dyjk;
    Vector2d vecji, vecjk, frcji, frcjk;
    Vptr vi, vj, vk;
    BpairPtr cur = g->connected;
    while (cur) {

        vi = cur->other1; 
        vj = cur->common;
        vk = cur->other2; 

        get_coords(vi, vj, vk, &xji, &yji, &xjk, &yjk);

        mk_vectors(xji, yji, xjk, yjk, &vecji, &vecjk, &frcji, &frcjk);
        
        prepare_d3(vecji, vecjk, xji, yji, xjk, yjk, 
                &a1, &a2, &b, &c1, &c2, &d);

        calc_gradient(xji, yji, xjk, yjk, a1, a2, b, c1, c2, d, 
                &dxji, &dyji, &dxjk, &dyjk);
        
        float wji, wjk;

        wji = WANG * vk->mass;
        wjk = WANG * vj->mass;
        frcji.x = wji * dxji; 
        frcji.y = wji * dyji; 

        frcjk.x = wjk * dxjk; 
        frcjk.y = wjk * dyjk; 

        vi->vel = add(vi->vel, frcji);
        vk->vel = add(vk->vel, frcjk);

        cur = cur->next;
    }
}

void dfunc4(const Gptr g)
{
    if (!g->crosses) 
        return;

    BpairPtr cur;
    cur = g->crosses;

    while (cur) {

        Vptr vi, vj, vk, vl;
        vi = cur->fst->fst; vj = cur->fst->snd; 
        vk = cur->snd->fst; vl = cur->snd->snd;

        float xij, yij, xil, yil, xkj, ykj, xkl, ykl;
        xij = vj->pos.x - vi->pos.x; yij = vj->pos.y - vi->pos.y;
        xil = vl->pos.x - vi->pos.x; yil = vl->pos.y - vi->pos.y;
        xkj = vj->pos.x - vk->pos.x; ykj = vj->pos.y - vk->pos.y;
        xkl = vl->pos.x - vk->pos.x; ykl = vl->pos.y - vk->pos.y;

        Vector2d vecij, vecil, veckj, veckl;
        vecij = mk_vector2d(xij, yij); vecil = mk_vector2d(xil, yil);
        veckj = mk_vector2d(xkj, ykj); veckl = mk_vector2d(xkl, ykl);

        float up, down;
        up = cross(vecij, vecil); down = cross(veckl, veckj);

        Vector2d frci, frcj, frck, frcl;

        frci.x = WCRS * yil * down;
        frci.y = WCRS * xil * (ykj * xkl - xkj * ykl);
        frcj.x = WCRS * yij * (ykj * xkl - xkj * ykl);
        frcj.y = WCRS * xij * down;
        frck.x = WCRS * ykl * up;
        frck.y = WCRS * xkl * (yij * xil - xij * yil);
        frcl.x = WCRS * ykj * (yij * xil - xij * yil);
        frcl.y = WCRS * xkj * up; 
     
        vi->vel = add(vi->vel, frci);
        vj->vel = add(vj->vel, frcj);
        vk->vel = add(vk->vel, frck);
        vl->vel = add(vl->vel, frcl);

        cur = cur->next;

    }
}


void dfglobal(const Gptr g)
{
    int i;
    for (i = 0; i < g->nv; i++) {
        (*(g->vs + i))->vel.x = 0;
        (*(g->vs + i))->vel.y = 0;
    }
    create_crosses(g);
    create_connected(g);
    dfunc3(g);
    dfunc4(g);
    free_bpairs(g->connected);
    free_bpairs(g->crosses);
}

void dflocal(const Gptr g)
{
    dfunc1(g);
    dfunc2(g);
}


