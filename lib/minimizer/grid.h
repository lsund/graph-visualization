
#ifndef GRID_H
#define GRID_H

#include "zone.h"
#include "zone_pair.h"

typedef struct grid Grid, *GridPointer;

struct grid {
    int nz; 
    int npz; 
    int *is_populated;
    ZonePointer *zps;
    ZonePointer *pzps;
    ZonePairPointer azps;
};

GridPointer Grid_create();

void Grid_append_member(
      const GridPointer grid, 
      const VertexPointer v, 
      const ZonePointer z
  );

ZonePointer Grid_get_zone(const GridPointer grid, const int x, const int y);

void Grid_reset_dynamics(const GridPointer grid);

void Grid_check_adjacent(const GridPointer grid);

int *Grid_to_array(const GridPointer grid);

void Grid_free(const GridPointer grid);

#endif
