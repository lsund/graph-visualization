/*****************************************************************************

* File Name: vertex.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#include "vertex.h"
#include "constants.h"

Vptr mk_vertex(const int id, const Vector2d pos, const Vector2d vel, const
        Vector2d g, const Vector2d h, const float wdth, const float hght, 
        const char type) 
{
    Vptr rtn;
    rtn = calloc(1, sizeof(V));
    rtn->id = id;
    rtn->mass = 1;
    rtn->pos = pos;
    rtn->tl = sub(pos, mk_vector2d((PADDING + wdth) / 2, (PADDING + hght) / 2));
    rtn->br = add(pos, mk_vector2d((PADDING + wdth) / 2, (PADDING + hght) / 2));
    rtn->vel = vel;
    rtn->g = g;
    rtn->h = h;
    rtn->type = type;
    rtn->next = NULL;
    return rtn;
}

float intersection_area(Vptr v1, Vptr v2) 
{
    float x_o, y_o, a_o;
    x_o = fmax(0.0, fmin(v1->br.x, v2->br.x) - fmax(v1->tl.x, v2->tl.x));
    y_o = fmax(0.0, fmin(v1->br.y, v2->br.y) - fmax(v1->tl.y, v2->tl.y));
    a_o = x_o * y_o;
    return a_o;
}

Vector2d intersection_gradient(Vptr v1, Vptr v2)
{
    Vector2d frc;
    if (v2->pos.x < v1->pos.x + PADDING && v1->pos.x < v2->pos.x) {
        frc.x = -(fmax(0.0, fmin(v1->br.y, v2->br.y) - 
                fmax(v1->tl.y, v2->tl.y)));
    } else if (v2->pos.x < v1->pos.x && v1->pos.x < v2->pos.x + PADDING) {
        frc.x = (fmax(0.0, fmin(v1->br.y, v2->br.y) - 
                fmax(v1->tl.y, v2->tl.y)));
    } else {
        frc.x = 0.0;
    }
    if (v2->pos.y < v1->pos.y + PADDING && v1->pos.y < v2->pos.y) {
        frc.y = -(fmax(0.0, fmin(v1->br.x, v2->br.x) - 
                fmax(v1->tl.x, v2->tl.x)));
    } else if (v2->pos.y < v1->pos.y && v1->pos.y < v2->pos.y + PADDING) {
        frc.y = (fmax(0.0, fmin(v1->br.x, v2->br.x) - 
                fmax(v1->tl.x, v2->tl.x)));
    } else {
        frc.y = 0.0;
    }
    return frc;
}

void move_vertex(const Vptr v, const Vector2d s) 
{
    v->pos.x = s.x;
    v->pos.y = s.y;

    v->tl.x = s.x - (PADDING / 2);
    v->tl.y = s.y - (PADDING / 2);

    v->br.x = s.x + (PADDING / 2);
    v->br.y = s.y + (PADDING / 2);
}

void move_vertices(const Vptr *vs, const int nv, const Vector2dPtr pc, 
        const Vector2dPtr xc, float x) 
{
    int i;   
    for (i = 0; i < nv; i++) {

        struct vertex *v = *(vs + i);

        Vector2d ds, s;
        ds = scalar_mult(*(xc + i), x);
        s = add(*(pc + i), ds);

        move_vertex(v, s);
    }
}

void free_vertices(Vptr *vs, const int nv) 
{
    int i;
    for (i = 0; i < nv; i++) {
        free(*(vs + i));
    }
    free(vs);
    vs = NULL;
}

void print_vertex(const V v) 
{
    printf("vertex {id: %d, position: [%f, %f]\n type: %c}\n", 
            v.id, v.pos.x, v.pos.y, v.type);
}

