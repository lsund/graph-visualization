/*****************************************************************************

* File Name: objective.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#define PADDING 10.0f
#define WR 1.0f

static int dim, nv, elen;
static float *fdm, *ml, *rl, *w0;

struct vertex {
    struct vertex *neighbors;
};

void setGlobals(float *distanceMatrix, float *massList, float *radiusList,
        float *edgeMassMatrix, int dimension, int nVertices, int edgeLength) 
{
    fdm = distanceMatrix;
    ml = massList;
    rl = radiusList;
    w0 = edgeMassMatrix;
    dim = dimension;
    nv  = nVertices;
    elen = edgeLength;
}

float attr1(float p[]) {
    return 0.0;
}
float rep1() {
    return 0.0;
}

float f2(float p[]) 
{
    int i, j, ij;
    float rtn, ri, rj, d0ij, wij, dx, dy, dij, critlen;
    rtn = 0;
    for (i = 0; i < dim - 1; i += 2) {
        for (j = i + 2; j < dim; j += 2) {
            ij = (i / 2) * nv + (j / 2);
            ri = rl[i / 2];
            rj = rl[j / 2];
            wij = ml[i / 2] * ml[j / 2] * w0[ij];
            d0ij = fdm[ij] * elen;
            dx = p[i] - p[j];
            dy = p[i + 1] - p[j + 1];
            dij = (float) sqrt(dx * dx + dy * dy);
            if (fabs(dij) <  0.01) {
                dij = 0.01;
            } 
            critlen = ri + rj + PADDING;
            if (ri + rj + PADDING > dij) {
                rtn += WR * pow(critlen - dij, 2);
            }
            // Need to filter out only connected vertices here TODO
            rtn += wij * (float) pow(dij - d0ij, 2);
        }
    }
    return rtn;
}

float f1(float p[]) 
{
    // Repulsion (from walls) TODO
    return attr1(p) + rep1();
}

float f3() 
{
    // Angular resolution TODO
    return 0.0;
}

float f4() 
{
    // Edge crossings TODO
    return 0.0;
}

float f(float p[]) 
{
    return f1(p) + f2(p) + f3() + f4();
}

void df2(float p[], float df[]) 
{
    int i, j, ij; float wij, d0ij, dij, dx, dy, ri, rj, critlen, forcexattr,
        forceyattr, forcexrep, forceyrep;
    for (i = 0; i < dim; i += 2) {
        for (j = i + 2; j < dim; j += 2) {
            ij = (i / 2) * nv + (j / 2);
            wij = ml[i / 2] * ml[j / 2] * w0[ij];
            d0ij = fdm[ij] * elen;
            dx = p[i] - p[j];
            dy = p[i + 1] - p[j + 1]; 
            ri = rl[i / 2];
            rj = rl[j / 2];
            dij = (float) sqrt(dx * dx + dy * dy);
            if (fabs(dij) <  0.01) {
                dij = 0.01;
            } 
            critlen = ri + rj + PADDING;
            
            // Need to filter out the actual connected nodes here TODO
            forcexattr = -2 * wij * dx * (dij - d0ij) / dij;
            forceyattr = -2 * wij * dy * (dij - d0ij) / dij;

            if (ri + rj + PADDING > dij) {
                forcexrep = -2 * WR * dx * (critlen - dij) / dij;
                forceyrep = -2 * WR * dy * (critlen - dij) / dij;
            }

            df[i]     += (forcexattr + forcexrep);
            df[i + 1] += (forceyattr + forceyrep);
            df[j]     -= (forcexattr + forcexrep);
            df[j + 1] -= (forceyattr + forceyrep); 
        }
    }
}

void df(float p[], float df[]) 
{
    df2(p, df);
}

