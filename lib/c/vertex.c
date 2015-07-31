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

static Vec2D center_distance(const VP vp) 
{
    int cx, cy;
    cx = PANEL_X / 2; cy = PANEL_Y / 2;
    Vec2D rtn;
    rtn = Vector2d_initialize((float) cx - vp->pos.x, (float) cy - vp->pos.y);
    return rtn;
}

static float potential_weight(const VP vp) 
{
    return WPOT;
}


/* Public  ******************************************************************/

VP Vertex_create(
       const int id, 
       const Vec2D pos, 
       const Vec2D vel, 
       const Vec2D g, 
       const Vec2D h, 
       const float wdth, 
       const float hght, 
       const char type, 
       const int nv) 
{
    VP rtn;
    rtn = calloc(1, sizeof(V));
    rtn->id = id;
    rtn->mass = 1;
    rtn->pos = pos;
    rtn->tl = Vector2d_sub(pos, Vector2d_initialize((PADDING + wdth) / 2, 
                (PADDING + hght) / 2));
    rtn->br = Vector2d_add(pos, Vector2d_initialize((PADDING + wdth) / 2, 
                (PADDING + hght) / 2));
    rtn->vel = vel;
    rtn->g = g;
    rtn->h = h;
    rtn->type = type;
    rtn->next = NULL;
    rtn->crs_bof = (int *) calloc(nv, sizeof(int));
    return rtn;
}

void Vertex_move(const VP vp, const Vec2D s) 
{
    vp->pos.x = s.x;
    vp->pos.y = s.y;

    vp->tl.x = s.x - (PADDING / 2);
    vp->tl.y = s.y - (PADDING / 2);

    vp->br.x = s.x + (PADDING / 2);
    vp->br.y = s.y + (PADDING / 2);
}

float Vertex_potential_energy(const VP vp) 
{
    Vec2D cdist;
    cdist = center_distance(vp);

    float w;
    w = potential_weight(vp);
    
    return w * powf(Vector2d_norm(cdist), 2);
}

Vec2D Vertex_potential_force(const VP vp)
{
    Vec2D cdist;
    cdist = center_distance(vp);

    float w;
    w = potential_weight(vp);

    return Vector2d_scalar_mult(cdist, 2 * w);
}

void Vertex_free(VP vp)
{
    free(vp->crs_bof);
    free(vp);
}

