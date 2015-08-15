/*****************************************************************************

* File Name: test_bondcross.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 03-08-2015

*****************************************************************************/

#include "test.h"

char *test_bondcross() 
{
    Vector pos0 = Vector_initialize(501, 700);
    Vector pos1 = Vector_initialize(600, 700);
    Vector pos2 = Vector_initialize(500, 900);
    Vector pos3 = Vector_initialize(600, 900);
    int nv = 4;
    VertexPointer v = Vertex_create(0, pos0, 1, 1, 'r', nv);
    VertexPointer v1 = Vertex_create(1, pos1, 1, 1, 'r', nv);
    VertexPointer v2 = Vertex_create(2, pos2, 1, 1, 'r', nv);
    VertexPointer v3 = Vertex_create(3, pos3, 1, 1, 'r', nv);
    
    BondPointer b = Bond_create(v, v3, 1);
    BondPointer b2 = Bond_create(v1, v2, 1);
     
    BondPair bpr = BondPair_initialize(Pair_initialize(b, b2));

    Vector cross;
    BondPair_intersect(bpr, &cross);

    BondCrossPointer bcrs = BondCross_create(bpr, cross);
    
    msg("Checking so that cross Bond of has been set correctly...");
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

    BondCrosses_free(bcrs);
    
    msg("Checking so that crs_bof was reset...");
    mu_assert("first", *(v->crs_bof + 0) == 0);
    mu_assert("first", *(v->crs_bof + 1) == 0);
    mu_assert("first", *(v->crs_bof + 2) == 0);
    mu_assert("first", *(v->crs_bof + 3) == 0);

    mu_assert("second", *(v1->crs_bof + 0) == 0);
    mu_assert("second", *(v1->crs_bof + 1) == 0);
    mu_assert("second", *(v1->crs_bof + 2) == 0);
    mu_assert("second", *(v1->crs_bof + 3) == 0);

    mu_assert("third", *(v2->crs_bof + 0) == 0);
    mu_assert("third", *(v2->crs_bof + 1) == 0);
    mu_assert("third", *(v2->crs_bof + 2) == 0);
    mu_assert("third", *(v2->crs_bof + 3) == 0);

    mu_assert("fourth", *(v3->crs_bof + 0) == 0);
    mu_assert("fourth", *(v3->crs_bof + 1) == 0);
    mu_assert("fourth", *(v3->crs_bof + 2) == 0);
    mu_assert("fourth", *(v3->crs_bof + 3) == 0);
    msgpass();

    return 0;
}
