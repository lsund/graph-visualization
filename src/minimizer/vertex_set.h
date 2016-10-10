
#ifndef VERTEX_SET_H
#define VERTEX_SET_H

#include "util.h"
#include "vertex.h"

// A vertexset is a set of pointers to vertices. (set) is the array of vertices
// and (n) is the length of that array
typedef struct vertexset VertexSet, *VertexSetPointer;

struct vertexset {
    VertexPointer *set;
    int n;
};

// The empty vertex set holding a number of nv vertices
VertexSet VertexSet_initialize(int nv);

// The pointer to the vertex at index i in the vertex set vs
VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i);

// Sets the vertex pointer at index i in vertexset vs to vertex pointer v
void VertexSet_update_vertex(const VertexSet vs, const int i, const VertexPointer v);

// The deep copy of vertex set vs
VertexSet VertexSet_copy(const VertexSet vs);

// The array of positions, for each vertex in vertexset vs
VectorPointer VertexSet_positions(const VertexSet vs);

// Sets the field grad0 to the current gradient of each individual vertex in
// vertex set vs
void VertexSet_store_gradient(const VertexSet vs);

// Move all vertices in vertex set vs along the field grad0 proportional to x
void VertexSet_move(const VertexSet vs, double x);

// Scale up the gradient of all vertices in vertex set vs proportional to x
void VertexSet_boost(const VertexSet vs, const double x);

// Will convert the given vertexset a sequence of x, y coordinates, and place
// this sequence at the memorylocation pointed to by out. The memory pointed to
// by out is allocated by the caller and is of size at least 2 * vs.n *
// sezeof(float).
// Let the sequence be S, then length(S) = 2 * vs.n and  S[i] is the x coordinate and 
// S[i + 1] is the y coordinate of vertex at index i / 2 provided that i is an
// even non-negative integer and 0 <= i < 2 * vs.n
void VertexSet_to_array(const VertexSet vs, float *out);

// Iteratively create the algebraic sequences used by the minimizer using the
// properties of vertexset vs, the score gam and whatever strategy { initialize
// , update }
void VertexSet_create_sequences(
        const VertexSet vs,
        const double gam, 
        const Strategy strat
    );

// Calculate the minimizer positional and gradient score of vertexset vs,
// storing them in gg and dgg respectively
void VertexSet_calculate_score(
        const VertexSet vs,
        double *gg, 
        double *dgg
    );

// Prints a string representation of the of the vertex set to stdout
void VertexSet_print(VertexSet vs);

// Frees the memory allocated for vertex set vs
void VertexSet_free(VertexSet vs);

#endif

