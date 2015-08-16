
#ifndef BOND_CONNECTION_H
#define BOND_CONNECTION_H

#include "bond_pair.h"

typedef struct bondconnection BondConnection, *BondConnectionPointer;

struct bondconnection {
    VertexPointer common, other1, other2;
    BondPair bpr;
    BondConnectionPointer next;
};

BondConnection BondConnection_initialize(const Pair pr);

BondConnectionPointer BondConnection_create(const Pair pr);

double BondConnection_angular_energy(const BondConnectionPointer bpr);

VectorPointer BondConnection_angular_gradient(const BondConnectionPointer bpr);

void BondConnections_free(const BondConnectionPointer bcs);

#endif
