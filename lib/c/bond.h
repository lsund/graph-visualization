
#ifndef BOND_H
#define BOND_H

#include "vertex.h"

typedef struct bond B, *Bptr;
typedef struct bondpair Bpair, *BpairPtr;

struct bond {
    struct vertex *fst, *snd;
    float dist0, k;
};

struct bondpair {
  Bptr fst, snd;
  struct vertex *common, *other1, *other2;
  struct bondpair *next;
};

Bptr mk_bond(Vptr fst, Vptr snd, const float dist0, const float k);

BpairPtr mk_bondpair(Bptr b1, Bptr b2, BpairPtr next);

int has_common_vertex(Bptr b1, Bptr b2);

void free_bonds(Bptr *bs, int nb);

void free_bpairs(BpairPtr bpairs);

#endif
