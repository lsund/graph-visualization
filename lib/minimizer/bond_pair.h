
#ifndef BOND_PAIR_H
#define BOND_PAIR_H

#include "pair.h"
#include "bond.h"

typedef struct bondpair BondPair, *BondPairPointer;

struct bondpair {
  BondPointer fst, snd;
};

BondPair BondPair_initialize(const Pair pr);

BondPairPointer BondPair_create(const Pair pr);

int BondPair_intersect(const BondPair bpr, VectorPointer v);

int BondPair_has_common_vertex(const BondPair bpr);

#endif
