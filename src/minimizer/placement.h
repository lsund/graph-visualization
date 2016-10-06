
#ifndef PLACEMENT_H
#define PLACEMENT_H
#include "vertex_set.h"

// Assigns the positions of vertices in Vertex Set vs as a spiral. Starting
// from the central point of the panel whose dimension are specified by PANEL_X
// and PANEL_Y, place the vertices as a spiral in order of descending vertice
// mass. 
void Placement_set_spiral(const VertexSet vs, VertexPointer center);

// Assigs the positions of vertices in Vertex Set vs randomly
void Placement_set_random(const VertexSet vs);

// Assigns the positions of vertices vs.set as a grid in the panel whose dimension
// are specified by PANEL_X and PANEL_Y, starting in the upper-left corner with
// the vertex with the lowest id. 
void Placement_set_grid(const VertexSet vs);

#endif
