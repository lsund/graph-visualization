/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 18-07-2015:

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "test.h"

char *test_objective() 
{
    GraphPointer g = Graph_create( "data/test/4.json", Energy_local, Gradient_local);

    float f1, f2, f3;

    f1 = test_first_order_energy(g);
    f2 = test_second_order_energy(g);
    f3 = test_third_order_energy(g);

    /////// 1d attraction /////////////////////////////////////////////////////

    f1 = test_first_order_energy(g);

    
    msg("Objective: Central energy greater than 0...");
    mu_assert("Central energy should be greater or equal to 0", f1 >= 0);
    msgpass();
    
    /////// 2d attraction /////////////////////////////////////////////////////

    f2 = test_second_order_energy(g);

    msg("Objective: Attraction energy...");
    mu_assert("Repulsion energy should be greater or equal to 0", f2 >= 0);
    msgpass();

    Graph_free(g);
    
    /////// Angular ///////////////////////////////////////////////////////////

    /*g =Graph_create_file( "data/test/3-1.json");*/
    msg("Objective: Angular energy...");
    mu_assert("Repulsion energy should be greater or equal to 0", f3 >= 0);
    msgpass();
    /*free_graph(g);*/
    
    /////// Crosses ///////////////////////////////////////////////////////////

    g = Graph_create("data/test/4-2.json", Energy_local, Gradient_local);

    Graph_detect_crosses(g);

    VertexPointer vi, vj, vk, vl;
    BondPairPointer cur = g->crs;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VertexPointer vquad[4] = { vi, vj, vk, vl };

    VertexSet_sort(vquad, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("first", vquad[0]->id == 0);
    mu_assert("second", vquad[1]->id == 1);
    msgpass();
    
    BondPairs_free(g->crs);
    g->crs = NULL;
    Graph_free(g);

    g = Graph_create("data/test/4-3.json", Energy_local, Gradient_local);

    Graph_detect_crosses(g);

    cur = g->crs;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VertexPointer vquad2[4] = { vi, vj, vk, vl };

    VertexSet_sort(vquad2, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("first", vquad2[1]->id == 2);
    mu_assert("second", vquad2[0]->id == 3);
    msgpass();

    BondPairs_free(g->crs);
    g->crs = NULL;

    Graph_free(g);

    g = Graph_create("data/test/4-4.json", Energy_local, Gradient_local);

    Graph_detect_crosses(g);

    cur = g->crs;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VertexPointer vquad3[4] = { vi, vj, vk, vl };

    VertexSet_sort(vquad3, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("second", vquad3[0]->id == 3);
    mu_assert("first", vquad3[1]->id == 2);
    msgpass();

    BondPairs_free(g->crs);
    g->crs = NULL;

    Graph_free(g);
    return 0;
}

