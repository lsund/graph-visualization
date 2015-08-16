/*****************************************************************************

* File Name: bond_connection.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 15-08-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "constants.h"
#include "bond_connection.h"
#include "angular_gradient.h"

/* Private ******************************************************************/

static double angular_weight(const BondConnectionPointer bpr)
{
   return WANG;
}

/* Public *******************************************************************/

BondConnection BondConnection_initialize(const Pair pr)
{
    BondConnection rtn;

    rtn.bpr = BondPair_initialize(pr);
    rtn.next = 0;

    VertexPointer v0, v1, v2, v3;
    v0 = rtn.bpr.fst->fst;
    v1 = rtn.bpr.fst->snd;
    v2 = rtn.bpr.snd->fst;
    v3 = rtn.bpr.snd->snd;

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

BondConnectionPointer BondConnection_create(const Pair pr)
{
    BondConnectionPointer rtn = Util_allocate_initialize(1, sizeof(BondConnection));
    *rtn = BondConnection_initialize(pr);

    return rtn;
}

double BondConnection_angular_energy(const BondConnectionPointer bpr)
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

VectorPointer BondConnection_angular_gradient(const BondConnectionPointer bpr)
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

void BondConnections_free(const BondConnectionPointer bcs)
{
    BondConnectionPointer bpr = bcs;
    while(bpr) {
        BondConnectionPointer tmp = bpr;
        bpr = bpr->next;
        free(tmp);
        tmp = 0;
    }
}

