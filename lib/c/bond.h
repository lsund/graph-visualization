
#ifndef BOND_H
#define BOND_H

#include "vertex.h"

typedef struct Bond Bond, *BondPointer;

struct Bond {
    VertexPointer fst, snd;
    float dist0;
};

BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const float dist0
    );

float Bond_attraction_energy(const BondPointer bp);

Vector Bond_attraction_gradient(const BondPointer bp);

void Bond_free(BondPointer bp);

#endif
