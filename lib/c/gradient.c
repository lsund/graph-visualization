/*****************************************************************************

* File Name: gradient.c

* Author: Ludvig Sundström

* Description: The gradient of the objective function.

* Creation Date: 06-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "constants.h"
#include "util.h"

static void add_force(struct vector2d *f, int i, float *df)
{
    *(df + i * 2) += f->x;
    *(df + i * 2 + 1) += f->y;
}

static void dfunc1(struct vertex **vs, int nv, float *df)
{
    int i, cx, cy;
    float dx, dy;
    struct vertex *vi;
    struct vector2d *frc;
    cx = PANEL_X / 2;
    cy = PANEL_Y / 2;
    frc = mk_vector2d(0, 0);
    for (i = 0; i < nv; i++) {
        vi = *(vs + i);
        dx = vi->pos->x - (float) cx;    
        dy = vi->pos->y - (float) cy;
        frc->x = -2 * WG * dx;
        frc->y = -2 * WG * dy;
        add_force(frc, i, df);
    }
    free(frc);
}

static void dfunc2rep(struct vertex **vs, int nv, float *df)
{
    int i, j;
    float dij, dx, dy, critlen;
    struct vector2d *frc, *negfrc;
    struct vertex *vi, *vj;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);
    for (i = 0; i < nv - 1; i++) {
        for (j = i + 1; j < nv; j++) {
            vi = *(vs + i);
            vj = *(vs + j);
            dx = vi->pos->x - vj->pos->x;
            dy = vi->pos->y - vj->pos->y; 
            dij = sqrtf(dx * dx + dy * dy);
            if (fabs(dij) < MIN_DIST) {
                dij = MIN_DIST;
            } 
            critlen = vi->radius + vj->radius + PADDING;
            if (critlen > dij) {
                frc->x = 2 * WR * dx * (dij - critlen) / dij;
                frc->y = 2 * WR * dy * (dij - critlen) / dij;
            } else {
                frc->x = 0;
                frc->y = 0;
            }
            negfrc->x = -frc->x;
            negfrc->y = -frc->y;
            add_force(frc, i, df);
            add_force(negfrc, j, df);
        }
    }
    free(frc);
    free(negfrc);
}

static void dfunc2attr(struct bond **bs, int nb, float *df)
{
    int i;
    float d0i, dx, dy, di, wi;
    struct bond *bptr;
    struct vector2d *frc, *negfrc;
    frc = mk_vector2d(0, 0);
    negfrc = mk_vector2d(0, 0);
    for (i = 0; i < nb; i++) {
        bptr = *(bs + i);  
        wi = bptr->fst->mass * bptr->snd->mass * DEFAULT_STIFFNESS;
        d0i = bptr->dist0 * SPRING_LENGTH;
        dx = bptr->fst->pos->x - bptr->snd->pos->x;
        dy = bptr->fst->pos->y - bptr->snd->pos->y; 
        di = sqrtf(dx * dx + dy * dy);
        if (fabs(di) <  0.01) {
            di = 0.01;
        } 
        frc->x = -2 * wi * dx * (di - d0i) / di;
        frc->y = -2 * wi * dy * (di - d0i) / di;
        negfrc->x = -frc->x;
        negfrc->y = -frc->y;
        add_force(frc, bptr->fst->id, df);
        add_force(negfrc, bptr->snd->id, df);
    }
    free(frc);
    free(negfrc);
}

static void dfunc2(struct vertex **vs, struct bond **bs, int nv, int nb, 
        float *df) 
{
    dfunc2attr(bs, nb, df);
    dfunc2rep(vs, nv, df);
}


void dfunc3(struct vertex **vs, int nv, float *df)
{
    int i, j, k; 
    float xji, yji, xjk, yjk;
    struct vector2d *vecji, *vecjk, *frcji, *frcjk;
    struct vertex *vi, *vj, *vk;
    frcji = mk_vector2d(0, 0);
    frcjk = mk_vector2d(0, 0);
    int arr[5] = {1, 2, 3, 4, 5};
    nv = 5;
    for (i = 0; i < nv - 2; i++) {
        for (j = i + 1; j < nv - 1; j++) {
            for (k = j + 1; k < nv; k++) {
                printf("%f %f %f\n", arr[i], arr[j], arr[k]);
                exit(0);
                /*vi = *(vs + i);*/
                /*vj = *(vs + j);  */
                /*vk = *(vs + k);*/
                /*if (vj->pos == NULL || vj->pos == NULL || vk->pos == NULL) {*/
                    /*rt_error("NULL-pointer: dfunc3()");*/
                /*}*/
                /*xji = vj->pos->x - vi->pos->x;*/
                /*yji = vj->pos->y - vi->pos->y;*/
                /*xjk = vj->pos->x - vk->pos->x;*/
                /*yjk = vj->pos->y - vk->pos->y;*/
                /*vecji = mk_vector2d(xji, yji);*/
                /*vecjk = mk_vector2d(xjk, yjk);*/
                /*float scalp = dot(vecji, vecjk);*/
                /*float lenp = vecji->len * vecjk->len;*/
                /*float bsqji = powf((powf(xji, 2) + powf(yji, 2)), (3/2)) */
                    /** vecjk->len;*/
                /*float bsqjk = powf((powf(xjk, 2) + powf(yjk, 2)), (3/2)) */
                    /** vecji->len;*/
                /*float dsq = (powf(xji, 2) + powf(yji, 2)) * */
                    /*(powf(xjk, 2) + powf(yjk, 2));*/
                /*float dsub = pow(scalp, 2) / dsq;*/
                /*float div = scalp / lenp;*/
                
                /*// lenp, bsqji, bsqjk dsq not 0*/
                /*if (equal(0, lenp) || equal(0, bsqji) || */
                    /*equal(0, bsqjk) || equal(0, dsq)) */
                /*{*/
                    /*rt_error("Division by zero");*/
                /*}*/
                /*// (scalp / lenp) [-1, 1]*/
                /*if (!in_range(-1.0, 1.0, div)) {*/
                    /*if (equal(-1.0, div)) {*/
                        /*div += MIN_DIST;*/
                    /*} else if (equal(1.0, div)) {*/
                        /*div -= MIN_DIST;*/
                    /*} else {*/
                        /*printf("%f\n", div);*/
                        /*rt_error("Wrong acos range");*/
                    /*}*/
                /*}*/
                /*// dsub < 1 not 1 */
                /*if (dsub >= 1.0) {*/
                    /*if (equal(1.0, dsub)) {*/
                        /*dsub -= MIN_DIST;*/
                    /*} else {*/
                        /*rt_error("Negative square root argument");*/
                    /*}*/
                /*}*/

                /*float a = 1 / lenp;*/

                /*float bj = scalp / bsqji;*/
                /*float bk = scalp / bsqjk;*/
                
                /*float c = acosf(scalp / lenp) - THETA0;*/

                /*float d = sqrtf(1 - dsub);  */
                
                /*float a1 = xjk * a;*/
                /*float b1 = xji * bj;*/

                /*float a2 = yjk * a;*/
                /*float b2 = yji * bj;*/

                /*float a3 = xji * a;*/
                /*float b3 = xjk * bk;*/

                /*float a4 = yji * a;*/
                /*float b4 = yjk * bk;*/
                
                /*float dxji = -2 * WANG * (a1 - b1) * c / d;*/
                /*float dyji = -2 * WANG * (a2 - b2) * c / d;*/
                /*float dxjk = -2 * WANG * (a3 - b3) * c / d;*/
                /*float dyjk = -2 * WANG * (a4 - b4) * c / d;*/

                /*frcji->x = dxji; */
                /*frcji->y = dyji; */

                /*frcjk->x = dxjk; */
                /*frcjk->y = dyjk; */

                /*add_force(frcji, i, df);*/
                /*add_force(frcjk, k, df);*/
                /*free(vecji);*/
                /*free(vecjk);*/
            }
        }
    }
    free(frcji);
    free(frcjk);
}

void dfunc(struct vertex **vs, struct bond **bs, int nv, int nb, float *df) 
{
    dfunc1(vs, nv, df);
    dfunc2(vs, bs, nv, nb, df);
    /*dfunc3(vs, nv, df);*/
}


//////// TESTS 

#include "../../tests/minunit.h"

/*char *test_gradient() {*/

    /*struct vertex **vs_test;*/
    /*struct bond *bs_test;*/

    /*float gap = 100; */
    /*int nv = 8; */
    /*float dist = 1;*/
    /*float stiffness = 1;*/
    /*float mass = 1;*/
    /*float radius = 1;*/
    /*char type = 'r';*/

    /*return 0;*/
/*}*/

