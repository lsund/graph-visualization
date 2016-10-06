
#ifndef GRID_H
#define GRID_H

#include "zone.h"
#include "zone_pair.h"

// A grid is a partition of a rectangular plane. Each part of the grid can be
// inhabited by a number of vertices. It consists of a set of
// pointers to its zones (zps), a set of pointers to its populated zones
// (pzps) and a structure holding the adjecent zones (azps). In addition, (nz),
// (npz) and (is_populated) keeps track of the total number of zones, the total
// number of populated zones and weather a given zone is populated
// respectively.
typedef struct grid Grid, *GridPointer;

struct grid {
    ZonePointer *zps;
    ZonePointer *pzps;
    ZonePairPointer azps;
    int nz; 
    int npz; 
    int *is_populated;
};

// A grid
GridPointer Grid_create();

// Adds a vertex to the grid, assigning it to the proper part.
void Grid_append_vertex(const GridPointer grid, const VertexPointer v);

// Get the pointer to the zone indexed by x and y. the top-left zone has index
// (0, 0)
ZonePointer Grid_get_zone(const GridPointer grid, const int x, const int y);

// Reset all non-static data of the grid.
void Grid_reset_dynamic_data(const GridPointer grid);

// Detect all adjecent zones and update field azps accordingly.
void Grid_detect_adjacent_zones(const GridPointer grid);

// Converts the grid to an array of integers A of length 3nz where A[i] is the
// top-left corner x-coordinate , A[i + 1] is the top-left corner y-coordinate
// and A[i + 2] is the dimension of the zone indexed by i / 3.
int *Grid_to_array(const GridPointer grid);

// Frees the memory allocated for this grid.
void Grid_free(const GridPointer grid);

#endif
