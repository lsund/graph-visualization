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

float func1(Gptr graph) {

    int cx, cy;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;

    int i;
    Vptr vptr;
    float dxc, dyc, rtn;
    rtn = 0;
    for (i = 0; i < graph->nv; i++) {
        vptr = *(graph->vs + i);
        dxc = (float) cx - vptr->pos.x;
        dyc = (float) cy - vptr->pos.y;
        rtn += WG * powf(sqrtf(dxc * dxc + dyc * dyc), 2);
    }
    return rtn;
}

float func2attr(Gptr graph) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    Bptr bptr;
    rtn = 0; 
    for (i = 0; i < graph->nb; i++) {
        bptr = *(graph->bs + i);
        d0i = bptr->dist0 * SPRING_LENGTH;
        wi = bptr->fst->mass * bptr->snd->mass * bptr->k;
        dx = bptr->snd->pos.x - bptr->fst->pos.x;
        dy = bptr->snd->pos.y - bptr->fst->pos.y;
        di = sqrtf(dx * dx + dy * dy);
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}

float func2rep(const Gptr graph) 
{
    float rtn;
    rtn = 0.0;
    int i, j;
    for (i = 0; i < graph->nv - 1; i++) {
        for (j = i + 1; j < graph->nv; j++) {
            Vptr vi, vj;
            vi = *(graph->vs + i); vj = *(graph->vs + j);
            if (vj != NULL  && vi != NULL) {
                float ri, rj, dx, dy, dij, critlen;
                ri = rj = dx = dy = dij = critlen = 0.0;
                ri = vi->radius; rj = vj->radius;
                dx = vj->pos.x - vi->pos.x;
                dy = vj->pos.y - vi->pos.y;
                dij = sqrtf(dx * dx + dy * dy);
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

float func2(const Gptr graph)
{
    return func2attr(graph) + func2rep(graph);
}

float func3(const Gptr graph)
{
    if (!graph->connected)
        return 0;

    BpairPtr cur;
    float rtn;
    rtn = 0; 
    cur = graph->connected;

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

        rtn += WANG * powf(theta - THETA0, 2);
        cur = cur->next;

    }
    return rtn;
}

float func4(const Gptr graph)
{
    if (!graph->crosses) 
        return 0;
    BpairPtr cur;
    float rtn;
    cur = graph->crosses;
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

float fglobal(const Gptr graph)
{

    create_crosses(graph);
    create_connected(graph);
    float f3, f4;
    f3 = func3(graph);
    f4 = func4(graph);
    free_bpairs(graph->connected);
    free_bpairs(graph->crosses);

    return f3 + f4;
}

float flocal(const Gptr graph) 
{
    float f1, f2;
    f1 = func1(graph);
    f2 = func2(graph);
    return f1 + f2;
}

