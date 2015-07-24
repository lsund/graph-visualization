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

Vptr mk_vertex(int id, int conn, Vector2d pos, Vector2d vel, Vector2d g,
        Vector2d h, float mass, float radius, char type) 
{
    Vptr rtn = calloc(1, sizeof(V));
    rtn->id = id;
    rtn->conn = 0;
    rtn->pos = pos;
    rtn->vel = vel;
    rtn->g = g;
    rtn->h = h;
    rtn->mass = mass;
    rtn->radius = radius;
    rtn->type = type;
    return rtn;
}

Bptr mk_bond(Vptr fst, Vptr snd, float dist0, float k)
{
    fst->conn += 1;
    snd->conn += 1;

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

int has_common_vertex(Bptr b1, Bptr b2) 
{
    return  b1->fst->id == b2->fst->id ||
            b1->fst->id == b2->snd->id || 
            b1->snd->id == b2->fst->id ||
            b1->snd->id == b2->snd->id;
}

void create_crosses(Gptr graph)
{
    int i, j;
    BpairPtr crosses; 
    Bptr fst, snd;
    crosses = NULL; 
    fst = snd = NULL;
    for (i = 0; i < graph->nb - 1; i++) {
        for (j = i + 1; j < graph->nb; j++) {
            int crossing;
            float xi, yi;
            fst = *(graph->bs + i);  
            snd = *(graph->bs + j);  
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
    graph->crosses = crosses;
}


void create_connected(Gptr graph)
{
    int i, j;
    BpairPtr connected;
    Bptr fst, snd;
    connected = NULL; 
    fst = snd = NULL;
    for (i = 0; i < graph->nb - 1; i++) {
        for (j = i + 1; j < graph->nb; j++) {
            fst = *(graph->bs + i);  
            snd = *(graph->bs + j);  
            int match = has_common_vertex(fst, snd);
            if (match) {
                BpairPtr newpair;
                newpair = mk_bondpair(fst, snd, connected);
                connected = newpair;
            }
        }
    }
    graph->connected = connected;
}    

