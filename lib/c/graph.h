
#ifndef GRAPH_H 
#define GRAPH_H

#include "math2d.h"

/// Fixed && not Fixed
// derivatives

typedef struct vertex {
    int id;
    int conn;
    Vector2d pos;
    Vector2d vel;
    float mass;
    float radius;
    char type;
} V, *Vptr;

typedef struct bond {
    Vptr fst;
    Vptr snd;
    float dist0;
    float k;
} B, *Bptr;

typedef struct bondpair {
  Bptr fst;
  Bptr snd; 
  struct bondpair *next;
} Bpair, *BpairPtr;

typedef struct graph {
  Vptr *vs;
  Bptr *bs;
  BpairPtr bpairs; 
  int nv;
  int nb;
} G, *Gptr;

Vptr mk_vertex(int id, int conn, Vector2d pos, Vector2d vel, float mass, 
    float radius, char type);

Bptr mk_bond(Vptr fst, Vptr snd, float dist0, float k);

#endif
