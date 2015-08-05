/*****************************************************************************

* File Name: bondPair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "constants.h"
#include "bond_pair.h"
#include "bond_set.h"

/* Private ******************************************************************/

static float angular_weight(const BondPairPointer bpr)
{
   return WANG / (bpr->other1->mass * bpr->other2->mass);
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
 * lines intersect the intersection point may be stored in the const floats i_x
 * and i_y.  
 * Credit: http://stackoverflow.com/users/78216/gavin
 */
char BondPair_intersect(const BondPair bpr, float *i_x, float *i_y) 
{
    
    BondPointer b0, b1;
    b0 = bpr.fst; b1 = bpr.snd;

    VertexPointer v0, v1, v2, v3;
    v0 = b0->fst; v1 = b0->snd; 
    v2 = b1->fst; v3 = b1->snd;

    float p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y;
    p0_x = v0->pos.x; p0_y = v0->pos.y;
    p1_x = v1->pos.x; p1_y = v1->pos.y;
    p2_x = v2->pos.x; p2_y = v2->pos.y;
    p3_x = v3->pos.x; p3_y = v3->pos.y;

    float s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     
    s2_y = p3_y - p2_y;

    float s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / 
        (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / 
        (-s2_x * s1_y + s1_x * s2_y);

    if (s >= MIN_DIST && s <= 1 - MIN_DIST && 
        t >= MIN_DIST && t <= 1 - MIN_DIST)
    {
        if (i_x != NULL)
            *i_x = p0_x + (t * s1_x);
        if (i_y != NULL)
            *i_y = p0_y + (t * s1_y);
        return 1;
    }
    return 0; 
}

float BondPair_angular_energy(const BondPairPointer bpr)
{
    VertexPointer vi, vj, vk;
    vi = bpr->other1; 
    vj = bpr->common;
    vk = bpr->other2; 

    float xji, yji, xjk, yjk;
    xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

    Vector vecji, vecjk;
    vecji = Vector_initialize(xji, yji);
    vecjk = Vector_initialize(xjk, yjk);
    
    float theta; 
    theta = Vector_angle(vecji, vecjk);
    
    float wij, theta0;
    wij = angular_weight(bpr);
    theta0 = (2 * M_PI) / (vj->mass - 1);

    return wij * powf(theta - theta0, 2);
}

Pair BondPair_angular_gradient(const BondPairPointer bpr)
{
    VertexPointer vi, vj, vk;
    vi = bpr->other1; 
    vj = bpr->common;
    vk = bpr->other2; 
    
    float xji, yji, xjk, yjk; 
    xji = vi->pos.x - vj->pos.x;
    yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x;
    yjk = vk->pos.y - vj->pos.y;

    if (Util_about(xji, xjk)) {
        xji += MIN_DIST;
        xjk -= MIN_DIST;
    }
    if (Util_about(yji, yjk)) {
        yji += MIN_DIST;
        yjk -= MIN_DIST;
    }

    Vector vecji, vecjk;
    vecji = Vector_initialize(xji, yji);
    vecjk = Vector_initialize(xjk, yjk);
    
    float theta0;
    theta0 = (2 * M_PI) / (vj->mass - 1);
    
    float a1, a2; 
    a1 = (xjk * yji - yjk * xji);
    a2 = (yjk * xji - xjk * yji);
    
    float b;
    b = theta0 - Vector_angle(vecji, vecjk);
    
    float c1, c2;
    c1 = vecjk.len * powf((powf(xji, 2) + powf(yji, 2)), (3/2));
    c2 = vecji.len * powf((powf(xjk, 2) + powf(yjk, 2)), (3/2));
    
    float dn, dd, dsq, d;
    dn = pow(a2, 2);
    dd = (powf(xji, 2) + powf(yji, 2)) * (powf(xjk, 2) + powf(yjk, 2));
    if (dd < MIN_DIST) {
        dd = MIN_DIST;
    }
    dsq = dn / dd;
    if (dsq < 0) {
        Util_runtime_error("Negative square root argument");
    }
    d = sqrtf(dn / dd);

    float aver[4];
    aver[0] = 2 * yji * a1;
    aver[1] = 2 * xji * a2;
    aver[2] = 2 * yjk * a2;
    aver[3] = 2 * xjk * a1;
    
    float c1d, c2d;
    c1d = fmax(c1 * d, MIN_DIST); 
    c2d = fmax(c2 * d, MIN_DIST);

    float dxji, dyji, dxjk, dyjk;
    dxji = -(aver[0] * b) / c1d;
    dyji = -(aver[1] * b) / c1d;
    dxjk = -(aver[2] * b) / c2d;
    dyjk = -(aver[3] * b) / c2d;

    float wji, wjk;

    wji = angular_weight(bpr);
    wjk = angular_weight(bpr);

    VectorPointer frcji, frcjk;
    
    frcji = Vector_create(dxji, dyji);
    frcjk = Vector_create(dxjk, dyjk);

    *frcji = Vector_scalar_mult(*frcji, wji);  
    *frcjk = Vector_scalar_mult(*frcjk, wjk);  
    
    return Pair_initialize(frcji, frcjk);
}

int has_common_vertex(BondPair bpr) 
{
    BondPointer bp1, bp2;
    bp1 = bpr.fst; bp2 = bpr.snd;
    return  bp1->fst->id == bp2->fst->id ||
            bp1->fst->id == bp2->snd->id || 
            bp1->snd->id == bp2->fst->id ||
            bp1->snd->id == bp2->snd->id;
}

void BondPairs_free(BondPairPointer bprs)
{
    BondPairPointer bpr = bprs;
    while(bpr != NULL) {
        BondPairPointer tmp = bpr;
        bpr = bpr->next;
        free(tmp);
        tmp = NULL;
    }
}

