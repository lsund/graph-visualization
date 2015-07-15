/*****************************************************************************

* File Name: placement.c

* Author: Ludvig Sundström

* Description: Assign positions (x, y) to a set of vertices

* Creation Date: 13-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "util.h"

static int comp_by_conn(const void *elem1, const void *elem2) 
{
    struct vertex **fst = (struct vertex **) elem1;
    struct vertex **snd = (struct vertex **) elem2;
    if ((*fst)->conn < (*snd)->conn) return 1;
    if ((*fst)->conn > (*snd)->conn) return -1;
    return 0;
}

static int comp_by_id(const void *elem1, const void *elem2) 
{
    struct vertex **fst = (struct vertex **) elem1;
    struct vertex **snd = (struct vertex **) elem2;
    if ((*fst)->id > (*snd)->id) return 1;
    if ((*fst)->id < (*snd)->id) return -1;
    return 0;
}

/**
 * Assigns the positions of vertices vs as a spiral starting from the middle of
 * the panel whose dimension are specified by PANEL_X and PANEL_Y, starting
 * with the vertex with the most connections, the vertex with the second most
 * connections etc.
 */
void set_spiral(struct vertex **vs, const int nv)
{
    qsort(vs, nv, sizeof(void *), comp_by_conn);
    int n, gapx, gapy, dimx, dimy, i, x, y, 
        placex, placey, dx, dy, t, max_iter, count;
    n = nv;
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }
    dimx = dimy = sqrt(n);
    count = 0;
    gapx = PANEL_X / dimx;
    gapy = PANEL_Y / dimy;
    i = x = y = 0;
    dx = 0;
    dy = -1;
    t = fmax(dimx, dimy);
    max_iter = t * t;
    for (i = 0; i < max_iter; i++) {
        if ((-dimx / 2 <= x && x <= dimx / 2) && 
            (-dimy / 2 <= y && y <= dimy / 2) && 
            (count < nv))
        {
            placex = x * gapx + PANEL_X / 2;
            placey = y * gapy + PANEL_Y / 2;
            (*(vs + i))->pos = mk_vector2d(placex, placey);
            count++;
        }
        if ((x == y) || (x < 0 && x == -y) || (x > 0 && x == 1 - y)) {
            t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy; 
    }
    qsort(vs, nv, sizeof(void *), comp_by_id);
}

/**
 * Assigns the positions of vertices vs as a grid in the panel whose dimension
 * are specified by PANEL_X and PANEL_Y, starting in the upper-left corner with
 * the vertex with the lowest id. 
 */
void set_grid(struct vertex **vs, const int nv) 
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
        (*(vs + i))->pos = mk_vector2d(x, y);
        cols++;
    }
}
