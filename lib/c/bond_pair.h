
#ifndef BONDPAIR_H
#define BONDPAIR_H

#include "pair.h"
#include "bond.h"

typedef struct bondpair BondPair, *BondPairPointer;

struct bondpair {
  VertexPointer common, other1, other2;
  BondPointer fst, snd;
  BondPairPointer next;
  Vector cross;
};

BondPair BondPair_initialize(Pair pr, BondPairPointer next);

BondPairPointer BondPair_create(Pair pr, BondPairPointer next);

void BondPair_set_cross(BondPairPointer bpr, Vector cross);

char BondPair_intersect(const BondPairPointer bpr, float *i_x, float *i_y);

float BondPair_angular_energy(const BondPairPointer bpr);

Pair BondPair_angular_gradient(const BondPairPointer bpr);

float BondPair_crossing_energy(const BondPairPointer bpr);

Pair BondPair_crossing_gradient(
        const BondPairPointer bpr, 
        const VertexPointer v0, 
        const VertexPointer v1
    );

int has_common_vertex(BondPair bpr);

void BondPairs_free(BondPairPointer b2ps);

#endif
