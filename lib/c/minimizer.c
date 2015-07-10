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

#include "minimizer.h"

int dim, pox, poy;
float *fdm;

struct vertex **vs;
struct bond *bs;

float f(struct vertex **vs, struct bond *bs);
void df(struct vertex **vs, struct bond *bs, float *df);

void frprmn(struct vertex **vs, struct bond *bs, int n, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)());

static void initDMT(const char *fname) 
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

static void create_vertices(int customSizes) 
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
    gapx = sx / vdim;
    gapy = sy / vdim;
    offsetx = gapx / 2;
    offsety = gapy / 2;
    rows = 0;
    cols = -1;
    for (i = 0; i < nv; i++) {
        if (i % vdim == 0) {
            rows++;
            cols = 0;
        }
        x = cols * gapx + offsetx + pox;
        y = rows * gapy + offsety + poy; 
        pi = mk_point(x, y);
        vi = mk_vertex(i, pi, DEFAULT_RADIUS, DEFAULT_MASS, DEFAULT_TYPE);
        *(vs + i) = vi;
        cols++;
    }
}

static void create_bonds() 
{
    int i, j, ij;

    struct vertex *vi, *vj;
    struct bond bij;
    float d0ij;
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
}

static void set_positions(float *ps) {
    int i;
    for (i = 0; i < nv; i++) {
        *(ps + i * 2) = (*(vs + i))->pos->x ; 
        *(ps + i * 2 + 1) = (*(vs + i))->pos->y ; 
    }
}

static void btonumarr(int *bsarr) {
    int i;
    *bsarr = nb;
    for (i = 2; i < nb + 2; i++) {
        *(bsarr + i * 2) = (bs + i)->fst->id;
        *(bsarr + i * 2 + 1) = (bs + i)->snd->id;
    }
}

int minimize (const char *dmtFilename, const char *ssFilename, float *flatpos,
        int *bsarr, const int len, const int panelx, const int panely,
        const int panelOffsetX, const int panelOffsetY, const float fact) {
    int i, customSizes;
    int *iter;
    float *fret;

    float (*func)(struct vertex **vs, struct bond *bs);
    void (*dfunc)(struct vertex **vs, struct bond *bs, float *df);

    func = f;
    dfunc = df;

    customSizes = strcmp(ssFilename, "noCustomSizes") != 0;

    pox = panelOffsetX;
    poy = panelOffsetY;
    sx = panelx * fact;
    sy = panely * fact;
    elen = SPRING_LENGTH * fact;

    dim = len;
    nv = len / 2;
    nb = 0;

    vs = malloc(sizeof(struct vertex) * nv);
    bs = malloc(sizeof(struct bond) * nv * nv);
    fdm = malloc(sizeof(float) * (nv * nv));

    iter = malloc(sizeof(int));
    fret = malloc(sizeof(float));

    if (iter == NULL || fret == NULL || fdm == NULL) {
        rt_error("Error in minimize when allocating memory");
    }
    
    initDMT(dmtFilename);

    create_vertices(customSizes);    
    create_bonds();
    set_positions(flatpos); 

    frprmn(vs, bs, dim, FTOL, iter, fret, func, dfunc);

    printf("%d iterations\n", *iter);

    for (i = 0; i < nv; i++) {
        *(flatpos + i * 2) = (*(vs + i))->pos->x;
        *(flatpos + i * 2 + 1) = (*(vs + i))->pos->y;
    }

    btonumarr(bsarr);

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

