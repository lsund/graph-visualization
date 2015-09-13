
#ifndef BOND_CONNECTION_H
#define BOND_CONNECTION_H

#include "bond_pair.h"

// A bond connection is a pair of bonds which share a common vertex. They are
// internally stored as a linked list, so each structure has a pointer to the
// next element in this list.
typedef struct bondconnection BondConnection, *BondConnectionPointer;

struct bondconnection {
    VertexPointer common, other1, other2;
    BondPair bpr;
    BondConnectionPointer next;
};

// A bond connection speciied by the pair pr
BondConnection BondConnection_initialize(const Pair pr);

// A pointer to the bond connection specified by the pair pr
BondConnectionPointer BondConnection_create(const Pair pr);

// The angular energy of the bondconnection at bcon 
double BondConnection_angular_energy(const BondConnectionPointer bcon);

// The angular gradient, the x and y derivative  of the bondconnection at bcon
VectorPointer BondConnection_angular_gradient(const BondConnectionPointer bcon);

// Frees the bondconnection at bcons and its linked elements
void BondConnections_free(const BondConnectionPointer bcons);

#endif
