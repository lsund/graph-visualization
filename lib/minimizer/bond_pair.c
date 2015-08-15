/*****************************************************************************

* File Name: bondPair.c

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
#include "angular_gradient.h"

/* Private ******************************************************************/

static double angular_weight(const BondPairPointer bpr)
{
   return WANG;
}


/* Public *******************************************************************/

BondPair BondPair_initialize(Pair pr)
{
    BondPair rtn;
    rtn.fst = (BondPointer) pr.fst;
    rtn.snd = (BondPointer) pr.snd;
    rtn.next = NULL;

    VertexPointer v0, v1, v2, v3;
    v0 = rtn.fst->fst;
    v1 = rtn.fst->snd;
    v2 = rtn.snd->fst;
    v3 = rtn.snd->snd;

    if (v0->id == v2->id) {
        rtn.common = v0;
        rtn.other1 = v1;
        rtn.other2 = v3;
    } else if (v0->id == v3->id) {
        rtn.common = v0;
        rtn.other1 = v1;
        rtn.other2 = v2;
    } else if (v1->id == v2->id) {
        rtn.common = v1;
        rtn.other1 = v0;
        rtn.other2 = v3;
    } else {
        rtn.common = v1;
        rtn.other1 = v0;
        rtn.other2 = v2;
    }
    return rtn;
}

BondPairPointer BondPair_create(Pair pr)
{
    BondPairPointer rtn = calloc(1, sizeof(BondPair));
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

double BondPair_angular_energy(const BondPairPointer bpr)
{
    VertexPointer vi, vj, vk;
    vi = bpr->other1; 
    vj = bpr->common;
    vk = bpr->other2; 

    double xji, yji, xjk, yjk;
    xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

    Vector vecji, vecjk;
    vecji = Vector_initialize(xji, yji);
    vecjk = Vector_initialize(xjk, yjk);
    
    double theta; 
    theta = Vector_angle(vecji, vecjk);
    
    double wij, theta0;
    wij = angular_weight(bpr);
    theta0 = (2 * M_PI) / (vj->mass - 1);

    return wij * pow(theta - theta0, 2);
}

VectorPointer BondPair_angular_gradient(const BondPairPointer bpr)
{
    VertexPointer vi, vj, vk;
    vi = bpr->other1; 
    vj = bpr->common;
    vk = bpr->other2; 
    
    Vector v0, v1, v2; 
    v0 = vi->pos; v1 = vj->pos; v2 = vk->pos;
    
    double w;
    int m;
    w = angular_weight(bpr);
    m = vj->mass - 1;

    double gradient[6];
    gradient[0] = AngularGradient_dfx0(v0, v1, v2, w, m);
    gradient[1] = AngularGradient_dfy0(v0, v1, v2, w, m);
    gradient[2] = AngularGradient_dfx1(v0, v1, v2, w, m);
    gradient[3] = AngularGradient_dfy1(v0, v1, v2, w, m);
    gradient[4] = AngularGradient_dfx2(v0, v1, v2, w, m);
    gradient[5] = AngularGradient_dfy2(v0, v1, v2, w, m);

    assert(!(gradient[0] != gradient[0]));
    assert(!(gradient[1] != gradient[1]));
    assert(!(gradient[2] != gradient[2]));
    assert(!(gradient[3] != gradient[3]));
    assert(!(gradient[4] != gradient[4]));
    assert(!(gradient[5] != gradient[5]));
    
    VectorPointer rtn = Util_allocate(3, sizeof(Vector));

    rtn[0] = Vector_scalar_mult(Vector_initialize(gradient[0], gradient[1]), w);
    rtn[1] = Vector_scalar_mult(Vector_initialize(gradient[2], gradient[3]), w);
    rtn[2] = Vector_scalar_mult(Vector_initialize(gradient[4], gradient[5]), w);

    return rtn;
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

void BondPairs_free(const BondPairPointer bprs)
{
    BondPairPointer bpr = bprs;
    while(bpr != NULL) {
        BondPairPointer tmp = bpr;
        bpr = bpr->next;
        free(tmp);
        tmp = NULL;
    }
}

