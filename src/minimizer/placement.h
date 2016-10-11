
#ifndef PLACEMENT_H
#define PLACEMENT_H
#include "vertex_set.h"

// Assigns the positions of vertices in Vertex Set vs as a spiral.
void Placement_set_spiral(const VertexSet vs, VertexPointer center);

// Assigs the positions of vertices in Vertex Set vs randomly
void Placement_set_random(const VertexSet vs);

// Assign the positions of verticies in a Vertex Set as a grid
void Placement_set_grid(const VertexSet vs);

#endif
