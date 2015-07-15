/*****************************************************************************

* File Name: graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 07-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>

#include "graph.h"

struct vertex *mk_vertex(int id, int conn, struct vector2d *pos, float mass, 
        float radius, char type) 
{
    struct vertex *rtn = calloc(1, sizeof(struct vertex));
    rtn->id = id;
    rtn->pos = pos;
    rtn->mass = mass;
    rtn->radius = radius;
    rtn->type = type;
    return rtn;
}

struct bond *mk_bond(struct vertex *fst, struct vertex *snd, float dist0, 
        float k)
{
    fst->conn += 1;
    snd->conn += 1;

    struct bond *rtn = malloc(sizeof(struct bond));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;
    rtn->k = k;
    return rtn;
}

