/*****************************************************************************

* File Name: Bond.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#include "util.h"
#include "constants.h"
#include "bond.h"

BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const float dist0
    )
{
    fst->mass += 1;
    snd->mass += 1;

    BondPointer rtn = malloc(sizeof(Bond));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;
    return rtn;
}

static float Bond_attraction_weight(const BondPointer bp)
{
    return WATR;
}

float Bond_attraction_energy(const BondPointer bp)
{
    float d0i, di, wi; 
    d0i = bp->dist0 * SPRING_LENGTH;
    di = Vector_norm(Vector_sub(bp->snd->pos, bp->fst->pos)); 
    wi = Bond_attraction_weight(bp);
    return wi * powf(di - d0i, 2);
}

Vector Bond_attraction_gradient(const BondPointer bp)
{
    float d0i, wi;
    d0i = bp->dist0 * SPRING_LENGTH;
    wi = Bond_attraction_weight(bp);

    Vector vecb;
    vecb = Vector_sub(bp->snd->pos, bp->fst->pos);

    float di;
    di = Vector_norm(vecb); 
    if (fabs(di) <  MIN_DIST) {
        di = MIN_DIST;
    } 

    return Vector_scalar_mult(vecb, 2 * wi * (di - d0i) / di);
}

void Bond_free(BondPointer bp)
{
    free(bp);
}

