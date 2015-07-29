/*****************************************************************************

* File Name: objective.c 
* Author: Ludvig Sundström

* Description: The objective function F = F1 + F2 + F3 + F4 where FN considers
* N vertices. 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "graph.h"
#include "util.h"

float first_order(const Gptr g) {

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

float second_order_attraction(const Gptr g) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    Bptr bptr;
    rtn = 0; 
    for (i = 0; i < g->nb; i++) {
        bptr = *(g->bs + i);
        d0i = bptr->dist0 * SPRING_LENGTH;
        wi = bptr->k;
        dx = bptr->snd->pos.x - bptr->fst->pos.x;
        dy = bptr->snd->pos.y - bptr->fst->pos.y;
        di = sqrtf(dx * dx + dy * dy);
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}
static float calculate_repulsion(const Vptr vi, const Vptr vj)
{
    float ri, rj, dx, dy;
    ri = RADIUS; rj = RADIUS;
    dx = vj->pos.x - vi->pos.x;
    dy = vj->pos.y - vi->pos.y;


    float dij, critlen;
    dij = sqrtf(dx * dx + dy * dy);
    critlen = ri + rj + PADDING;

    float wrij;
    wrij = 1 * WR;

    return wrij * intersection_area(vi, vj);
    if (critlen > dij) {
        /*return wrij * powf(dij - critlen, 2);*/
    }
    return 0;
}

float second_order_repulsion(const Gptr g) 
{
    float rtn;
    rtn = 0.0;
    
    // Internal 
    int i;
    for (i = 0; i < g->npz; i++) {
        Zptr z = *(g->pzs + i);
        Vptr vi = z->members;
        while (vi->next) {
            Vptr vj;
            vj = vi->next; 
            while (vj) {
                if (vi->id > vj->id) {
                    rtn += calculate_repulsion(vj, vi);
                } else {
                    rtn += calculate_repulsion(vi, vj);
                }
                vj = vj->next;
            }
            vi = vi->next;
        }
    }
    // External
    ZpairPtr zpair = g->azs;
    while (zpair) {
        Vptr vi;
        vi = zpair->fst->members;
        while (vi) {
            Vptr vj;
            vj = zpair->snd->members;
            while (vj) {
                if (vi->id > vj->id) {
                    rtn += calculate_repulsion(vj, vi);
                } else {
                    rtn += calculate_repulsion(vi, vj);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        zpair = zpair->next;
    }
    return rtn;
}

float second_order(const Gptr g)
{
    return second_order_attraction(g) + second_order_repulsion(g);
}

float third_order(const Gptr g)
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
        
        float wij, theta0;
        wij = WANG / (vi->mass * vi->mass + vk->mass * vk->mass);
        theta0 = (2 * M_PI) / (vj->mass - 1);
        rtn += wij * powf(theta - theta0, 2);
        cur = cur->next;

    }
    return rtn;
}

float fourth_order(const Gptr g)
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
    g->energy = fourth_order(g);
    free_bpairs(g->crosses);
}

void flocal(const Gptr g) 
{
    g->energy = first_order(g) + second_order(g) + third_order(g);
    printf("cen: %f \nattr: %f \nrep: %f\nang: %f\n-------\n", 
            first_order(g), second_order_attraction(g),
            second_order_repulsion(g), third_order(g)); 
}

