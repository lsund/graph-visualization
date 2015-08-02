
#ifndef VERTEX_H
#define VERTEX_H

#include "vector.h"
#include "list.h"

typedef struct vertex Vertex, *VertexPointer;

struct vertex 
{
    Vector pos, tl, br, grad, g, h;
    Vector pos0, grad0;
    int id, mass;
    int *crs_bof;
    char type;
    VertexPointer next;
    PList l;
};

void Vertex_reset_dynamics(VertexPointer v);

VertexPointer Vertex_create(
        const int id, 
        const Vector pos, 
        const Vector grad, 
        const Vector g, 
        const Vector h, 
        const float wdth, const
        float hght, 
        const char type, 
        const int nv 
);

void Vertex_move(const VertexPointer vp, const Vector s);

float Vertex_potential_energy(const VertexPointer vp);

Vector Vertex_potential_gradient(const VertexPointer vp);

void Vertex_free(VertexPointer vp);

#endif
