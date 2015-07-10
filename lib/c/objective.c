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
#include "constants.h"
#include "util.h"

#include "../../tests/minunit.h"

static float f1(struct vertex **vs) {
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

static float f2attr(struct bond *bs) 
{
    int i;
    float rtn, d0i, di, wi, dx, dy;
    struct bond bi;
    rtn = 0; for (i = 0; i < nb; i++) {
        bi = *(bs + i);
        d0i = bi.dist0 * elen;
        wi = bi.fst->mass * bi.snd->mass * bi.k;
        dx = bi.fst->pos->x - bi.snd->pos->x;
        dy = bi.fst->pos->y - bi.snd->pos->y;
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  MIN_DIST) {
            di = MIN_DIST;
        } 
        rtn += wi * powf(di - d0i, 2);
    }
    return rtn;
}

static float f2rep(struct vertex **vs) 
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

static float f2(struct vertex **vs, struct bond *bs) 
{
    return f2attr(bs) + f2rep(vs);
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


float f(struct vertex **vs, struct bond *bs) 
{
    float rtn = f1(vs) + f2(vs, bs);
    return rtn;
}
///////////////////////////////////////

#include "../../tests/test.h"

char *test_objective() {

    struct vertex **vs_test;
    struct bond *bs_test;

    float gap = 100; 
    int nv = 8; 
    float dist = 1;
    float stiffness = 1;
    float mass = 1;
    float radius = 1;
    char type = 'r';
    /*int sx = 300;*/
    /*int sy = 300;*/

    nb = 0;
    vs_test = malloc(sizeof(struct vertex) * nv);
    bs_test = malloc(sizeof(struct bond) * nv * nv);

    mu_assert("Need to be able to allocate", vs_test != NULL);
    mu_assert("Need to be able to allocate ", bs_test != NULL);
    for (int i = 0; i < nv; i++) {
        struct point *pos = mk_point(0, i * gap);
        *(vs_test + i) = mk_vertex(i, pos, mass, radius, type);
        mu_assert("mk_vertex should not give NULL", *(vs_test + i) != NULL);
    }
    for (int i = 0; i < nv - 1; i++) {
        for (int j = i + 1; j < nv; j++) {
            struct vertex *vi = *(vs_test + i);
            struct vertex *vj = *(vs_test + j);
            *(bs_test + nb) = mk_bond(vi, vj, dist, stiffness);
            nb++;
        }
    }

    float e = f(vs_test, bs_test);
    float e1 = f1(vs_test);
    float e2a = f2attr(bs_test);
    float e2r = f2rep(vs_test);
    printf("%f\n", e1);
    mu_assert("total energy should be bigger than 0", e > 0 );
    mu_assert("energy of f1 should be bigger than 0", e1 > 0 );
    mu_assert("energy of attraction 2 should be bigger than 0", e2a > 0 );
    mu_assert("energy of repuslsino 2 should be bigger than 0", e2r > 0 );


    return 0;
}

