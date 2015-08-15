/***************************************************************************** 
 
* File Name: gradient.c

* Author: Ludvig Sundström

* Description: The gradient of the objective function.

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "pair.h"
#include "util.h"
#include "constants.h"
#include "graph.h"
#include "vertex_set.h"

/* Private ******************************************************************/

static void apply_repulsion(const VertexPointer vi, const VertexPointer vj) 
{
    Vector rpls_grad;
    Pair pr = Pair_initialize(vi, vj);
    rpls_grad = VertexPair_repulsion_gradient(pr);

    vi->gradient = Vector_add(vi->gradient, rpls_grad);
    vj->gradient = Vector_add(vj->gradient, Vector_negate(rpls_grad));
}

static void first_order(const VertexSet vs)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = *(vs.set + i);
        v->gradient = Vector_add(v->gradient, Vertex_potential_gradient(v));
    }
}

static void second_order_repulsion(const GridPointer grid)
{
    int i;
    for (i = 0; i < grid->npz; i++) {
        ZonePointer z = *(grid->pzps + i);
        VertexPointer vi = z->members;
        while (vi->next) {
            VertexPointer vj;
            vj = vi->next; 
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;
            }
            vi = vi->next;
        }
    }
    ZonePairPointer z2p = grid->azps;
    while (z2p) {
        VertexPointer vi;
        vi = z2p->fst->members;
        while (vi) {
            VertexPointer vj;
            vj = z2p->snd->members;
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        z2p = z2p->next;
    }
}

static void second_order_attraction(const BondSet bs)
{
    int i;
    for (i = 0; i < bs.n; i++) {
        BondPointer b;
        b = *(bs.set + i);
        Vector grad, neg_grad;
        grad = Bond_attraction_gradient(b);
        neg_grad = Vector_negate(grad);

        b->fst->gradient = Vector_add(b->fst->gradient, grad);
        b->snd->gradient = Vector_add(b->snd->gradient, neg_grad);
    }
}

static void second_order(const GraphPointer graph)
{
    second_order_repulsion(graph->grid);
    second_order_attraction(graph->bs);
}

static void third_order(const BondPairPointer con)
{
    BondPairPointer bpr = con;
    while (bpr) {
        
        VectorPointer grad;
        grad = BondPair_angular_gradient(bpr);
        VertexPointer vi, vj, vk;
        vi = bpr->other1; 
        vj = bpr->common; 
        vk = bpr->other2; 

        vi->gradient = Vector_add(vi->gradient, grad[0]);
        vj->gradient = Vector_add(vj->gradient, grad[1]);
        vk->gradient = Vector_add(vk->gradient, grad[2]);
        
        free(grad); 

        bpr = bpr->next;
    }
}

static void fourth_order(const BondCrossPointer crs)
{
    BondCrossPointer bcrs;
    bcrs = crs;
    while (bcrs) {

        VectorPointer grad = BondCross_crossing_gradient(bcrs);

        VertexPointer v0, v1, v2, v3;
        v0 = bcrs->bpr.fst->fst; v1 = bcrs->bpr.fst->snd; 
        v2 = bcrs->bpr.snd->fst; v3 = bcrs->bpr.snd->snd;

        v0->gradient = Vector_add(v0->gradient, grad[0]);
        v1->gradient = Vector_add(v1->gradient, grad[1]);
        v2->gradient = Vector_add(v2->gradient, grad[2]);
        v3->gradient = Vector_add(v3->gradient, grad[3]);
        
        free(grad); 
                
        bcrs = bcrs->next;
    }
}

/* Public *******************************************************************/

void Gradient_calculate(const GraphPointer graph)
{
    first_order(graph->vs);
    second_order(graph);
    third_order(graph->con);
    fourth_order(graph->crs);
}

/* Test facade *************************************************************/

void (*test_first_order_gradient)(const VertexSet vs) = first_order;
void (*test_second_order_gradient)(const GraphPointer graph) = second_order;
void (*test_second_order_attraction_gradient)(const BondSet bs) =second_order_attraction;
void (*test_second_order_repulsion_gradient)(const GridPointer grid) =second_order_repulsion; 
void (*test_third_order_gradient)(const BondPairPointer con) = third_order; 
void (*test_fourth_order_gradient)(const BondCrossPointer crs) = fourth_order;

