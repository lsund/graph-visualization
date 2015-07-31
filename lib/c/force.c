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

static void apply_repulsion(const VP vi, const VP vj)
{
    Vec2D rpls_frc;
    P pr = pair_initialize(vi, vj);
    rpls_frc = VertexPair_repulsion_force(pr);

    vi->vel = Vector2d_add(vi->vel, rpls_frc);
    vj->vel = Vector2d_add(vj->vel, Vector2d_negate(rpls_frc));
}

static void first_order(const GP gp)
{
    int i;
    for (i = 0; i < gp->nv; i++) {
        VP v;
        v = *(gp->vps + i);
        v->vel = Vector2d_add(v->vel, Vertex_potential_force(v));
    }
}

static void second_order_repulsion(const GP gp)
{
    int i;
    for (i = 0; i < gp->npz; i++) {
        ZP z = *(gp->pzps + i);
        VP vi = z->members;
        while (vi->next) {
            VP vj;
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
    ZprPtr zpr = gp->azps;
    while (zpr) {
        VP vi;
        vi = zpr->fst->members;
        while (vi) {
            VP vj;
            vj = zpr->snd->members;
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
        zpr = zpr->next;
    }
}

static void second_order_attraction(const GP gp)
{
    int i;
    for (i = 0; i < gp->nb; i++) {
        BP b;
        b = *(gp->bps + i);  
        Vec2D frc = bond_attraction_force(b);
        b->fst->vel = Vector2d_add(b->fst->vel, frc);
        b->snd->vel = Vector2d_add(b->snd->vel, Vector2d_negate(frc));
    }
}

static void second_order(const GP gp)
{
    second_order_repulsion(gp);
    second_order_attraction(gp);
}

static void third_order(const GP gp)
{
    if (gp->connected == NULL) {
        return;
    }
    B2P b2p = gp->connected;
    while (b2p) {
        
        P pr = BondPair_angular_force(b2p);
        VP vi, vk;
        vi = b2p->other1; 
        vk = b2p->other2; 

        vi->vel = Vector2d_add(vi->vel, *((Vec2DP) pr.fst));
        vk->vel = Vector2d_add(vk->vel, *((Vec2DP) pr.snd));
        
        free(pr.fst);
        free(pr.snd);

        b2p = b2p->next;
    }
}

static void fourth_order(const GP gp)
{
    B2P b2p;
    b2p = gp->crosses;
    while (b2p) {

        VP vi, vj, vk, vl;
        vi = b2p->fst->fst; vj = b2p->fst->snd; 
        vk = b2p->snd->fst; vl = b2p->snd->snd;

        VP vquad[4] = { vi, vj, vk, vl };
        
        VS_sort(vquad, b2p->cross);
        
        VP v0, v1;
        v0 = vquad[0]; v1 = vquad[1];

        P pr = BondPair_crossing_force(b2p, v0, v1);

        v0->vel = Vector2d_add(v0->vel, *((Vec2DP) pr.fst));
        v1->vel = Vector2d_add(v1->vel, *((Vec2DP) pr.snd));
        
        free(pr.fst);
        free(pr.snd);
                
        b2p = b2p->next;
    }
}

/* Public *******************************************************************/

void Force_global(const GP gp)
{
    fourth_order(gp);
}

void Force_local(const GP gp)
{
    first_order(gp);
    second_order(gp);
    third_order(gp);
    fourth_order(gp);
}

/* Test facade *************************************************************/

void (*test_first_order_force)(const GP gp) = first_order;
void (*test_second_order_force)(const GP gp) = second_order;
void (*test_second_order_attraction_force)(const GP gp) = second_order_attraction;
void (*test_second_order_repulsion_force)(const GP gp) = second_order_repulsion;
void (*test_third_order_force)(const GP gp) = third_order;
void (*test_fourth_order_force)(const GP gp) = fourth_order;

