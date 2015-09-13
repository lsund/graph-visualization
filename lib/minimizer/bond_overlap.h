
#ifndef BOND_OVERLAP_H
#define BOND_OVERLAP_H

#include "bond_pair.h"

// A bond overlap is a pair of bonds such that if drawn in the 2d-plane, they
// overlap. Bond overlaps are internally stored as a linked list, which means
// each bond overlap structure has a pointer to the next bond overlap
// structure. 
typedef struct bondoverlap BondOverlap, *BondOverlapPointer;

struct bondoverlap {
    BondPair bpr;
    Vector cross;
    BondOverlapPointer next;
};

// A bond overlap of the bond pair bpr and the position of the intersection as
// cross
BondOverlap BondOverlap_initialize(const BondPair bpr, const Vector cross);

// A pointer to the bond overlap of the bond pair bpr and the position of the
// intersection as cross
BondOverlapPointer BondOverlap_create(
        const BondPair bpr, 
        const Vector cross
    );

// The energy value of the bond overlap. 
double BondOverlap_overlap_energy(const BondOverlapPointer bpr);

// The gradient of the bond overlap, the x and y derivative.
VectorPointer BondOverlap_overlap_gradient(const BondOverlapPointer bpr);

// Frees the bond overlap, and any linked bond overlaps.
void BondOverlap_free(const BondOverlapPointer bprs);

#endif
