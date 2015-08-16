
#ifndef BOND_CROSS_H
#define BOND_CROSS_H

#include "bond_pair.h"

typedef struct bondcross BondCross, *BondCrossPointer;

struct bondcross {
    BondPair bpr;
    Vector cross;
    BondCrossPointer next;
};

BondCross BondCross_initialize(const BondPair bpr, const Vector cross);

BondCrossPointer BondCross_create(
        const BondPair bpr, 
        const Vector cross
    );

double BondCross_crossing_energy(const BondCrossPointer bpr);

VectorPointer BondCross_crossing_gradient(const BondCrossPointer bpr);

void BondCrosses_free(BondCrossPointer bprs);

#endif
