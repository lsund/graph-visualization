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

#include "minimizer.h"
#include "graph.h"
#include "gradient.h"
#include "constants.h"
#include "util.h"

struct vertex **vs;
struct bond *bs;
int dim, nv, elen, sx, sy, nb;

static float f1() {
    // Should we add repulsion from walls here? TODO
    int i, cx, cy;
    float dxc, dyc, rtn;
    struct vertex *vi;
    cx = sx / 2;
    cy = sy / 2;
    rtn = 0;
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dxc =  (vi->pos)->x - (float) cx;    
        dyc =  (vi->pos)->y - (float) cy;
        rtn += WG * (powf(dxc, 2) + powf(dyc, 2));
    }
    return rtn;
}

static float f2attr() 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    struct bond bi;
    rtn = 0;
    for (i = 0; i < nb; i++) {
        bi = *(bs + i);
        d0i = bi.dist0 * elen;
        wi = bi.fst->mass * bi.snd->mass * DEFAULT_STIFFNESS;
        dx = bi.fst->pos->x - bi.snd->pos->x;
        dy = bi.fst->pos->y - bi.snd->pos->y;
        di = sqrtf(dx * dx + dy * dy);
        /*printf("%f %f %f\n", di, d0i, bi.dist0);*/
        if (fabs(di) <  MIN_DIST) {
            di = MIN_DIST;
        } 
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}

static float f2rep() 
{
    int i, j;
    float rtn, ri, rj, dx, dy, dij, critlen;
    struct vertex *vi, *vj;
    rtn = 0;
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            ri = vi->radius;
            rj = vj->radius;
            dx = vi->pos->x - vj->pos->x;
            dy = vi->pos->y - vj->pos->y;
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) <  MIN_DIST) {
                dij = MIN_DIST;
            } 
            critlen = ri + rj + PADDING;
            if (critlen > dij) {
                rtn += WR * powf(dij - critlen, 2);
            }
        }
    }
    return rtn;
}

static float f2() 
{
    return f2attr() + f2rep();
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
    int i;
    for (i = 0; i < nv * 2; i += 2) {
        struct vertex *vptr = *(vs + i / 2);
        vptr->pos->x = arr[i];
        vptr->pos->y = arr[i + 1];
    }
    /*float rtn = f1(ps) + f2(ps) + f3(ps) + f4();*/
    float rtn = f1() + f2();
    return rtn;
}


