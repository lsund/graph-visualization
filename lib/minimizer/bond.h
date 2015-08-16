
#ifndef BOND_H
#define BOND_H

#include "vertex.h"

typedef struct Bond Bond, *BondPointer;

struct Bond {
    VertexPointer fst, snd;
    double dist0;
};

Bond Bond_initialize(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

double Bond_attraction_energy(const BondPointer bp);

Vector Bond_attraction_gradient(const BondPointer bp);

void Bond_free(BondPointer bp);

#endif
