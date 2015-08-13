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

/* Private ******************************************************************/

static Vector Vertex_to_center(const VertexPointer vp) 
{
    int cx, cy;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;
    Vector rtn;
    rtn = Vector_initialize((double) cx - vp->pos.x, (double) cy - vp->pos.y);
    return rtn;
}

static double potential_weight(const VertexPointer vp) 
{
    return WPOT;
}


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

VertexPointer Vertex_create(
       const int id, 
       const Vector pos, const Vector grad, const Vector g, const Vector h,
       const double wdth, 
       const double hght, 
       const char type, 
       const int nv) 
{
    VertexPointer rtn;
    rtn = Util_allocate_initialize(1, sizeof(Vertex));
    rtn->id = id;
    rtn->mass = 1;
    rtn->pos = pos;
    rtn->tl = Vector_sub(pos, Vector_initialize((PADDING + wdth) / 2, 
                (PADDING + hght) / 2));
    rtn->br = Vector_add(pos, Vector_initialize((PADDING + wdth) / 2, 
                (PADDING + hght) / 2));
    rtn->type = type;
    rtn->crs_bof = (int *) calloc(nv, sizeof(int));
    Vertex_reset_dynamics(rtn);
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

double Vertex_potential_energy(const VertexPointer vp) 
{
    Vector cdist;
    cdist = Vertex_to_center(vp);

    double w;
    w = potential_weight(vp);
    
    return w * pow(Vector_norm(cdist), 2);
}

Vector Vertex_potential_gradient(const VertexPointer vp)
{
    Vector cdist;
    cdist = Vertex_to_center(vp);

    double w;
    w = potential_weight(vp);

    return Vector_scalar_mult(cdist, 2 * w);
}

void Vertex_free(VertexPointer vp)
{
    free(vp->crs_bof);
    free(vp);
}

