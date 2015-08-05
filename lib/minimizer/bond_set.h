
#ifndef BOND_SET_H
#define BOND_SET_H

#include "bond.h"
#include "vertex_set.h"

typedef struct bondset BondSet, *BondSetPointer;

struct bondset {
    BondPointer *set;
    int n;
};

BondSetPointer BondSet_create(VertexPointer *vs, json_value *contents, int *nb);

BondPointer BondSet_get_bond(const BondSet bs, const int i);

BondSet BondSet_initialize(VertexPointer *vs, json_value *contents, int *nbp);

int *Bondset_to_array(BondSet bs);

void BondSet_free(BondSet bs);

#endif
