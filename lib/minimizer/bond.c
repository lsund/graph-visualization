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
        const double dist0
    )
{
    fst->mass++;
    snd->mass++;

    BondPointer rtn = malloc(sizeof(Bond));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;

    return rtn;
}

Bond Bond_initialize(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    )
{
    Bond rtn;
    rtn.fst = fst;
    rtn.snd = snd;  
    rtn.dist0 = dist0;

    return rtn;
}

static double Bond_attraction_weight(const BondPointer bp)
{
    return WATR;
}

double Bond_attraction_energy(const BondPointer bp)
{
    double d0, d;
    d0 = bp->dist0 * SPRING_LENGTH;
    d = Vector_norm(Vector_sub(bp->snd->pos, bp->fst->pos)); 
    /*printf("%f %f %f %f\n", bp->snd->pos.x, bp->snd->pos.y, bp->fst->pos.x, bp->fst->pos.y);*/
    /*exit(0);*/
        
    double w;
    w = Bond_attraction_weight(bp);
    return w * pow(d - d0, 2);
}

Vector Bond_attraction_gradient(const BondPointer bp)
{
    double d0;
    d0 = bp->dist0 * SPRING_LENGTH;

    Vector vecb;
    vecb = Vector_sub(bp->snd->pos, bp->fst->pos);

    double d;
    d = Vector_norm(vecb); 
    if (fabs(d) <  MIN_DIST) {
        d = MIN_DIST;
    } 
    
    double w;
    w = Bond_attraction_weight(bp);

    return Vector_scalar_mult(vecb, 2 * w * (1 - (d0 / d)));
}

void Bond_free(BondPointer bp)
{
    free(bp);
}

