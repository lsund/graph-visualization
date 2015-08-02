
#ifndef GRID_H
#define GRID_H

#include "zone.h"
#include "zone_pair.h"

typedef struct Grd Grd, *GrdP;

struct Grd {
    int nz; 
    int npz; 
    int *is_populated;
    ZP *zps;
    ZP *pzps;
    Z2P azps;
};

GrdP Grid_create();

void Grid_append_member(GrdP grdp, const VertexPointer v, const ZP z);

void Grid_reset_dynamics(GrdP grdpp);

void Grid_check_adjacent(GrdP grdp);

void Grid_free(GrdP grdp);

#endif
