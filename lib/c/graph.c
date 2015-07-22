/*****************************************************************************

* File Name: graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 07-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>
#include <stdio.h>

#include "graph.h"

Vptr mk_vertex(int id, int conn, Vector2d pos, Vector2d vel, Vector2d g,
        Vector2d h, float mass, float radius, char type) 
{
    Vptr rtn = calloc(1, sizeof(V));
    rtn->id = id;
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

