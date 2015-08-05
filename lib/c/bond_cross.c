/*****************************************************************************

* File Name: bond_crossing.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 03-08-2015

*****************************************************************************/
#include <stdlib.h>
#include <math.h>

#include "bond_cross.h"
#include "util.h"
#include "constants.h"

static float crossing_weight(const BondCrossPointer bcrs)
{
    return WCRS;
}


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

float BondCross_crossing_energy(const BondCrossPointer bcrs)
{
    VertexPointer v0, v1, v2, v3;
    v0 = bcrs->bpr.fst->fst; v1 = bcrs->bpr.snd->fst; 
    v2 = bcrs->bpr.snd->snd; v3 = bcrs->bpr.fst->snd;
    
    float d0, d1, d2, d3;
    d0 = Vector_norm(Vector_sub(bcrs->cross, v0->pos));
    d1 = Vector_norm(Vector_sub(bcrs->cross, v1->pos));
    d2 = Vector_norm(Vector_sub(bcrs->cross, v2->pos));
    d3 = Vector_norm(Vector_sub(bcrs->cross, v3->pos));

    float dsums[4];
    dsums[0] = d0 + d1;
    dsums[1] = d0 + d2;
    dsums[2] = d1 + d3;
    dsums[3] = d2 + d3;

    float mind, wi;
    mind = Util_collection_min(dsums, 4);
    wi = crossing_weight(bcrs);
    
    return wi  / (v0->mass + v1->mass + v2->mass + v3->mass) * powf(mind, 2);
}

VectorPointer BondCross_crossing_gradient(const BondCrossPointer bcrs)
{

    VertexPointer v0, v1, v2, v3;
    v0 = bcrs->bpr.fst->fst; v1 = bcrs->bpr.snd->fst; 
    v2 = bcrs->bpr.snd->snd; v3 = bcrs->bpr.fst->snd;
    
    Vector vec0, vec1, vec2, vec3; 
    vec0 = Vector_sub(bcrs->cross, v0->pos);
    vec1 = Vector_sub(bcrs->cross, v1->pos);
    vec2 = Vector_sub(bcrs->cross, v2->pos);
    vec3 = Vector_sub(bcrs->cross, v3->pos);

    float d0, d1, d2, d3;
    d0 = fmax(Vector_norm(vec0), MIN_DIST);
    d1 = fmax(Vector_norm(vec1), MIN_DIST);
    d2 = fmax(Vector_norm(vec2), MIN_DIST);
    d3 = fmax(Vector_norm(vec3), MIN_DIST);

    float dsums[4];
    dsums[0] = d0 + d1;
    dsums[1] = d0 + d2;
    dsums[2] = d1 + d3;
    dsums[3] = d2 + d3;
    
    int i, min, minind;
    min = dsums[0];
    minind = 0;
    for (i = 1; i < 4; i++) {
        if (dsums[i] < min) {
            min = dsums[i];
            minind = i;
        }
    }
    
    float v0_gradx, v0_grady, 
          v1_gradx, v1_grady, 
          v2_gradx, v2_grady, 
          v3_gradx, v3_grady;
    switch (minind) {
        case 0:
            v0_gradx = 2 * vec0.x * dsums[0] / d0;
            v0_grady = 2 * vec0.y * dsums[0] / d0;
            v1_gradx = 2 * vec1.x * dsums[0] / d1; 
            v1_grady = 2 * vec1.y * dsums[0] / d1; 
            v2_gradx = 0; 
            v2_grady = 0; 
            v3_gradx = 0; 
            v3_grady = 0; 
            break;
        case 1:
            v0_gradx = 2 * vec0.x * dsums[1] / d0;
            v0_grady = 2 * vec0.y * dsums[1] / d0;
            v1_gradx = 0; 
            v1_grady = 0; 
            v2_gradx = 2 * vec2.x * dsums[1] / d2; 
            v2_grady = 2 * vec2.y * dsums[1] / d2; 
            v3_gradx = 0; 
            v3_grady = 0; 
            break;
        case 2:
            v0_gradx = 0;
            v0_grady = 0;
            v1_gradx = 2 * vec1.x * dsums[2] / d1; 
            v1_grady = 2 * vec1.y * dsums[2] / d1; 
            v2_gradx = 0; 
            v2_grady = 0; 
            v3_gradx = 2 * vec3.x * dsums[2] / d3; 
            v3_grady = 2 * vec3.y * dsums[2] / d3; 
            break;
        case 3:
            v0_gradx = 0;
            v0_grady = 0;
            v1_gradx = 0; 
            v1_grady = 0; 
            v2_gradx = 2 * vec2.x * dsums[3] / d2; 
            v2_grady = 2 * vec2.y * dsums[3] / d2; 
            v3_gradx = 2 * vec3.x * dsums[3] / d3; 
            v3_grady = 2 * vec3.y * dsums[3] / d3; 
            break;
    }

    float wi;
    wi = crossing_weight(bcrs);
    
    VectorPointer rtn = Util_allocate(4, sizeof(Vector));

    Vector v0_grad, v1_grad, v2_grad, v3_grad;
    v0_grad = Vector_initialize(v0_gradx, v0_grady);
    v1_grad = Vector_initialize(v1_gradx, v1_grady);
    v2_grad = Vector_initialize(v2_gradx, v2_grady);
    v3_grad = Vector_initialize(v3_gradx, v3_grady);

    rtn[0] = Vector_scalar_mult(v0_grad, wi / v0->mass);
    rtn[1] = Vector_scalar_mult(v1_grad, wi / v1->mass);
    rtn[2] = Vector_scalar_mult(v2_grad, wi / v2->mass);
    rtn[3] = Vector_scalar_mult(v3_grad, wi / v3->mass);

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

