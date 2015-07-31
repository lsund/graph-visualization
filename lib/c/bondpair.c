/*****************************************************************************

* File Name: bondpair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "constants.h"
#include "bondpair.h"
#include "bond_set.h"

/* Private ******************************************************************/

static float angular_weight(const B2P b2p)
{
   return WANG / (b2p->other1->mass * b2p->other2->mass);
}

static float crossing_weight(const B2P b2p)
{
   return WCRS;
}

/* Public *******************************************************************/

B2P BondPair_create(P pr, B2P next)
{
    B2P rtn = calloc(1, sizeof(Bpr));
    VP v0, v1, v2, v3;
    rtn->fst = (BP) pr.fst;
    rtn->snd = (BP) pr.snd;
    v0 = rtn->fst->fst;
    v1 = rtn->fst->snd;
    v2 = rtn->snd->fst;
    v3 = rtn->snd->snd;
    rtn->next = next;
    if (v0->id == v2->id) {
        rtn->common = v0;
        rtn->other1 = v1;
        rtn->other2 = v3;
    } else if (v0->id == v3->id) {
        rtn->common = v0;
        rtn->other1 = v1;
        rtn->other2 = v2;
    } else if (v1->id == v2->id) {
        rtn->common = v1;
        rtn->other1 = v0;
        rtn->other2 = v3;
    } else {
        rtn->common = v1;
        rtn->other1 = v0;
        rtn->other2 = v2;
    }
    return rtn;
}

void BondPair_set_cross(B2P b2p, Vec2D cross)
{
    BP b0, b1;
    b0 = b2p->fst; b1 = b2p->snd;

    VP v0, v1, v2, v3;
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

    b2p->cross = cross;
}

/**
 * Returns 1 if the lines intersect, otherwise 0. In Vector2d_addition, if the
 * lines intersect the intersection point may be stored in the const floats i_x
 * and i_y.  
 * Credit: http://stackoverflow.com/users/78216/gavin
 */
char BondPair_intersect(const B2P b2p, float *i_x, float *i_y) 
{
    
    BP b0, b1;
    b0 = b2p->fst; b1 = b2p->snd;

    VP v0, v1, v2, v3;
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

float BondPair_angular_energy(const B2P b2p)
{
    VP vi, vj, vk;
    vi = b2p->other1; 
    vj = b2p->common;
    vk = b2p->other2; 

    float xji, yji, xjk, yjk;
    xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

    Vec2D vecji, vecjk;
    vecji = Vector2d_initialize(xji, yji);
    vecjk = Vector2d_initialize(xjk, yjk);
    
    float theta; 
    theta = Vector2d_angle(vecji, vecjk);
    
    float wij, theta0;
    wij = angular_weight(b2p);
    theta0 = (2 * M_PI) / (vj->mass - 1);

    return wij * powf(theta - theta0, 2);
}

P BondPair_angular_force(const B2P b2p)
{
    VP vi, vj, vk;
    vi = b2p->other1; 
    vj = b2p->common;
    vk = b2p->other2; 
    
    float xji, yji, xjk, yjk; 
    xji = vi->pos.x - vj->pos.x;
    yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x;
    yjk = vk->pos.y - vj->pos.y;

    if (about(xji, xjk)) {
        xji += MIN_DIST;
        xjk -= MIN_DIST;
    }
    if (about(yji, yjk)) {
        yji += MIN_DIST;
        yjk -= MIN_DIST;
    }

    Vec2D vecji, vecjk;
    vecji = Vector2d_initialize(xji, yji);
    vecjk = Vector2d_initialize(xjk, yjk);
    
    float theta0;
    theta0 = (2 * M_PI) / (vj->mass - 1);
    
    float a1, a2; 
    a1 = (xjk * yji - yjk * xji);
    a2 = (yjk * xji - xjk * yji);
    
    float b;
    b = theta0 - Vector2d_angle(vecji, vecjk);
    
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
        rt_error("Negative square root argument");
    }
    d = sqrtf(dn / dd);

    float aver[4];
    aver[0] = 2 * yji * a1;
    aver[1] = 2 * xji * a2;
    aver[2] = 2 * yjk * a2;
    aver[3] = 2 * xjk * a1;
    
    float c1d, c2d;
    c1d = c1 * d; c2d = c2 * d;

    if (c1d < MIN_DIST) {
        c1d = MIN_DIST; 
    } 
    if (c2d < MIN_DIST) {
        c2d = MIN_DIST;
    }
    
    float dxji, dyji, dxjk, dyjk;
    dxji = -(aver[0] * b) / c1d;
    dyji = -(aver[1] * b) / c1d;
    dxjk = -(aver[2] * b) / c2d;
    dyjk = -(aver[3] * b) / c2d;

    float wji, wjk;

    wji = angular_weight(b2p);
    wjk = angular_weight(b2p);

    Vec2DP frcji, frcjk;
    
    frcji = Vector2d_create(dxji, dyji);
    frcjk = Vector2d_create(dxjk, dyjk);

    *frcji = Vector2d_scalar_mult(*frcji, wji);  
    *frcjk = Vector2d_scalar_mult(*frcjk, wjk);  
    
    return pair_initialize(frcji, frcjk);
}

float BondPair_crossing_energy(B2P b2p) 
{
    VP vi, vj, vk, vl;
    vi = b2p->fst->fst; vj = b2p->fst->snd; 
    vk = b2p->snd->fst; vl = b2p->snd->snd;
    
    VP vquad[4] = { vi, vj, vk, vl };
    
    VS_sort(vquad, b2p->cross);
    
    float dvc1, dvc2; 
    dvc1 = Vector2d_norm(Vector2d_sub(b2p->cross, vquad[0]->pos));
    dvc2 = Vector2d_norm(Vector2d_sub(b2p->cross, vquad[1]->pos));
    
    float wi = crossing_weight(b2p);

    return wi * (dvc1 + dvc2);

}

P BondPair_crossing_force(B2P b2p, VP v0, VP v1)
{

    Vec2D d0, d1;
    d0 = Vector2d_sub(b2p->cross, v0->pos); 
    d1 = Vector2d_sub(b2p->cross, v1->pos); 

    float len0, len1;
    len0 = Vector2d_norm(d0); len1 = Vector2d_norm(d1);

    if (equal(len0, 0.0)) {
        len0 = MIN_DIST;
    } else if (equal(len1, 0.0)) {
        len1 = MIN_DIST;
    }
    
    float dx0, dy0, dx1, dy1; 
    dx0 = d0.x / len0;
    dy0 = d0.y / len0;
    dx1 = d1.x / len1;
    dy1 = d1.y / len1;

    Vec2D *frc0, *frc1; 
    frc0 = Vector2d_create(dx0, dy0);
    frc1 = Vector2d_create(dx1, dy1);
    
    float w0, w1;
    w0 = crossing_weight(b2p);
    w1 = crossing_weight(b2p);

    *frc0 = Vector2d_scalar_mult(*frc0, w0);  
    *frc1 = Vector2d_scalar_mult(*frc1, w1);  
    
    return pair_initialize(frc0, frc1);
}

void BondPairs_free(B2P b2ps)
{
    B2P b2p = b2ps;
    while(b2p != NULL) {
        B2P tmp = b2p;
        b2p = b2p->next;
        free(tmp);
        tmp = NULL;
    }
}

