/*****************************************************************************

* File Name: bond_crossing.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 03-08-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "bond_cross.h"
#include "util.h"
#include "constants.h"
#include "crossing_gradient.h"

/* Private *******************************************************************/

#ifndef TEST
#define TEST 0
#endif

static double crossing_weight(const BondCrossPointer bcrs)
{
    return WCRS;
}

static double bump(const double d, const double b) {
    const double a = 1 / (b / 2);
    const double c = (a * pow((b / 2), 2)) / 2;
    if (Util_in_range(0, (b / 4), d)) {
        return a * pow(d, 2);
    } else if (Util_in_range((b / 4), (3 * b / 4), d)) {
        return -a * pow(d - (b / 2), 2) + c;
    } else if (Util_in_range((3 * b / 4), b, d)) {
        return a * pow(d - b, 2);
    } else {
        return 0;
    }
}

static void dbump(
        double *gradient, 
        const double d,
        const double b,
        const Vector v0,
        const Vector v1,
        const Vector v2,
        const Vector v3
    )
{
    if (Util_in_range(0, (b / 4), d)) {
        gradient[0] = CrossingGradient_df0x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df0y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df0x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df0y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df0x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df0y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df0x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df0y3(v0, v1, v2, v3);
    } else if (Util_in_range((b / 4), (3 * b / 4), d)) {
        gradient[0] = CrossingGradient_df1x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df1y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df1x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df1y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df1x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df1y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df1x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df1y3(v0, v1, v2, v3);
    } else if (Util_in_range((3 * b / 4), b, d)) {
        gradient[0] = CrossingGradient_df2x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df2y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df2x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df2y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df2x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df2y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df2x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df2y3(v0, v1, v2, v3);
    } else {
        gradient[0] = 0;
        gradient[1] = 0;
        gradient[2] = 0;
        gradient[3] = 0;
        gradient[4] = 0;
        gradient[5] = 0;
        gradient[6] = 0;
        gradient[7] = 0;
    }
}

/* Public ********************************************************************/

BondCross BondCross_initialize(const BondPair bpr, const Vector cross)
{
    BondCross rtn;

    rtn.bpr = bpr;
    rtn.cross = cross;
    rtn.next = NULL;

    BondPointer b0, b1;
    b0 = bpr.fst; b1 = bpr.snd;

    VertexPointer v0, v1, v2, v3;
    v0 = b0->fst; v1 = b0->snd; 
    v2 = b1->fst; v3 = b1->snd;
    
    *(v0->crs_bof + v2->id) = 1;
    *(v0->crs_bof + v3->id) = 1;

    *(v1->crs_bof + v2->id) = 1;
    *(v1->crs_bof + v3->id) = 1;

    *(v2->crs_bof + v0->id) = 1;
    *(v2->crs_bof + v1->id) = 1;

    *(v3->crs_bof + v0->id) = 1;
    *(v3->crs_bof + v1->id) = 1;

    rtn.cross = cross;
    return rtn;
}

BondCrossPointer BondCross_create(
        const BondPair bcrs, 
        const Vector cross
    )
{
    BondCrossPointer rtn = Util_allocate(1, sizeof(BondCross));
    *rtn = BondCross_initialize(bcrs, cross);
    return rtn;
}

double BondCross_crossing_energy(const BondCrossPointer bcrs)
{
    
    BondPointer b0, b1;
    b0 = bcrs->bpr.fst; b1 = bcrs->bpr.snd;

    VertexPointer v[4];
    v[0] = b0->fst; 
    v[1] = b0->snd; 
    v[2] = b1->fst; 
    v[3] = b1->snd;
    
    Vector vecs[4]; 
    vecs[0] = Vector_sub(bcrs->cross, v[0]->pos);
    vecs[1] = Vector_sub(bcrs->cross, v[1]->pos);
    vecs[2] = Vector_sub(bcrs->cross, v[2]->pos);
    vecs[3] = Vector_sub(bcrs->cross, v[3]->pos);
    
    double dsum;
    dsum = fmax(Vector_norm(vecs[0]), EPS) + fmax(Vector_norm(vecs[2]), EPS);

    double d0, d1;
    d0 = Vector_sub(b0->snd->pos, b0->fst->pos).len; 
    d1 = Vector_sub(b1->snd->pos, b1->fst->pos).len; 

    double rtn = bump(dsum, d0 + d1);
    
    double wi;
    if (!TEST) {
        wi = crossing_weight(bcrs) / (v[0]->mass + v[1]->mass + v[2]->mass + v[3]->mass) ;
    } else {
        wi = crossing_weight(bcrs);
    }
    return wi * rtn;
}

