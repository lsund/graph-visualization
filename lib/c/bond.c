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
    float d0, d;
    d0 = bp->dist0 * SPRING_LENGTH;
    d = Vector_norm(Vector_sub(bp->snd->pos, bp->fst->pos)); 

    float w;
    w = Bond_attraction_weight(bp);
    return w * powf(d - d0, 2);
}

Vector Bond_attraction_gradient(const BondPointer bp)
{
    float d0;
    d0 = bp->dist0 * SPRING_LENGTH;
    Vector vecb;
    vecb = Vector_sub(bp->snd->pos, bp->fst->pos);

    float d;
    d = Vector_norm(vecb); 
    if (fabs(d) <  MIN_DIST) {
        d = MIN_DIST;
    } 
    
    float w;
    w = Bond_attraction_weight(bp);

    return Vector_scalar_mult(vecb, 2 * w * (1 - (d0 / d)));
}

void Bond_free(BondPointer bp)
{
    free(bp);
}

