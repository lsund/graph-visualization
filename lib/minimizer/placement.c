/*****************************************************************************

* File Name: placement.c

* Author: Ludvig Sundström

* Description: Assign positions (x, y) to a set of vertices

* Creation Date: 13-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "vertex.h"
#include "vertex_set.h"
#include "constants.h"
#include "util.h"

/* Private *******************************************************************/

static int comp_by_mass(const void *elem1, const void *elem2) 
{
    VertexPointer *fst = (VertexPointer *) elem1;
    VertexPointer *snd = (VertexPointer *) elem2;
    if ((*fst)->mass > (*snd)->mass) return 1;
    if ((*fst)->mass < (*snd)->mass) return -1;
    return 0;
}

static int comp_by_id(const void *elem1, const void *elem2) 
{
    VertexPointer *fst = (VertexPointer *) elem1;
    VertexPointer *snd = (VertexPointer *) elem2;
    if ((*fst)->id > (*snd)->id) return 1;
    if ((*fst)->id < (*snd)->id) return -1;
    return 0;
}

/* Public ********************************************************************/

/**
 * Assigns the positions of vertices vs as a spiral starting from the middle of
 * the panel whose dimension are specified by PANEL_X and PANEL_Y, starting
 * with the vertex with the most connections, the vertex with the second most
 * connections etc.
 */
void Placement_set_spiral(VertexSet vs, const int nv)
{
    qsort((void *) vs.set, vs.n, sizeof(void *), comp_by_mass);
    int n, gapx, gapy, dimx, dimy, i, x, y, 
        placex, placey, dx, dy, t;
    n = nv;
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }
    dimx = dimy = sqrt(n);
    gapx = PANEL_X / dimx;
    gapy = PANEL_Y / dimy;
    x = y = 0;
    dx = 0;
    dy = -1;
    t = fmax(dimx, dimy);
    for (i = nv - 1; i >= 0; i--) {
        if (!(*(vs.set + i))->pos.given_coords) {
            if ((-dimx / 2 <= x && x <= dimx / 2) && 
                (-dimy / 2 <= y && y <= dimy / 2))
            {
                
                placex = x * gapx + PANEL_X / 2;
                placey = y * gapy + PANEL_Y / 2;
                (*(vs.set + i))->pos = Vector_initialize(placex, placey);
            }
        }
        if ((x == y) || ((x < 0) && (x == -y)) || ((x > 0) && (x == 1 - y))) {
            t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy; 
    }
    qsort((void *) vs.set, vs.n, sizeof(void *), comp_by_id);
}

/**
 * Assigns the positions of vertices vs.set as a grid in the panel whose dimension
 * are specified by PANEL_X and PANEL_Y, starting in the upper-left corner with
 * the vertex with the lowest id. 
 */
void Placement_set_grid(VertexSet vs, const int nv) 
{
    int i, n, vdim, rows, cols;
    float gapx, gapy, offsetx, offsety, x, y;
    n = nv; 
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }
    vdim = sqrt(n);
    gapx = PANEL_X / vdim;
    gapy = PANEL_Y / vdim;
    offsetx = gapx / 2;
    offsety = gapy / 2;
    rows = 0;
    cols = -1;
    for (i = 0; i < nv; i++) {
        if (i % vdim == 0) {
            rows++;
            cols = 0; 
        }
        x = cols * gapx + offsetx;
        y = rows * gapy + offsety; 
        (*(vs.set + i))->pos = Vector_initialize(x, y);
        cols++;
    }
}
