/*****************************************************************************

* File Name: objective.c 
* Author: Ludvpig Sundström

* Description: The objective function F = F1 + F2 + F3 + F4 where FN considers
* N vertices. 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "graph.h"
#include "util.h"

/* Private ******************************************************************/

static float first_order(const GP gp) {

    float rtn;
    rtn = 0;
    int i;
    for (i = 0; i < gp->nv; i++) {
        VP v = *(gp->vps + i);
        rtn += Vertex_potential_energy(v);
    }
    return rtn;
}

static float second_order_attraction(const GP gp) 
{
    float rtn;
    rtn = 0; 

    int i;
    for (i = 0; i < gp->nb; i++) {
        BP bp;
        bp = *(gp->bps + i);
        rtn += bond_attraction_energy(bp);
    }

    return rtn;
}

static float second_order_repulsion(const GP gp) 
{
    float rtn;
    rtn = 0.0;
    
    int i;
    for (i = 0; i < gp->npz; i++) {
        ZP zp = *(gp->pzps + i);
        VP vpi = zp->members;
        while (vpi->next) {
            VP vpj;
            vpj = vpi->next; 
            while (vpj) {
                P pr;
                if (vpi->id > vpj->id) {
                    pr = pair_initialize(vpj, vpi);
                } else {
                    pr = pair_initialize(vpj, vpi);
                }
                rtn += VertexPair_repulsion_energy(pr);
                vpj = vpj->next;
            }
            vpi = vpi->next;
        }
    }
    ZprPtr zpr = gp->azps;
    while (zpr) {
        VP vpi;
        vpi = zpr->fst->members;
        while (vpi) {
            VP vpj;
            vpj = zpr->snd->members;
            while (vpj) {
                P pr;
                if (vpi->id > vpj->id) {
                    pr = pair_initialize(vpj, vpi);
                } else {
                    pr = pair_initialize(vpi, vpj);
                }
                rtn += VertexPair_repulsion_energy(pr);
                vpj = vpj->next;          
            }
            vpi = vpi->next;
        }
        zpr = zpr->next;
    }
    return rtn;
}

static float second_order(const GP gp)
{
    float e2a, e2r;
    e2a = second_order_attraction(gp);
    e2r = second_order_repulsion(gp);

    return e2a + e2r; 
}

static float third_order(const GP gp)
{
    if (!gp->connected)
        return 0;

    float rtn;
    rtn = 0; 

    B2P b2p;
    b2p = gp->connected;
    while (b2p) {
        rtn += BondPair_angular_energy(b2p);
        b2p = b2p->next;
    }

    return rtn;
}

static float fourth_order(const GP gp)
{
    float rtn;
    rtn = 0;

    B2P b2p;
    b2p = gp->crosses;
    while (b2p) {
        rtn += BondPair_crossing_energy(b2p);
        b2p = b2p->next;
    }
    return rtn;
}

/* Public *******************************************************************/

void Energy_global(const GP gp)
{
    gp->energy = fourth_order(gp);
}

void Energy_local(const GP gp) 
{
    float e1, e2, e3, e4;
    e1 = first_order(gp);
    e2 = second_order(gp);
    e3 = third_order(gp);
    e4 = fourth_order(gp);
    gp->energy = e1 + e2 + e3 + e4;
}

/* Testing facade ***********************************************************/

float (*test_first_order_energy)(const GP gp) = first_order;
float (*test_second_order_energy)(const GP gp) = second_order;
float (*test_second_order_attraction_energy)(const GP gp) = second_order_attraction;
float (*test_second_order_repulsion_energy)(const GP gp) = second_order_repulsion;
float (*test_third_order_energy)(const GP gp) = third_order;
float (*test_fourth_order_energy)(const GP gp) = fourth_order;

