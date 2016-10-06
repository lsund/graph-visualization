
#ifndef BOND_H
#define BOND_H

#include "vertex.h"


// A bond is a connection between the two vertices pointed at by fst and snd. A
// bond has a preferred length dist0 and a stiffness value which is a measure
// of the rate this particular bond is attempting to preserve that length.
typedef struct Bond Bond, *BondPointer;

struct Bond {
    VertexPointer fst, snd;
    double dist0;
    double stiffness;
};

// A bond with the specified values for vertices and preferred
// length.
Bond Bond_initialize(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

// A pointer to a bond with the specified values for vertices and
// preferred length.
BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

// The energy value of the bond at b.
double Bond_attraction_energy(const BondPointer b);

// The x and y derivatives of the bond at b
Vector Bond_attraction_gradient(const BondPointer b);

// Free the bond at bp
void Bond_free(BondPointer b);

#endif
