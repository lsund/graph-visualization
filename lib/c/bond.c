/*****************************************************************************

* File Name: bond.c

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

BP bond_create(const VP fst, const VP snd, const float dist0)
{
    fst->mass += 1;
    snd->mass += 1;

    BP rtn = malloc(sizeof(B));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;
    return rtn;
}

static float bond_attraction_weight(const BP bp)
{
    return WATR;
}

void free_bonds(BP *bps, int nb) 
{
    int i;
    for (i = 0; i < nb; i++) {
        free(*(bps + i));
    }
    free(bps);
    bps = NULL;
}

int has_common_vertex(BP bp1, BP bp2) 
{
    return  bp1->fst->id == bp2->fst->id ||
            bp1->fst->id == bp2->snd->id || 
            bp1->snd->id == bp2->fst->id ||
            bp1->snd->id == bp2->snd->id;
}

float bond_attraction_energy(const BP bp)
{
    float d0i, di, wi; 
    d0i = bp->dist0 * SPRING_LENGTH;
    di = Vector2d_norm(Vector2d_sub(bp->snd->pos, bp->fst->pos)); 
    wi = bond_attraction_weight(bp);
    return wi * powf(di - d0i, 2);
}

Vec2D bond_attraction_force(const BP bp)
{
    float d0i, wi;
    d0i = bp->dist0 * SPRING_LENGTH;
    wi = bond_attraction_weight(bp);

    Vec2D vecb;
    vecb = Vector2d_sub(bp->snd->pos, bp->fst->pos);

    float di;
    di = Vector2d_norm(vecb); 
    if (fabs(di) <  MIN_DIST) {
        di = MIN_DIST;
    } 

    return Vector2d_scalar_mult(vecb, 2 * wi * (di - d0i) / di);
}

