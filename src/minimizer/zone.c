/*****************************************************************************

* File Name: zone2d.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 24-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "zone.h"

ZonePointer Zone_create(
        const int id, 
        const int i, 
        const int j, 
        const double minx,
        const double miny, 
        const double width, 
        const double height
    )
{
    ZonePointer rtn = malloc(sizeof(Zone));
    rtn->id = id;
    rtn->i = i;
    rtn->j = j;
    rtn->minx = minx; rtn->miny = miny;
    rtn->width = width; rtn->height = height;
    return rtn;
}


void Zones_free(ZonePointer *zs, int nz) 
{
    int i;
    for (i = 0; i < nz; i++) {
        free(*(zs + i));
    }
    zs = NULL;
}

