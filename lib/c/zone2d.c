/*****************************************************************************

* File Name: zone2d.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 24-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "zone2d.h"

Zptr mk_zone2d(const int id, const int i, const int j, const int minx, 
        const int miny, const int width, const int height) 
{
    Zptr rtn = malloc(sizeof(Z));
    rtn->id = id;
    rtn->i = i;
    rtn->j = j;
    rtn->minx = minx; rtn->miny = miny;
    rtn->width = width; rtn->height = height;
    return rtn;
}

void free_zones(Zptr *zs, int nz) 
{
    int i;
    for (i = 0; i < nz; i++) {
        free(*(zs + i));
    }
    zs = NULL;
}

void free_zpairs(ZpairPtr zpairs)
{
    ZpairPtr cur = zpairs;
    while(cur != NULL) {
        ZpairPtr tmp = cur;
        cur = cur->next;
        free(tmp);
    }
    zpairs = NULL;
}

