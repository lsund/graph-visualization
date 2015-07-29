
#ifndef VERTEX_H
#define VERTEX_H

#include "vector2d.h"

typedef struct vertex V, *Vptr;

struct vertex 
{
    Vector2d pos, tl, br, vel, g, h;
    float width, height;
    int id, mass;
    char type;
    Vptr next;
};

Vptr mk_vertex(const int id, const Vector2d pos, const Vector2d vel, const
        Vector2d g, const Vector2d h, const float wdth, const float hght, 
        const char type);

float intersection_area(Vptr v1, Vptr v2);

Vector2d intersection_gradient(Vptr v1, Vptr v2);

void move_vertex(const Vptr v, const Vector2d s);

void move_vertices(const Vptr *vs, const int nv, const Vector2dPtr pc, 
        const Vector2dPtr xc, float x);

void free_vertices(Vptr *vs, int nv);

#endif
