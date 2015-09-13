
#ifndef VERTEX_H
#define VERTEX_H

#include "vector.h"

// A vertex is the structure representing a specific data point. A vertex is
// represented a rectangle in the 2d-plane with a position coordinate (pos), a
// topleft coordinate (tl) and a bottomright coordinate (br). A vertex is
// identified by its (id), a unique non-negative integer. A vertex has a mass
// which is a measure of how many relations it has to other vertices and a
// (fixed) flag, which indicates weather or not this vertex will move from its
// initial placement position. 
// A vertex also has a specified type, and a label - a brief textual
// representation of the data the vertex is representing. A vertex also keeps
// track of its (energy), its current (gradient). 
// (g), (h), (pos0) and (grad0) are values used in minimization.
typedef struct vertex Vertex, *VertexPointer;

struct vertex 
{
    Vector pos, tl, br;
    Vector gradient, g, h;
    Vector pos0, grad0;
    int id, mass, fixed;
    char type;
    char *label;
    VertexPointer next;
    double energy;
};

// A vertex with the specified values for  id, position, label, type and a
// fixed flag
Vertex Vertex_initialize(
        const int id, 
        const Vector pos, 
        char *label,
        const char type,
        const int fixed
);

// A pointer to a vertex with the specified values for  id, position, label,
// type and a fixed flag
VertexPointer Vertex_create(
        const int id, 
        const Vector pos, 
        char *label,
        const char type,
        const int fixed
);

// A copy of the vertex v
Vertex Vertex_copy(const Vertex v);

// A pointer to the copy of vertex v
VertexPointer Vertex_copy_pointer(const VertexPointer v);

// Resets the non-constant quantities of a vertex to an appropriate value.
void Vertex_reset_dynamics(VertexPointer v);

// Set the position of a vertex
void Vertex_set_position(const VertexPointer v, const Vector pos);

// Move vertex at v along vector s 
void Vertex_move(const VertexPointer v, const Vector s);

// The potential energy of the vertex at v, proportional to the distance
// from v->pos to the center of the screen 
double Vertex_potential_energy(const VertexPointer v);

// The gradient of the potential energy of the vertex at v, the x and y
// derivative.
Vector Vertex_potential_gradient(const VertexPointer v);

// Frees the vertex at v
void Vertex_free(VertexPointer v);

#endif
