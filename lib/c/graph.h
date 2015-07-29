
#ifndef GRAPH_H 
#define GRAPH_H

/// Fixed && not Fixed
//

#include "bond.h"
#include "zone2d.h"

typedef struct graph G, *Gptr;

struct graph 
{
  int nv, nb, nz, npz;
  float energy;
  int *is_populated;
  Vptr *vs;
  Bptr *bs;
  Zptr *zs;
  Zptr *pzs;
  BpairPtr connected, crosses; 
  ZpairPtr azs;
  Vector2dPtr pc, xc; 
};

void create_graph(const Gptr g, const char *fname);

void append_member(const Gptr g, const Vptr v, const Zptr z);

void create_connected(const Gptr g);

void create_crosses(const Gptr g);

void check_adjacent(const Gptr g);

void create_zones(const Gptr g);

void vertices_assign_zones(const Gptr g);

void free_graph(const Gptr g);

#endif
