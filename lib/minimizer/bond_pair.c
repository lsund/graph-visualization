/*****************************************************************************

* File Name: bond_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "constants.h"
#include "bond_pair.h"
#include "bond_set.h"

/* Public *******************************************************************/

BondPair BondPair_initialize(const Pair pr)
{
    BondPair rtn;
    rtn.fst = (BondPointer) pr.fst;
    rtn.snd = (BondPointer) pr.snd;

    return rtn;
}

BondPairPointer BondPair_create(const Pair pr)
{
    BondPairPointer rtn = Util_allocate_initialize(1, sizeof(BondPair));
    *rtn = BondPair_initialize(pr);

    return rtn;
}

/**
 * Returns 1 if the lines intersect, otherwise 0. In Vector_addition, if the
 * lines intersect the intersection point may be stored in the const doubles i_x
 * and i_y.  
 * Credit: http://stackoverflow.com/users/78216/gavin
 */
int BondPair_intersect(const BondPair bpr, VectorPointer v) 
{
    assert(v);

    BondPointer b0, b1;
    b0 = bpr.fst; b1 = bpr.snd;
    
    VertexPointer vertices[4];
    vertices[0] = b0->fst; 
    vertices[1] = b0->snd; 
    vertices[2] = b1->fst; 
    vertices[3] = b1->snd;

    double p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y;
    p0_x = vertices[0]->pos.x; p0_y = vertices[0]->pos.y;
    p1_x = vertices[1]->pos.x; p1_y = vertices[1]->pos.y;
    p2_x = vertices[2]->pos.x; p2_y = vertices[2]->pos.y;
    p3_x = vertices[3]->pos.x; p3_y = vertices[3]->pos.y;

    double s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     
    s2_y = p3_y - p2_y;

    double s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / 
        (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / 
        (-s2_x * s1_y + s1_x * s2_y);

    if (s >= EPS && s <= 1 - EPS && 
        t >= EPS && t <= 1 - EPS)
    {
        double i_x, i_y;
        i_x = p0_x + (t * s1_x);
        i_y = p0_y + (t * s1_y);
        *v = Vector_initialize(i_x, i_y);
        return 1;
    }
    return 0; 
}

int BondPair_has_common_vertex(const BondPair bpr) 
{
    BondPointer bp1, bp2;
    bp1 = bpr.fst; bp2 = bpr.snd;
    return  bp1->fst->id == bp2->fst->id ||
            bp1->fst->id == bp2->snd->id || 
            bp1->snd->id == bp2->fst->id ||
            bp1->snd->id == bp2->snd->id;
}

