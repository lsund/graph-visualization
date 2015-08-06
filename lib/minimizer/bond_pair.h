
#ifndef BONDPAIR_H
#define BONDPAIR_H

#include "pair.h"
#include "bond.h"

typedef struct bondpair BondPair, *BondPairPointer;

struct bondpair {
  VertexPointer common, other1, other2;
  BondPointer fst, snd;
  BondPairPointer next;
};

BondPair BondPair_initialize(const Pair pr);

BondPairPointer BondPair_create(const Pair pr);

int BondPair_intersect(const BondPair bpr, VectorPointer v);

double BondPair_angular_energy(const BondPairPointer bpr);

Pair BondPair_angular_gradient(const BondPairPointer bpr);

int has_common_vertex(BondPair bpr);

void BondPairs_free(BondPairPointer b2ps);

#endif
