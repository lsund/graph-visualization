/*****************************************************************************

* File Name: zone2d.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 24-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "graph.h"

Zptr mk_zone2d(const int id, const int i, const int j, const int minx, 
        const int miny, const int width, const int height) 
{
    Zptr rtn = malloc(sizeof(Z));
    rtn->id = id;
    rtn->i = i;
    rtn->j = j;
    rtn->minx = minx; rtn->miny = miny;
    rtn->width = width; rtn->height = height;
    rtn->members = NULL;
    return rtn;
}

void create_zones(Gptr g)
{
    g->zs = (Zptr *) malloc(sizeof(Z) * GRID_DIM_X * GRID_DIM_Y);
    int i, j, id;
    for (j = 0; j < GRID_DIM_Y; j++) {
        for (i = 0; i < GRID_DIM_X; i++) {
            id = (j * GRID_DIM_Y) + i;
            Zptr z = mk_zone2d(id, i, j, i * PADDING, j * PADDING, 
                    PADDING, PADDING);
            *(g->zs + id) = z;
            g->nz++;
        }
    }
    g->is_populated = (int *) calloc(g->nz, sizeof(int));
    g->populated_zones = (Zptr *) malloc(sizeof(void *) * g->nz);
    g->adjacent_zones = NULL;
}

void append_member(Gptr g, Zptr z, Vptr v)
{
    v->next = z->members;
    z->members = v;
    if (!*(g->is_populated + z->id)) {
        *(g->populated_zones + g->npz) = z;
        g->npz++;
    }
    *(g->is_populated + z->id) = 1;
}


void check_adjacent(Gptr g) 
{
    int i, j;
    for (i = 0; i < g->npz - 1; i++) {
        for (j = i + 1; j < g->npz; j++) {
            Zptr zi = *(g->populated_zones + i);
            Zptr zj = *(g->populated_zones + j);
            int diff;
            diff = zi->id - zj->id;
            
            int cond = diff == 1 || 
                       diff == -1 || 
                       diff == GRID_DIM_X || 
                       diff == -GRID_DIM_X ||
                       diff == GRID_DIM_X - 1 ||
                       diff == GRID_DIM_X + 1 ||
                       diff == -GRID_DIM_X - 1 ||
                       diff == -GRID_DIM_X + 1;
            if (cond) {
                ZpairPtr newzpr = malloc(sizeof(Zpair));
                newzpr->fst = zi;
                newzpr->snd = zj;
                newzpr->next = g->adjacent_zones;
                g->adjacent_zones = newzpr;
            }
        }
    }
}

