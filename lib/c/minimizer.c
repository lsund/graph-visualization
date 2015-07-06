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
#include "objective.h"
#include "gradient.h"
#include "get_clustersizes.h"

float *fdm, *w0, *ml, *rl;
int dim, nv, elen, sx, sy, pox, poy;

static void initW0() 
{ 
    int i;
    for (i = 0; i < nv * nv; i++) {
        w0[i] = STIFFNESS;
    }
}

static void initML() 
{ 
    int i;
    for (i = 0; i < nv; i++) {
        ml[i] = DEFAULT_MASS;
    }
}

static void initRL(int customSizes, const char *ssFilename) 
{ 
    if (customSizes) {
        get_sizes(rl, ssFilename, nv);
    } else {
        int i;
        for (i = 0; i < nv; i++) {
            rl[i] = DEFAULT_RADIUS;
        }
    }
}

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

static void initFPS(float *ps) 
{
    int i, n, vdim;
    float gapx, gapy, offsetx, offsety;
    n = nv; 
    while (fabs(sqrt(n) - (int) sqrt(n)) > 0.01) {
        n++;
    }
    vdim = sqrt(n);
    gapx = sx / vdim;
    gapy = sy / vdim;
    offsetx = gapx / 2;
    offsety = gapy / 2;
    int rows = 0;
    int cols = -1;
    for (i = 0; i < dim; i += 2) {
        if (i % (vdim * 2) == 0) {
            rows++;
            cols = 0;
        }
        ps[i] = cols * gapx + offsetx + pox;
        ps[i + 1] = rows * gapy + offsety + poy; 
        cols++;
    }
}

int minimize (const char *dmtFilename, const char *ssFilename, float *flatpos,
        const int len, const int panelx, const int panely,
        const int panelOffsetX, const int panelOffsetY, const float fact) {
    int *iter;
    float *fret;

    int customSizes = strcmp(ssFilename, "noCustomSizes") != 0;

    pox = panelOffsetX;
    poy = panelOffsetY;
    sx = panelx * fact;
    sy = panely * fact;
    elen = SPRING_LENGTH * fact;

    dim = len;
    nv = len / 2;

    fdm = malloc(sizeof(float) * (nv * nv));
    w0 = malloc(sizeof(float) * (nv * nv));
    ml = malloc(sizeof(float) * nv);
    rl = malloc(sizeof(float) * nv);

    iter = malloc(sizeof(int));
    fret = malloc(sizeof(float));

    if (iter == NULL || fret == NULL || fdm == NULL) {
        rt_error("Error in minimize when allocating memory");
    }
    
    initDMT(dmtFilename);
    initFPS(flatpos);
    initW0();
    initML();
    initRL(customSizes, ssFilename);

    float (*func)(float []) = f;
    void (*dfunc)(float [], float []) = df;
    
    frprmn(flatpos, dim, FTOL, iter, fret, func, dfunc);

    free(fret);
    free(iter);
    free(rl);
    free(ml);
    free(w0);
    free(fdm);

    return 0;
}


