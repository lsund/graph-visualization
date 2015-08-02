/*****************************************************************************

* File Name: objective.c 
* Author: Ludvp0g Sundström

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

static float first_order(const GraphPointer graph) {

    float rtn;
    rtn = 0;
    int i;
    for (i = 0; i < graph->vs.n; i++) {
        VertexPointer v = *(graph->vs.set + i);
        rtn += Vertex_potential_energy(v);
    }
    return rtn;
}

static float second_order_attraction(const GraphPointer graph) 
{
    float rtn;
    rtn = 0; 

    int i;
    for (i = 0; i < graph->bs.n; i++) {
        BondPointer bp;
        bp = *(graph->bs.set + i);
        rtn += Bond_attraction_energy(bp);
    }

    return rtn;
}

static float second_order_repulsion(const GraphPointer graph) 
{
    float rtn;
    rtn = 0.0;
    
    int i;
    for (i = 0; i < graph->grid->npz; i++) {
        ZP zp = *(graph->grid->pzps + i);
        VertexPointer vp0 = zp->members;
        while (vp0->next) {
            VertexPointer vp1;
            vp1 = vp0->next; 
            while (vp1) {
                Pair pr;
                if (vp0->id > vp1->id) {
                    pr = Pair_initialize(vp1, vp0);
                } else {
                    pr = Pair_initialize(vp1, vp0);
                }
                rtn += VertexPair_repulsion_energy(pr);
                vp1 = vp1->next;
            }
            vp0 = vp0->next;
        }
    }
    Z2P z2p = graph->grid->azps;
    while (z2p) {
        VertexPointer vp0;
        vp0 = z2p->fst->members;
        while (vp0) {
            VertexPointer vp1;
            vp1 = z2p->snd->members;
            while (vp1) {
                Pair pr;
                if (vp0->id > vp1->id) {
                    pr = Pair_initialize(vp1, vp0);
                } else {
                    pr = Pair_initialize(vp0, vp1);
                }
                rtn += VertexPair_repulsion_energy(pr);
                vp1 = vp1->next;          
            }
            vp0 = vp0->next;
        }
        z2p = z2p->next;
    }
    return rtn;
}

static float second_order(const GraphPointer graph)
{
    float e2a, e2r;
    e2a = second_order_attraction(graph);
    e2r = second_order_repulsion(graph);

    return e2a + e2r; 
}

static float third_order(const GraphPointer graph)
{
    if (!graph->con)
        return 0;

    float rtn;
    rtn = 0; 

    BondPairPointer bpr;
    bpr = graph->con;
    while (bpr) {
        rtn += BondPair_angular_energy(bpr);
        bpr = bpr->next;
    }

    return rtn;
}

static float fourth_order(const GraphPointer graph)
{
    float rtn;
    rtn = 0;

    BondPairPointer bpr;
    bpr = graph->crs;
    while (bpr) {
        rtn += BondPair_crossing_energy(bpr);
        bpr = bpr->next;
    }
    return rtn;
}

/* Public *******************************************************************/

float Energy_calculate(const GraphPointer graph) 
{
    float e1, e2, e3, e4;
    e1 = first_order(graph);
    e2 = second_order(graph);
    e3 = third_order(graph);
    e4 = fourth_order(graph);
    return e1 + e2 + e3 + e4;
}

/* Testing facade ***********************************************************/

float (*test_first_order_energy)(const GraphPointer graph) = first_order;
float (*test_second_order_energy)(const GraphPointer graph) = second_order;
float (*test_second_order_attraction_energy)(const GraphPointer graph) = 
        second_order_attraction;
float (*test_second_order_repulsion_energy)(const GraphPointer graph) = 
        second_order_repulsion;
float (*test_third_order_energy)(const GraphPointer graph) = third_order;
float (*test_fourth_order_energy)(const GraphPointer graph) = fourth_order;

