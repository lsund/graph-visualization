/*****************************************************************************

* File Name: initgraph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 11-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "constants.h"

static void init_dmt(const char *fname, float *fdm, int nv) 
{
    FILE *fp;
    char *pend, *p, *buf;
    int i, j, ij;

    const long rowMaxLen = (PRECISION_DIGITS + 3) * nv;

    buf = malloc(sizeof(char) * rowMaxLen);
    fp = fopen(fname, "r"); 

    if (buf == NULL) {
        rt_error("error in getDMT while allocating memory");
    }
    if (fp == NULL) {
        printf("Error while opening file: %s for reading", fname);
        rt_error("Error...");
    }

    for (i = 0; i < nv; i++) {
        fgets(buf, rowMaxLen, fp);
        p = buf;
        for (j = 0; j < nv; j++) {
            ij = j + (i * nv);
            fdm[ij] = strtof(p, &pend);
            if (fabs(fdm[ij]) < MIN_DIST) {
                fdm[ij] = MIN_DIST;
            }
            p = pend + 1;
        }
    }
    fclose(fp);
    free(buf);
}

static void create_vertices(struct vertex **vs, int customSizes, int nv) 
{
    int i, n, vdim, rows, cols;
    float gapx, gapy, offsetx, offsety, x, y;
    struct vertex *vi;
    struct point *pi;
    n = nv; 
    while (fabs(sqrt(n) - (int) sqrt(n)) > 0.01) {
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
        pi = mk_point(x, y);
        vi = mk_vertex(i, pi, DEFAULT_RADIUS, DEFAULT_MASS, DEFAULT_TYPE);
        *(vs + i) = vi;
        cols++;
    }
}

static int create_bonds(struct vertex **vs, struct bond **bs, float *fdm,
        int nv) 
{
    int i, j, ij, nb;
    
    struct vertex *vi, *vj;
    struct bond *bptr;
    float d0ij;
    nb = 0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            ij = i * nv + j;
            d0ij = fdm[ij];
            if (d0ij < MIN_DIST) {
                d0ij = MIN_DIST;
            }
            if (d0ij < DISTANCE_DELIMITER) {
                bptr = mk_bond(vi, vj, d0ij, DEFAULT_STIFFNESS);
                *(bs + nb) = bptr;
                nb++;
            }
        }
    }
    return nb;
}

int initgraph(const char *fname, float *fdm, struct vertex **vs, 
        struct bond**bs, int nv) {
    init_dmt(fname, fdm, nv);
    create_vertices(vs, 0, nv);
    return create_bonds(vs, bs, fdm, nv);
}

