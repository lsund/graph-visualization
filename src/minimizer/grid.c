/*****************************************************************************

* File Name: grid.c

* Author: Ludvig Sundström

* Description: A collection of adjacent zones 

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>

#include "util.h"
#include "pair.h"
#include "constants.h"
#include "grid.h"

/* Private ******************************************************************/

int Grid_zone_idx(const GridPointer grid, const VertexPointer v)
{
    assert(grid->padding > 0);
    int rtn;
    if (v->pos.x >= 1.0) {
        rtn = (1.0 / grid->padding) - 1;
    } else if (v->pos.x <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.x) / grid->padding;
    }
    return rtn; 
}

int Grid_zone_idy(const GridPointer grid, const VertexPointer v)
{
    int rtn;
    if (v->pos.y >= 1.0) {
        rtn = (1.0 / grid->padding) - 1;
    } else if (v->pos.y <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.y) / grid->padding;
    }
    return rtn;
}

/* Public *******************************************************************/

GridPointer Grid_create(const double padding)
{
    assert(padding > 0);

    GridPointer rtn;
    rtn = (GridPointer) Util_allocate(1, sizeof(Grid));
    
    rtn->nz = 0;

    rtn->padding = padding;
    rtn->dim_x = 1.0 / padding;
    rtn->dim_y = 1.0 / padding;

    int nzones; 
    nzones = rtn->dim_x * rtn->dim_y;

    rtn->zps = (ZonePointer *) Util_allocate_initialize(nzones, sizeof(Zone));
    int i, j, id;
    for (j = 0; j < rtn->dim_y; j++) {
        for (i = 0; i < rtn->dim_x; i++) {
            id = (j * rtn->dim_y) + i;
            ZonePointer z;
            z= Zone_create(id, i, j, 
                    (double) i * padding, (double) j * padding, 
                    (double) padding, (double) padding);
            *(rtn->zps + id) = z;
            rtn->nz++;
        }
    }
    rtn->is_populated = (int *) Util_allocate_initialize(rtn->nz, sizeof(int));
    rtn->pzps = (ZonePointer *) Util_allocate_initialize(rtn->nz, sizeof(void *));
    rtn->azps = 0;
    rtn->npz = 0;
    
    return rtn;
}

ZonePointer Grid_get_zone(const GridPointer grid, const int x, const int y)
{
    return *(grid->zps + (y * grid->dim_x) + x);
}

void Grid_append_vertex(const GridPointer grid, const VertexPointer v)
{
    int i, j; 
    i = Grid_zone_idx(grid, v);
    j = Grid_zone_idy(grid, v);
    ZonePointer z = Grid_get_zone(grid, i, j);
    v->next = z->members;
    z->members = v;
    if (!*(grid->is_populated + z->id)) {
        *(grid->pzps + grid->npz) = z;
        grid->npz++;
    }
    *(grid->is_populated + z->id) = 1;
}

void Grid_detect_adjacent_zones(const GridPointer grid) 
{
    int i, j;
    for (i = 0; i < grid->npz - 1; i++) {
        for (j = i + 1; j < grid->npz; j++) {
            ZonePointer zi = *(grid->pzps + i);
            ZonePointer zj = *(grid->pzps + j);
            int diff;
            diff = zi->id - zj->id;
            
           int adj; 
            adj = 
                diff == 1 || 
                diff == -1 || 
                diff == grid->dim_x || 
                diff == -grid->dim_x ||
                diff == grid->dim_x - 1 ||
                diff == grid->dim_x + 1 ||
                diff == -grid->dim_x - 1 ||
                diff == -grid->dim_x + 1;
            if (adj) {
                Pair pr = Pair_initialize(zi, zj);
                ZonePairPointer newz2p = ZonePair_create(pr, grid->azps);
                grid->azps = newz2p;
            }
        }
    }
}

void Grid_reset_dynamic_data(const GridPointer grid)
{
    if (grid->azps) ZonePairs_free(grid->azps);
    grid->azps = 0;
    grid->npz = 0;
    int i;
    for (i = 0; i < grid->nz; i++) {
        *(grid->is_populated + i) = 0;
        ZonePointer z = *(grid->zps + i);
        if (z) z->members = 0;
    }
}

int *Grid_to_array(const GridPointer grid)
{
    int *rtn;
    rtn = (int *) Util_allocate(grid->nz * 3, sizeof(int));
    int i;
    for (i = 0; i < grid->nz; i++) {
        ZonePointer z = *(grid->zps + i);
        *(rtn + i * 3) = z->minx;
        *(rtn + i * 3 + 1) = z->miny;
        *(rtn + i * 3 + 2) = z->width;
    }
    return rtn;
}

void Grid_free(const GridPointer grid)
{
    ZonePairs_free(grid->azps);
    Zones_free(grid->zps, grid->nz);
    free(grid->pzps);
    free(grid->zps);
    free(grid->is_populated);
}
