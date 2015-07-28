/*****************************************************************************

* File Name: graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 07-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdio.h>

#include "graph.h"
#include "util.h"
#include "constants.h"
#include "inits.h"

Vptr mk_vertex(int id, Vector2d pos, Vector2d vel, Vector2d g, Vector2d h,
        float radius, char type) {
    Vptr rtn = calloc(1, sizeof(V));
    rtn->id = id;
    rtn->mass = 1;
    rtn->pos = pos;
    rtn->vel = vel;
    rtn->g = g;
    rtn->h = h;
    rtn->radius = radius;
    rtn->type = type;
    rtn->next = NULL;
    return rtn;
}

Bptr mk_bond(Vptr fst, Vptr snd, const float dist0, const float k)
{
    fst->mass += 1;
    snd->mass += 1;

    Bptr rtn = malloc(sizeof(B));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;
    rtn->k = k;
    return rtn;
}

BpairPtr mk_bondpair(Bptr b1, Bptr b2, BpairPtr next)
{
    BpairPtr rtn = malloc(sizeof(Bpair));
    rtn->fst = b1;
    rtn->snd = b2;
    rtn->next = next;
    if (b1->fst->id == b2->fst->id) {
        rtn->common = b1->fst;
        rtn->other1 = b1->snd;
        rtn->other2 = b2->snd;
    } else if (b1->fst->id == b2->snd->id) {
        rtn->common = b1->fst;
        rtn->other1 = b1->snd;
        rtn->other2 = b2->fst;
    } else if (b1->snd->id == b2->fst->id) {
        rtn->common = b1->snd;
        rtn->other1 = b1->fst;
        rtn->other2 = b2->snd;
    } else {
        rtn->common = b1->snd;
        rtn->other1 = b1->fst;
        rtn->other2 = b2->fst;
    }
    return rtn;
}

void create_crosses(Gptr g)
{
    int i, j;
    BpairPtr crosses; 
    Bptr fst, snd;
    crosses = NULL; 
    fst = snd = NULL;
    for (i = 0; i < g->nb - 1; i++) {
        for (j = i + 1; j < g->nb; j++) {
            int crossing;
            float xi, yi;
            fst = *(g->bs + i);  
            snd = *(g->bs + j);  
            crossing = intersection(fst->fst->pos.x, fst->fst->pos.y, 
                                    fst->snd->pos.x, fst->snd->pos.y,
                                    snd->fst->pos.x, snd->fst->pos.y,
                                    snd->snd->pos.x, snd->snd->pos.y, 
                                    &xi,             &yi);
            if (crossing) {
                BpairPtr newpair;
                newpair = mk_bondpair(fst, snd, crosses);
                crosses = newpair;
            }
        }
    }
    g->crosses = crosses;
}

void create_connected(Gptr g)
{
    int i, j;
    BpairPtr connected;
    Bptr fst, snd;
    connected = NULL; 
    fst = snd = NULL;
    for (i = 0; i < g->nb - 1; i++) {
        for (j = i + 1; j < g->nb; j++) {
            fst = *(g->bs + i);  
            snd = *(g->bs + j);  
            int match = has_common_vertex(fst, snd);
            if (match) {
                BpairPtr newpair;
                newpair = mk_bondpair(fst, snd, connected);
                connected = newpair;
            }
        }
    }
    g->connected = connected;
}    

/** 
 * Given a vertex v in a graph g, assign it a zone.
 */
void assign_zone(Gptr g, Vptr v)
{
    int i, j;
    if (v->pos.y >= PANEL_Y) {
        j = PANEL_Y / PADDING - 1;
    } else if (v->pos.y <= 0) {
        j = 0;
    } else {
        j = ((int) v->pos.y) / PADDING;
    }
    if (v->pos.x >= PANEL_X) {
        i = PANEL_X / PADDING - 1;
    } else if (v->pos.x <= 0) {
        i = 0;
    } else {
        i = ((int) v->pos.x) / PADDING;
    }
    Zptr z = *(g->zs + (j * GRID_DIM_X) + i);
    append_member(g, z, v);
}

