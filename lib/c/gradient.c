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

    vi->grad = Vector_add(vi->grad, rpls_grad);
    vj->grad = Vector_add(vj->grad, Vector_negate(rpls_grad));
}

static void first_order(const GraphPointer gp)
{
    int i;
    for (i = 0; i < gp->vs.n; i++) {
        VertexPointer v;
        v = *(gp->vs.set + i);
        v->grad = Vector_add(v->grad, Vertex_potential_gradient(v));
    }
}

static void second_order_repulsion(const GraphPointer gp)
{
    int i;
    for (i = 0; i < gp->grid->npz; i++) {
        ZP z = *(gp->grid->pzps + i);
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
    Z2P z2p = gp->grid->azps;
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

static void second_order_attraction(const GraphPointer gp)
{
    int i;
    for (i = 0; i < gp->bs.n; i++) {
        BondPointer b;
        b = *(gp->bs.set + i);  
        Vector grad = Bond_attraction_gradient(b);
        b->fst->grad = Vector_add(b->fst->grad, grad);
        b->snd->grad = Vector_add(b->snd->grad, Vector_negate(grad));
    }
}

static void second_order(const GraphPointer gp)
{
    second_order_repulsion(gp);
    second_order_attraction(gp);
}

static void third_order(const GraphPointer gp)
{
    if (gp->con == NULL) {
        return;
    }
    BondPairPointer b2p = gp->con;
    while (b2p) {
        
        Pair pr = BondPair_angular_gradient(b2p);
        VertexPointer vi, vk;
        vi = b2p->other1; 
        vk = b2p->other2; 

        vi->grad = Vector_add(vi->grad, *((VectorPointer) pr.fst));
        vk->grad = Vector_add(vk->grad, *((VectorPointer) pr.snd));
        
        free(pr.fst);
        free(pr.snd);

        b2p = b2p->next;
    }
}

static void fourth_order(const GraphPointer gp)
{
    BondPairPointer b2p;
    b2p = gp->crs;
    while (b2p) {

        VertexPointer vi, vj, vk, vl;
        vi = b2p->fst->fst; vj = b2p->fst->snd; 
        vk = b2p->snd->fst; vl = b2p->snd->snd;

        VertexPointer vquad[4] = { vi, vj, vk, vl };
        
        VertexSet_sort(vquad, b2p->cross);
        
        VertexPointer v0, v1;
        v0 = vquad[0]; v1 = vquad[1];

        Pair pr = BondPair_crossing_gradient(b2p, v0, v1);

        v0->grad = Vector_add(v0->grad, *((VectorPointer) pr.fst));
        v1->grad = Vector_add(v1->grad, *((VectorPointer) pr.snd));
        
        free(pr.fst);
        free(pr.snd);
                
        b2p = b2p->next;
    }
}

/* Public *******************************************************************/

void Gradient_calculate(const GraphPointer gp)
{
    first_order(gp);
    second_order(gp);
    third_order(gp);
    fourth_order(gp);
}

/* Test facade *************************************************************/

void (*test_first_order_gradient)(const GraphPointer gp) = first_order;
void (*test_second_order_gradient)(const GraphPointer gp) = second_order;
void (*test_second_order_attraction_gradient)(const GraphPointer gp) = second_order_attraction;
void (*test_second_order_repulsion_gradient)(const GraphPointer gp) = second_order_repulsion;
void (*test_third_order_gradient)(const GraphPointer gp) = third_order;
void (*test_fourth_order_gradient)(const GraphPointer gp) = fourth_order;

