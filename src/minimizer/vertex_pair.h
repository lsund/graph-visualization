
#ifndef VERTEX_PAIR_H
#define VERTEX_PAIR_H

#include "pair.h"
#include "vector.h"

// A vertex pair is a pair pointing at two vertices

// The repulsion energy between the two vertices pointed at by pair pr
double VertexPair_repulsion_energy(const Pair pr);

// The gradient (the x, y derivative) for both vertices pointed at by pair pr
Vector VertexPair_repulsion_gradient(const Pair pr);

#endif
