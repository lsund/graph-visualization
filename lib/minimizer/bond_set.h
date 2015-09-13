
#ifndef BOND_SET_H
#define BOND_SET_H

#include "bond.h"
#include "vertex_set.h"
#include "json.h"

// A bondset is a set of pointers to bonds. (set) is the array of bonds and (n)
// is the length of that array
typedef struct bondset BondSet, *BondSetPointer;

struct bondset {
    BondPointer *set;
    int n;
};

// An empty set of bonds capable of holding a number of nb bonds.
BondSet BondSet_initialize(int nb);

// The pointer to the bond in bondset bs at index i.
BondPointer BondSet_get_bond(const BondSet bs, const int i);

// Converts bondset bs to an array A of integers of length 2n, where A[i] is
// the index of the first vertex and A[i + 1] is the index of the second vertex
// of the bond at index i / 2.
int *Bondset_to_array(BondSet bs);

// Frees the memory allocated by bondset bs.
void BondSet_free(BondSet bs);

#endif
