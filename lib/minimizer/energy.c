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
#include "util.h"
#include "energy.h"

/* Private ******************************************************************/

static void first_order_energy(const GraphPointer graph) 
{
    VertexSet vs; 
    vs = graph->vs;
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = *(vs.set + i);
        
        Bond b;
        b = Bond_initialize(v, &graph->center, 0.0); 

        double e;
        e = Bond_attraction_energy(&b);

        graph->energy += e;
        v->energy = e;
    }
}

static void second_order_attraction_energy(const GraphPointer graph) 
{
    BondSet bs;
    bs = graph->bs;
    int i;
    for (i = 0; i < bs.n; i++) {
        BondPointer b;
        b = *(bs.set + i);
        double e;
        e = Bond_attraction_energy(b);
        graph->energy += e;
        b->fst->energy += e / 2;
        b->snd->energy += e / 2;
    }
}

static void second_order_repulsion_energy(const GraphPointer graph) 
{
    GridPointer grid;
    grid = graph->grid;
    int i;
    for (i = 0; i < grid->npz; i++) {
        ZonePointer zp = *(grid->pzps + i);
        VertexPointer v0 = zp->members;
        while (v0->next) {
            VertexPointer v1;
            v1 = v0->next; 
            while (v1) {
                Pair pr;
                if (v0->id > v1->id) {
                    pr = Pair_initialize(v1, v0);
                } else {
                    pr = Pair_initialize(v0, v1);
                }
                double e;
                e = VertexPair_repulsion_energy(pr);
                graph->energy += e;
                v0->energy += e / 2;
                v1->energy += e / 2;
                v1 = v1->next;
            }
            v0 = v0->next;
        }
    }
    ZonePairPointer z2p = grid->azps;
    while (z2p) {
        VertexPointer v0;
        v0 = z2p->fst->members;
        while (v0) {
            VertexPointer v1;
            v1 = z2p->snd->members;
            while (v1) {
                Pair pr;
                if (v0->id > v1->id) {
                    pr = Pair_initialize(v1, v0);
                } else {
                    pr = Pair_initialize(v0, v1);
                }
                double e;
                e = VertexPair_repulsion_energy(pr);
                graph->energy += e;
                v0->energy += e / 2;
                v1->energy += e / 2;
                v1 = v1->next;          
            }
            v0 = v0->next;
        }
        z2p = z2p->next;
    }
}

static void second_order_energy(const GraphPointer graph)
{
    second_order_attraction_energy(graph);
    second_order_repulsion_energy(graph);
}

static void third_order_energy(const GraphPointer graph)
{
    
    BondConnectionPointer bpr;
    bpr = graph->con;

    while (bpr) {
        double e;
        e = BondConnection_angular_energy(bpr);
        graph->energy += e;
        bpr->common->energy += e / 3;
        bpr->other1->energy += e / 3;
        bpr->other2->energy += e / 3;
        bpr = bpr->next;
    }
}

static void fourth_order_energy(const GraphPointer graph)
{
    BondOverlapPointer bcrs;
    bcrs = graph->crs;

    while (bcrs) {
        double e;
        e = BondOverlap_overlap_energy(bcrs);
        graph->energy += e;
        bcrs->bpr.fst->fst->energy += e / 4;
        bcrs->bpr.fst->snd->energy += e / 4;
        bcrs->bpr.snd->fst->energy += e / 4;
        bcrs->bpr.snd->snd->energy += e / 4;
        bcrs = bcrs->next;
    }
}

/* Public *******************************************************************/

void Energy_calculate(const GraphPointer graph) 
{
    graph->energy = 0.0;
    first_order_energy(graph);
    second_order_energy(graph);
    third_order_energy(graph);
    fourth_order_energy(graph);

    assert(!(graph->energy != graph->energy));
}

/* Testing facade ***********************************************************/

void  (*test_first_order_energy)(const GraphPointer graph) = 
        first_order_energy;
void  (*test_second_order_energy)(const GraphPointer graph) = 
        second_order_energy;
void  (*test_second_order_attraction_energy)(const GraphPointer graph) = 
        second_order_attraction_energy;
void  (*test_second_order_repulsion_energy)(const GraphPointer graph) = 
        second_order_repulsion_energy;
void  (*test_third_order_energy)(const GraphPointer graph) = 
        third_order_energy;
void  (*test_fourth_order_energy)(const GraphPointer graph) = 
        fourth_order_energy;

