/*****************************************************************************

* File Name: graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 07-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>

#include "graph.h"

Vptr mk_vertex(int id, int conn, Vector2d pos, Vector2d vel, 
        float mass, float radius, char type) 
{
    Vptr rtn = calloc(1, sizeof(V));
    rtn->id = id;
    rtn->pos = pos;
    rtn->vel = vel;
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

