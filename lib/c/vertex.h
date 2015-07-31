
#ifndef VERTEX_H
#define VERTEX_H

#include "vector2d.h"

typedef struct vertex V, *VP;

struct vertex 
{
    Vec2D pos, tl, br, vel, g, h;
    int id, mass;
    int *crs_bof;
    char type;
    VP next;
};

VP Vertex_create(
        const int id, 
        const Vec2D pos, 
        const Vec2D vel, 
        const Vec2D g, 
        const Vec2D h, 
        const float wdth, const
        float hght, 
        const char type, 
        const int nv 
);

void Vertex_move(const VP vp, const Vec2D s);

float Vertex_potential_energy(const VP vp);

Vec2D Vertex_potential_force(const VP vp);

void Vertex_free(VP vp);

#endif
