/*****************************************************************************

* File Name: vertex.c

* Author: Ludvpig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#include "util.h"
#include "vertex.h"
#include "constants.h"

/* Public  ******************************************************************/

int Vertex_zone_idx(const VertexPointer v)
{
    int rtn;
    if (v->pos.x >= PANEL_X) {
        rtn = PANEL_X / PADDING - 1;
    } else if (v->pos.x <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.x) / PADDING;
    }
    return rtn; 
}

int Vertex_zone_idy(const VertexPointer v)
{
    int rtn;
    if (v->pos.y >= PANEL_Y) {
        rtn = PANEL_Y / PADDING - 1;
    } else if (v->pos.y <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.y) / PADDING;
    }
    return rtn;
}

void Vertex_reset_dynamics(const VertexPointer v) 
{
    v->next = NULL;
}

Vertex Vertex_initialize(
       const int id, 
       const Vector pos,
       const double wdth, 
       const double hght, 
       const char type
    )
{
    Vertex rtn;
    rtn.id = id;
    rtn.mass = 1;
    rtn.pos = pos;
    rtn.energy = 0.0;
    rtn.gradient = Vector_zero();
    rtn.g = Vector_zero(); 
    rtn.h = Vector_zero();
    rtn.tl = Vector_sub(pos, Vector_initialize((PADDING + wdth) / 2, 
                (PADDING + hght) / 2));
    rtn.br = Vector_add(pos, Vector_initialize((PADDING + wdth) / 2, 
               (PADDING + hght) / 2));
    rtn.type = type;
    Vertex_reset_dynamics(&rtn);
    return rtn;
}

VertexPointer Vertex_create(
       const int id, 
       const Vector pos,
       const double wdth, 
       const double hght, 
       const char type
    )
{
    VertexPointer rtn;
    rtn = Util_allocate_initialize(1, sizeof(Vertex));
    *rtn = Vertex_initialize(id, pos, wdth, hght, type);

    return rtn;
}

Vertex Vertex_copy(const Vertex v)
{
    Vertex rtn;
    rtn.id = v.id;
    rtn.pos = v.pos;
    rtn.tl = v.tl;
    rtn.br = v.br;
    rtn.type = v.type;
    rtn.pos0 = v.pos0;
    rtn.grad0 = v.grad0;
    rtn.mass = v.mass;
    rtn.next = v.next;
    rtn.energy = v.energy;
    rtn.gradient = v.gradient;
    rtn.g = v.g;
    rtn.h = v.h;

    return rtn;
}

VertexPointer Vertex_copy_pointer(const VertexPointer v)
{
    VertexPointer rtn;
    rtn = Util_allocate(1, sizeof(Vertex));
    *rtn = Vertex_copy(*v);

    return rtn;
}

void Vertex_set_position(const VertexPointer v, const Vector pos)
{
    v->pos.x = pos.x;
    v->pos.y = pos.y;

    v->tl.x = pos.x - (PADDING / 2.0);
    v->tl.y = pos.y - (PADDING / 2.0);

    v->br.x = pos.x + (PADDING / 2.0);
    v->br.y = pos.y + (PADDING / 2.0);
}

void Vertex_move(const VertexPointer v, const Vector ds) 
{
    Vector new_pos;
    new_pos = Vector_add(v->pos0, ds);

    Vertex_set_position(v, new_pos);
}

void Vertex_free(VertexPointer v)
{
    free(v);
}

