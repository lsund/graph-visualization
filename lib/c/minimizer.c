/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 * Description: Defines an energy function and its derivatives aswell as
 * working as minimize() which is the exported function by emscripten.

 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <string.h>

#include "util.h"
#include "frprmn.h"
#include "constants.h"
#include "get_clustersizes.h"

float func(struct vertex **, struct bond *, int, int);

void dfunc(struct vertex **, struct bond *, int, int, float *);

void frprmn(struct vertex **vs, struct bond *bs, int nv, int nb, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)());

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

static int create_bonds(struct vertex **vs, struct bond *bs, float *fdm,
        int nv) 
{
    int i, j, ij, nb;
    
    struct vertex *vi, *vj;
    struct bond bij;
    float d0ij;
    nb = 0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            ij = i * nv + j;
            d0ij = fdm[ij];
            if (d0ij > MIN_DIST && d0ij < DISTANCE_DELIMITER) {
                bij = mk_bond(vi, vj, d0ij, DEFAULT_STIFFNESS);
                *(bs + nb) = bij;
                nb++;
            }
        }
    }
    return nb;
}

static void set_positions(struct vertex **vs, float *ps, int nv) {
    int i;
    for (i = 0; i < nv; i++) {
        *(ps + i * 2) = (*(vs + i))->pos->x ; 
        *(ps + i * 2 + 1) = (*(vs + i))->pos->y ; 
    }
}

static void btonumarr(int *bsarr, struct bond *bs, int nb) {
    int i;
    *bsarr = nb;
    for (i = 2; i < nb + 2; i++) {
        *(bsarr + i * 2) = (bs + i)->fst->id;
        *(bsarr + i * 2 + 1) = (bs + i)->snd->id;
    }
}

int minimize (const char *dmtFilename, const char *ssFilename, float *vsarr,
        int *bsarr, const int len) 
{
    float (*objective)(struct vertex **, struct bond *, int, int);
    void (*gradient)(struct vertex **, struct bond *, int, int, float *);

    int i, customSizes, nv, nb;
    struct vertex **vs;
    struct bond *bs;
    float *fdm, *fret;
    int *iter;

    objective = func;
    gradient = dfunc;
    customSizes = strcmp(ssFilename, "noCustomSizes") != 0;
    nv = len / 2;
    vs = malloc(sizeof(struct vertex) * nv);
    bs = malloc(sizeof(struct bond) * nv * nv);
    fdm = malloc(sizeof(float) * (nv * nv));
    iter = malloc(sizeof(int));
    fret = malloc(sizeof(float));

    if (vs == NULL || bs == NULL || iter == NULL 
            || fret == NULL || fdm == NULL) 
    {
        rt_error("Error in minimize when allocating memory");
    }
    
    init_dmt(dmtFilename, fdm, nv);
    create_vertices(vs, customSizes, nv);    
    set_positions(vs, vsarr, nv); 
    nb = create_bonds(vs, bs, fdm, nv);

    frprmn(vs, bs, nv, nb, FTOL, iter, fret, objective, gradient);

    for (i = 0; i < nv; i++) {
        *(vsarr + i * 2) = (*(vs + i))->pos->x;
        *(vsarr + i * 2 + 1) = (*(vs + i))->pos->y;
    }

    btonumarr(bsarr, bs, nb);

    printf("%d iterations\n", *iter);

    free(fret);
    free(iter);
    free(fdm);
    for (i = 0; i < nv; i++) {
        free((*(vs + i))->pos);
        free(*(vs + i));
    }
    free(vs);
    free(bs);

    return 0;
}

