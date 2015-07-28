
#ifndef GRAPH_H 
#define GRAPH_H

#include "vector2d.h"
#include "structs.h"

/// Fixed && not Fixed

Vptr mk_vertex(int id, Vector2d pos, Vector2d vel, Vector2d g,
    Vector2d h, float radius, char type);

Bptr mk_bond(Vptr fst, Vptr snd, const float dist0, const float k);

BpairPtr mk_bondpair(Bptr b1, Bptr b2, BpairPtr next);

void create_connected(Gptr g);

void create_crosses(Gptr g);

void assign_zone(Gptr g, Vptr v);

Zptr get_zone(Gptr g, const int i, const int j);

Vptr *get_neighbours(Gptr g, Vptr v);

void check_adjacent(Gptr g);

#endif