VectorPointer BondCross_crossing_gradient(const BondCrossPointer bcrs)
{
    BondPointer b0, b1;
    b0 = bcrs->bpr.fst; b1 = bcrs->bpr.snd;

    VertexPointer v[4];
    v[0] = b0->fst; 
    v[1] = b0->snd; 
    v[2] = b1->fst; 
    v[3] = b1->snd;
    
    Vector vecs[4]; 
    vecs[0] = Vector_sub(bcrs->cross, v[0]->pos);
    vecs[1] = Vector_sub(bcrs->cross, v[1]->pos);
    vecs[2] = Vector_sub(bcrs->cross, v[2]->pos);
    vecs[3] = Vector_sub(bcrs->cross, v[3]->pos);
    
    double dsum;
    dsum = fmax(Vector_norm(vecs[0]), EPS) + fmax(Vector_norm(vecs[2]), EPS);

    double d0, d1;
    d0 = Vector_sub(v[1]->pos, v[0]->pos).len; 
    d1 = Vector_sub(v[3]->pos, v[2]->pos).len; 

    double gradient[8];
    dbump(gradient, dsum, d0 + d1, v[0]->pos, v[1]->pos, v[2]->pos, v[3]->pos);
    
    assert(!(gradient[0] != gradient[0]));
    assert(!(gradient[1] != gradient[1]));
    assert(!(gradient[2] != gradient[2]));
    assert(!(gradient[3] != gradient[3]));
    assert(!(gradient[4] != gradient[4]));
    assert(!(gradient[5] != gradient[5]));
    assert(!(gradient[6] != gradient[6]));
    assert(!(gradient[7] != gradient[7]));

    Vector v0_grad, v1_grad, v2_grad, v3_grad;
    v0_grad = Vector_initialize(gradient[0], gradient[1]);
    v1_grad = Vector_initialize(gradient[2], gradient[3]);
    v2_grad = Vector_initialize(gradient[4], gradient[5]);
    v3_grad = Vector_initialize(gradient[6], gradient[7]);

    double wi;
    wi = crossing_weight(bcrs);
    
    VectorPointer rtn = Util_allocate(4, sizeof(Vector));
    
    if (!TEST) {
        rtn[0] = Vector_scalar_mult(v0_grad, -wi / v[0]->mass);
        rtn[1] = Vector_scalar_mult(v1_grad, -wi / v[1]->mass);
        rtn[2] = Vector_scalar_mult(v2_grad, -wi / v[2]->mass);
        rtn[3] = Vector_scalar_mult(v3_grad, -wi / v[3]->mass);
    } else {
        rtn[0] = Vector_scalar_mult(v0_grad, -wi);
        rtn[1] = Vector_scalar_mult(v1_grad, -wi);
        rtn[2] = Vector_scalar_mult(v2_grad, -wi);
        rtn[3] = Vector_scalar_mult(v3_grad, -wi);
    }
    
    return rtn;
}


void BondCrosses_free(BondCrossPointer bcrss)
{
    BondCrossPointer bcrs = bcrss;
    while(bcrs != NULL) {

        BondPointer b0, b1;
        b0 = bcrs->bpr.fst; b1 = bcrs->bpr.snd;

        VertexPointer v0, v1, v2, v3;
        v0 = b0->fst; v1 = b0->snd; 
        v2 = b1->fst; v3 = b1->snd;
        
        *(v0->crs_bof + v2->id) = 0;
        *(v0->crs_bof + v3->id) = 0;

        *(v1->crs_bof + v2->id) = 0;
        *(v1->crs_bof + v3->id) = 0;

        *(v2->crs_bof + v0->id) = 0;
        *(v2->crs_bof + v1->id) = 0;

        *(v3->crs_bof + v0->id) = 0;
        *(v3->crs_bof + v1->id) = 0;

        BondCrossPointer tmp = bcrs;
        bcrs = bcrs->next;
        free(tmp);
        tmp = NULL;
    }
}

