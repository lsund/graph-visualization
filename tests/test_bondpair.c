/*****************************************************************************

* File Name: test_bondpair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include "../lib/c/util.h"
#include "../lib/c/graph.h"
#include "../lib/c/energy.h"
#include "../lib/c/force.h"
#include "../lib/c/conjugate_gradient.h"
#include "../lib/c/constants.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "test.h"
#include "minunit.h"

char *test_bondpair() 
{
    Vec2D zv = Vector2d_initialize(0, 0);
    Vec2D pos0 = Vector2d_initialize(501, 700);
    Vec2D pos1 = Vector2d_initialize(600, 700);
    Vec2D pos2 = Vector2d_initialize(500, 900);
    Vec2D pos3 = Vector2d_initialize(600, 900);
    int nv = 4;
    VP v = Vertex_create(0, pos0, zv, zv, zv, 1, 1, 'r', nv);
    VP v1 = Vertex_create(1, pos1, zv, zv, zv, 1, 1, 'r', nv);
    VP v2 = Vertex_create(2, pos2, zv, zv, zv, 1, 1, 'r', nv);
    VP v3 = Vertex_create(3, pos3, zv, zv, zv, 1, 1, 'r', nv);
    
    BP b = bond_create(v, v3, 1);
    BP b2 = bond_create(v1, v2, 1);
     
    B2P bpr = BondPair_create(pair_initialize(b, b2), NULL);

    float x, y;
    BondPair_intersect(bpr, &x, &y);
    Vec2D cross = Vector2d_initialize(x, y);

    BondPair_set_cross(bpr, cross);
    
    msg("Checking so that cross bond of has been set correctly...");
    mu_assert("first", *(v->crs_bof + 0) == 0);
    mu_assert("first", *(v->crs_bof + 1) == 1);
    mu_assert("first", *(v->crs_bof + 2) == 1);
    mu_assert("first", *(v->crs_bof + 3) == 0);

    mu_assert("second", *(v1->crs_bof + 0) == 1);
    mu_assert("second", *(v1->crs_bof + 1) == 0);
    mu_assert("second", *(v1->crs_bof + 2) == 0);
    mu_assert("second", *(v1->crs_bof + 3) == 1);

    mu_assert("third", *(v2->crs_bof + 0) == 1);
    mu_assert("third", *(v2->crs_bof + 1) == 0);
    mu_assert("third", *(v2->crs_bof + 2) == 0);
    mu_assert("third", *(v2->crs_bof + 3) == 1);

    mu_assert("fourth", *(v3->crs_bof + 0) == 0);
    mu_assert("fourth", *(v3->crs_bof + 1) == 1);
    mu_assert("fourth", *(v3->crs_bof + 2) == 1);
    mu_assert("fourth", *(v3->crs_bof + 3) == 0);
    msgpass();

    return 0;
}
