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

static void apply_repulsion(
        const VertexPointer vi, 
        const VertexPointer vj,
        const VectorPointer gradient
    ) 
{
    Vector rpls_grad;
    Pair pr = Pair_initialize(vi, vj);
    rpls_grad = VertexPair_repulsion_gradient(pr);

    gradient[vi->id] = Vector_add(gradient[vi->id], rpls_grad);
    gradient[vj->id] = Vector_add(gradient[vj->id], Vector_negate(rpls_grad));
}

static void first_order(const VertexSet vs, const VectorPointer gradient)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = *(vs.set + i);
        gradient[i] = Vector_add(gradient[i], Vertex_potential_gradient(v));
    }
}

static void second_order_repulsion(
        const GridPointer grid, 
        const VectorPointer gradient
    )
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
                    apply_repulsion(vj, vi, gradient);
                } else {
                    apply_repulsion(vi, vj, gradient);
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
                    apply_repulsion(vj, vi, gradient);
                } else {
                    apply_repulsion(vi, vj, gradient);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        z2p = z2p->next;
    }
}

static void second_order_attraction(
        const BondSet bs, 
        const VectorPointer gradient
    )
{
    int i;
    for (i = 0; i < bs.n; i++) {
        BondPointer b;
        b = *(bs.set + i);
        Vector grad, neg_grad;
        grad = Bond_attraction_gradient(b);
        neg_grad = Vector_negate(grad);
        gradient[b->fst->id] = Vector_add(gradient[b->fst->id], grad);
        gradient[b->snd->id] = Vector_add(gradient[b->snd->id], neg_grad);
    }
}

static void second_order(
        const GraphPointer graph, 
        const VectorPointer gradient
    )
{
    second_order_repulsion(graph->grid, gradient);
    second_order_attraction(graph->bs, gradient);
}

static void third_order(
        const BondPairPointer con, 
        const VectorPointer gradient
    )
{
    BondPairPointer bpr = con;
    while (bpr) {
        
        VectorPointer grad;
        grad = BondPair_angular_gradient(bpr);
        VertexPointer vi, vj, vk;
        vi = bpr->other1; 
        vj = bpr->common; 
        vk = bpr->other2; 

        gradient[vi->id] = Vector_add(gradient[vi->id], grad[0]);
        gradient[vj->id] = Vector_add(gradient[vj->id], grad[1]);
        gradient[vk->id] = Vector_add(gradient[vk->id], grad[2]);
        
        free(grad); 

        bpr = bpr->next;
    }
}

static void fourth_order(
        const BondCrossPointer crs, 
        const VectorPointer gradient
    )
{
    BondCrossPointer bcrs;
    bcrs = crs;
    while (bcrs) {

        VectorPointer grad = BondCross_crossing_gradient(bcrs);

        VertexPointer v0, v1, v2, v3;
        v0 = bcrs->bpr.fst->fst; v1 = bcrs->bpr.fst->snd; 
        v2 = bcrs->bpr.snd->fst; v3 = bcrs->bpr.snd->snd;

        gradient[v0->id] = Vector_add(gradient[v0->id], grad[0]);
        gradient[v1->id] = Vector_add(gradient[v1->id], grad[1]);
        gradient[v2->id] = Vector_add(gradient[v2->id], grad[2]);
        gradient[v3->id] = Vector_add(gradient[v3->id], grad[3]);
        
        free(grad); 
                
        bcrs = bcrs->next;
    }
}

/* Public *******************************************************************/

void Gradient_calculate(const GraphPointer graph, const VectorPointer gradient)
{
    first_order(graph->vs, gradient);
    second_order(graph, gradient);
    third_order(graph->con, gradient);
    fourth_order(graph->crs, gradient);
}

/* Test facade *************************************************************/

void (*test_first_order_gradient)(
        const VertexSet vs, 
        const VectorPointer gradient
    ) = first_order;
void (*test_second_order_gradient)(
        const GraphPointer graph, 
        const VectorPointer gradient) = second_order;
void (*test_second_order_attraction_gradient)(
        const BondSet bs, 
        const VectorPointer gradient
    ) = second_order_attraction;
void (*test_second_order_repulsion_gradient)(
        const GridPointer grid, 
        const VectorPointer gradient
    ) = second_order_repulsion;
void (*test_third_order_gradient)(
        const BondPairPointer con, 
        const VectorPointer gradient
    ) = third_order;
void (*test_fourth_order_gradient)(
        const BondCrossPointer crs, 
        const VectorPointer gradient
    ) = fourth_order;

