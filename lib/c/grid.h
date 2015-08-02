
#ifndef GRID_H
#define GRID_H

#include "zone.h"
#include "zone_pair.h"

typedef struct grid Grid, *GridPointer;

struct grid {
    int nz; 
    int npz; 
    int *is_populated;
    ZP *zps;
    ZP *pzps;
    Z2P azps;
};

GridPointer Grid_create();

void Grid_append_member(GridPointer grid, const VertexPointer v, const ZP z);

void Grid_reset_dynamics(GridPointer gridp);

void Grid_check_adjacent(GridPointer grid);

int *Grid_to_array(GridPointer grid);

void Grid_free(GridPointer grid);

#endif
