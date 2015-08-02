/*****************************************************************************

* File Name: grid.c

* Author: Ludvig Sundström

* Description: A collection of adjacent zones 

* Creation Date: 31-07-2015

*****************************************************************************/


#include <stdlib.h>

#include "pair.h"
#include "constants.h"
#include "grid.h"

/* Private ******************************************************************/

/* Public *******************************************************************/

GrdP Grid_create()
{
    GrdP rtn;
    rtn = (GrdP) malloc(sizeof(Grd));

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

void Grid_append_member(GrdP grdp, const VertexPointer v, const ZP z)
{
    v->next = z->members;
    z->members = v;
    if (!*(grdp->is_populated + z->id)) {
        *(grdp->pzps + grdp->npz) = z;
        grdp->npz++;
    }
    *(grdp->is_populated + z->id) = 1;
}

void Grid_check_adjacent(GrdP grdp) 
{
    int i, j;
    for (i = 0; i < grdp->npz - 1; i++) {
        for (j = i + 1; j < grdp->npz; j++) {
            ZP zi = *(grdp->pzps + i);
            ZP zj = *(grdp->pzps + j);
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
                Z2P newz2p = ZonePair_create(pr, grdp->azps);
                grdp->azps = newz2p;
            }
        }
    }
}

void Grid_reset_dynamics(GrdP grid)
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

void Grid_free(GrdP grdp)
{
    ZonePairs_free(grdp->azps);
    Zones_free(grdp->zps, grdp->nz);
    free(grdp->pzps);
    free(grdp->zps);
    free(grdp->is_populated);
}
