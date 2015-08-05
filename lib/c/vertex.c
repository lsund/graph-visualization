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

static Vector center_distance(const VertexPointer vp) 
{
    int cx, cy;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;
    Vector rtn;
    rtn = Vector_initialize((float) cx - vp->pos.x, (float) cy - vp->pos.y);
    return rtn;
}

static float potential_weight(const VertexPointer vp) 
{
    return WPOT;
}


/* Public  ******************************************************************/

void Vertex_reset_dynamics(VertexPointer v) 
{
    v->next = NULL;
}

VertexPointer Vertex_create(
       const int id, 
       const Vector pos, const Vector grad, const Vector g, const Vector h,
       const float wdth, 
       const float hght, 
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

void Vertex_move(const VertexPointer v, const Vector ds) 
{
    Vector new_pos;
    new_pos = Vector_add(v->pos0, ds);

    v->pos.x = new_pos.x;
    v->pos.y = new_pos.y;

    v->tl.x = new_pos.x - (PADDING / 2);
    v->tl.y = new_pos.y - (PADDING / 2);

    v->br.x = new_pos.x + (PADDING / 2);
    v->br.y = new_pos.y + (PADDING / 2);
}

float Vertex_potential_energy(const VertexPointer vp) 
{
    Vector cdist;
    cdist = center_distance(vp);

    float w;
    w = potential_weight(vp);
    
    return w * powf(Vector_norm(cdist), 2);
}

Vector Vertex_potential_gradient(const VertexPointer vp)
{
    Vector cdist;
    cdist = center_distance(vp);

    float w;
    w = potential_weight(vp);

    return Vector_scalar_mult(cdist, 2 * w);
}

void Vertex_free(VertexPointer vp)
{
    free(vp->crs_bof);
    free(vp);
}

