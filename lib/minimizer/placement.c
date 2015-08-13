/*****************************************************************************

* File Name: placement.c

* Author: Ludvig Sundström

* Description: Assign positions (x, y) to a set of vertices

* Creation Date: 13-07-2015

*****************************************************************************/

#include <stdio.h>
#include <time.h>
#include <math.h>
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

void Placement_set_spiral(VertexSet vs, const int nv)
{
    qsort((void *) vs.set, vs.n, sizeof(void *), comp_by_mass);

    int n;
    n = nv;
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }
    
    int dimx, dimy;
    dimx = (int) sqrt(n);
    dimy = dimx;
    
    double gapx, gapy;
    gapx = PANEL_X / dimx;
    gapy = PANEL_Y / dimy;
    
    int x, y;
    x = 0; 
    y = 0;
    
    int dx, dy;
    dx = 0;
    dy = -1;

    int t;
    t = fmax(dimx, dimy);

    int i;
    for (i = nv - 1; i >= 0; i--) {
        if (!(*(vs.set + i))->pos.given_coords) {
            if ((-dimx / 2 <= x && x <= dimx / 2) && 
                (-dimy / 2 <= y && y <= dimy / 2))
            {
                double placex, placey;
                placex = (double) x * gapx;
                placey = (double) y * gapy;
                Vertex_set_position(*(vs.set + i), Vector_initialize(placex, placey));
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

void Placement_set_random(const VertexSet vs, const int nv)
{
    srand(time(NULL));
    int i;
    for (i = 0; i < nv; i++) {
        double rx, ry;
        rx = ((double) rand()) / RAND_MAX;
        ry = ((double) rand()) / RAND_MAX;
        Vertex_set_position(*(vs.set + i), Vector_initialize(rx, ry));
    }
}

void Placement_set_grid(VertexSet vs, const int nv) 
{
    int i, n, vdim, rows, cols;
    double gapx, gapy, offsetx, offsety, x, y;
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
        Vertex_set_position(*(vs.set + i), Vector_initialize(x, y));
        cols++;
    }
}
