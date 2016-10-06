
#ifndef BOND_PAIR_H
#define BOND_PAIR_H

#include "pair.h"
#include "bond.h"

// A bond pair is a collection of two pointers to bonds
typedef struct bondpair BondPair, *BondPairPointer;

struct bondpair {
  BondPointer fst, snd;
};

// A bond pair from the specified pair pr
BondPair BondPair_initialize(const Pair pr);

// A pointer to the bond pair from the specified pair pr
BondPairPointer BondPair_create(const Pair pr);

// 1 if the bondpair intersect in which case the intersection coordinates will
// be stored in v, 0 otherwise in which case v will take the value of 0.
int BondPair_intersect(const BondPair bpr, VectorPointer v);

// 1 if the bondpair share a common vertex, 0 otherwise
int BondPair_has_common_vertex(const BondPair bpr);

#endif
