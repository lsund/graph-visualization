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

float func1(Gptr g) {

    int cx, cy;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;

    int i;
    float rtn;
    rtn = 0;
    for (i = 0; i < g->nv; i++) {
        Vptr vi;
        vi = *(g->vs + i);
        float dxc, dyc;
        dxc = (float) cx - vi->pos.x;
        dyc = (float) cy - vi->pos.y;
        float wi = WG * vi->mass;
        rtn += wi * powf(sqrtf(dxc * dxc + dyc * dyc), 2);
    }
    return rtn;
}

float func2attr(Gptr g) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    Bptr bptr;
    rtn = 0; 
    for (i = 0; i < g->nb; i++) {
        bptr = *(g->bs + i);
        d0i = bptr->dist0 * SPRING_LENGTH;
        wi = bptr->fst->mass * bptr->snd->mass * bptr->k;
        dx = bptr->snd->pos.x - bptr->fst->pos.x;
        dy = bptr->snd->pos.y - bptr->fst->pos.y;
        di = sqrtf(dx * dx + dy * dy);
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}
static float calc_repulsion(const Vptr vi, const Vptr vj)
{
    float ri, rj, dx, dy;
    ri = vi->radius; rj = vj->radius;
    dx = vj->pos.x - vi->pos.x;
    dy = vj->pos.y - vi->pos.y;

    float dij, critlen;
    dij = sqrtf(dx * dx + dy * dy);
    critlen = ri + rj + PADDING;

    float wrij;
    wrij = WR;

    if (critlen > dij) {
        return wrij * powf(dij - critlen, 2);
    }
    return 0;
}

float func2rep(const Gptr g) 
{
    float rtn;
    rtn = 0.0;
    
    // Internal 
    int i;
    for (i = 0; i < g->npz; i++) {
        Zptr z = *(g->populated_zones + i);
        Vptr vi = z->members;
        while (vi->next) {
            Vptr vj;
            vj = vi->next; 
            while (vj) {
                if (vi->id > vj->id) {
                    rtn += calc_repulsion(vj, vi);
                } else {
                    rtn += calc_repulsion(vi, vj);
                }
                vj = vj->next;
            }
            vi = vi->next;
        }
    }
    // External
    ZpairPtr zpair = g->adjacent_zones;
    while (zpair) {
        Vptr vi;
        vi = zpair->fst->members;
        while (vi) {
            Vptr vj;
            vj = zpair->snd->members;
            while (vj) {
                if (vi->id > vj->id) {
                    rtn += calc_repulsion(vj, vi);
                } else {
                    rtn += calc_repulsion(vi, vj);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        zpair = zpair->next;
    }
    return rtn;
}

float func2(const Gptr g)
{
    return func2attr(g) + func2rep(g);
}

float func3(const Gptr g)
{
    if (!g->connected)
        return 0;

    BpairPtr cur;
    float rtn;
    rtn = 0; 
    cur = g->connected;

    while (cur) {

        Vptr vi, vj, vk;
        vi = cur->other1; 
        vj = cur->common;
        vk = cur->other2; 

        float xji, yji, xjk, yjk;
        xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
        xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

        Vector2d vecji, vecjk;
        vecji = mk_vector2d(xji, yji);
        vecjk = mk_vector2d(xjk, yjk);
        
        float theta; 
        theta = angle(vecji, vecjk);

        float wij = WANG * (vi->mass * vk->mass);
        rtn += wij * powf(theta - THETA0, 2);
        cur = cur->next;

    }
    return rtn;
}

float func4(const Gptr g)
{
    if (!g->crosses) 
        return 0;
    BpairPtr cur;
    float rtn;
    cur = g->crosses;
    rtn = 0;

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
        up = cross(vecij, vecil); down = cross(veckj, veckl);

        rtn += WCRS * up * down;
        cur = cur->next;

    }
    return rtn;
}

void fglobal(const Gptr g)
{

    create_crosses(g);
    create_connected(g);
    float f3, f4;
    f3 = func3(g);
    f4 = func4(g);
    free_bpairs(g->connected);
    free_bpairs(g->crosses);

    g->energy = f3 + f4;
}

void flocal(const Gptr g) 
{
    float f1, f2;
    f1 = func1(g);
    f2 = func2(g);

    g->energy = f1 + f2;
}

