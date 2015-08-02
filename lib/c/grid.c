/*****************************************************************************

* File Name: grid.c

* Author: Ludvig Sundström

* Description: A collection of adjacent zones 

* Creation Date: 31-07-2015

*****************************************************************************/


#include <stdlib.h>

#include "util.h"
#include "pair.h"
#include "constants.h"
#include "grid.h"

/* Private ******************************************************************/

/* Public *******************************************************************/

GridPointer Grid_create()
{
    GridPointer rtn;
    rtn = (GridPointer) malloc(sizeof(Grid));

    rtn->nz = 0;
    rtn->zps = (ZP *) malloc(sizeof(Z) * GRID_DIM_X * GRID_DIM_Y);
    int i, j, id;
    for (j = 0; j < GRID_DIM_Y; j++) {
        for (i = 0; i < GRID_DIM_X; i++) {
            id = (j * GRID_DIM_Y) + i;
            ZP z = Zone_create(id, i, j, i * PADDING, j * PADDING, 
                    PADDING, PADDING);
            *(rtn->zps + id) = z;
            rtn->nz++;
        }
    }
    rtn->is_populated = (int *) malloc(sizeof(int) * rtn->nz);
    rtn->pzps = (ZP *) malloc(sizeof(void *) * rtn->nz);
    rtn->azps = NULL;
    rtn->npz = 0;
    
    return rtn;
}

void Grid_append_member(GridPointer grid, const VertexPointer v, const ZP z)
{
    v->next = z->members;
    z->members = v;
    if (!*(grid->is_populated + z->id)) {
        *(grid->pzps + grid->npz) = z;
        grid->npz++;
    }
    *(grid->is_populated + z->id) = 1;
}

void Grid_check_adjacent(GridPointer grid) 
{
    int i, j;
    for (i = 0; i < grid->npz - 1; i++) {
        for (j = i + 1; j < grid->npz; j++) {
            ZP zi = *(grid->pzps + i);
            ZP zj = *(grid->pzps + j);
            int diff;
            diff = zi->id - zj->id;
            
           int adj; 
            adj = 
                diff == 1 || 
                diff == -1 || 
                diff == GRID_DIM_X || 
                diff == -GRID_DIM_X ||
                diff == GRID_DIM_X - 1 ||
                diff == GRID_DIM_X + 1 ||
                diff == -GRID_DIM_X - 1 ||
                diff == -GRID_DIM_X + 1;
            if (adj) {
                Pair pr = Pair_initialize(zi, zj);
                Z2P newz2p = ZonePair_create(pr, grid->azps);
                grid->azps = newz2p;
            }
        }
    }
}

void Grid_reset_dynamics(GridPointer grid)
{
    if (grid->azps) ZonePairs_free(grid->azps);
    grid->azps = NULL;
    grid->npz = 0;
    int i;
    for (i = 0; i < grid->nz; i++) {
        *(grid->is_populated + i) = 0;
        ZP z = *(grid->zps + i);
        z->members = NULL;
    }
}

int *Grid_to_array(GridPointer grid)
{
    int *rtn;
    rtn = (int *) Util_allocate(grid->nz * 3, sizeof(int));
    int i;
    for (i = 0; i < grid->nz; i++) {
        ZP z = *(grid->zps + i);
        *(rtn + i * 3) = z->minx;
        *(rtn + i * 3 + 1) = z->miny;
        *(rtn + i * 3 + 2) = z->width;
    }
    return rtn;
}

void Grid_free(GridPointer grid)
{
    ZonePairs_free(grid->azps);
    Zones_free(grid->zps, grid->nz);
    free(grid->pzps);
    free(grid->zps);
    free(grid->is_populated);
}
