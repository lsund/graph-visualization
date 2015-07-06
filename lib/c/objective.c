/*****************************************************************************

* File Name: objective.c

* Author: Ludvig Sundström

* Description: The objective function F = F1 + F2 + F3 + F4 where FN considers
* N nodes. 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "math2D.h"
#include "constants.h"
#include "util.h"

extern const int dim, nv, elen, sx, sy;
extern const float *fdm, *ml, *rl, *w0;

static float f1(struct point *ps) {
    // Should we add repulsion from walls here? TODO
    int i, cx, cy;
    float dxc, dyc, rtn;
    struct point pi;
    cx = sx / 2;
    cy = sy / 2;
    rtn = 0;
    for (i = 0; i < nv; i++) {
        pi = *(ps + i);
        dxc =  pi.x - (float) cx;    
        dyc =  pi.y - (float) cy;
        rtn += WG * (powf(dxc, 2) + powf(dyc, 2));
    }
    return rtn;
}

static float f2(struct point *ps) 
{
    int i, j, ij;
    float rtn, ri, rj, d0ij, wij, dx, dy, dij, critlen;
    struct point pi, pj;
    rtn = 0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            pi = *(ps + i);
            pj = *(ps + j);
            ij = i * nv + j;
            ri = rl[i];
            rj = rl[j];
            wij = ml[i] * ml[j] * w0[ij];
            d0ij = fdm[ij] * elen;
            dx = pi.x - pj.x;
            dy = pi.y - pj.y;
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) <  0.01) {
                dij = 0.01;
            } 
            critlen = ri + rj + PADDING;
            if (ri + rj + PADDING > dij) {
                rtn += WR * powf(critlen - dij, 2);
            }
            // Need to filter out only connected vertices here TODO
            rtn += wij * powf(dij - d0ij, 2);
        }
    }
    return rtn;
}

static float f3(struct point *ps) 
{
    int i, j, k; 
    float rtn, s, costheta, theta;
    struct point pi, pj, pk;
    struct vector2D vji, vjk;
    rtn = 0; 
    for (i = 0; i < nv - 2; i++) {
        for (j = i + 2; j < nv - 1; j++) {
            for (k = j + 2; k < nv; k++) {
                pi = *(ps + i);  
                pj = *(ps + j);  
                pk = *(ps + k);
                vji = mk_vector(pi, pj);
                vjk = mk_vector(pi, pk);
                s = dot(vji, vjk);
                costheta = s / (vji.len * vjk.len);
                theta = fabs(acosf(costheta) - (M_PI / 2));
                rtn += (1 / powf(theta, 2));
            }
        }
    }
    //TODO
    /*return rtn;*/
    return 0.0;
}

static float f4() 
{
    // Edge crossings TODO
    return 0.0;
}


float f(float arr[]) 
{
    struct point* ps = arrtop(arr, nv);
    /*float rtn = f1(ps) + f2(ps) + f3(ps) + f4();*/
    float rtn = f1(ps) + f2(ps);
    free(ps);
    return rtn;
}

