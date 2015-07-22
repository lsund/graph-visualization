
#ifndef GRAPH_H 
#define GRAPH_H

#include "vector2d.h"

/// Fixed && not Fixed
// derivatives

typedef struct vertex {
    int id, conn;
    Vector2d pos, vel, g, h;
    float mass, radius;
    char type;
} V, *Vptr;

typedef struct bond {
    Vptr fst, snd;
    float dist0, k;
} B, *Bptr;

typedef struct bondpair {
  Bptr fst, snd;
  Vptr common, other1, other2;
  struct bondpair *next;
} Bpair, *BpairPtr;

typedef struct graph {
  Vptr *vs;
  Bptr *bs;
  BpairPtr connected, crosses; 
  int nv, nb;
} G, *Gptr;

Vptr mk_vertex(int id, int conn, Vector2d pos, Vector2d vel, Vector2d g,
    Vector2d h, float mass, float radius, char type);

Bptr mk_bond(Vptr fst, Vptr snd, float dist0, float k);

BpairPtr mk_bondpair(Bptr b1, Bptr b2, BpairPtr next);

#endif
