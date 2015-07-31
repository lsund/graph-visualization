/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 18-07-2015:

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "../lib/c/util.h"
#include "../lib/c/graph.h"
#include "../lib/c/energy.h"
#include "../lib/c/force.h"
#include "../lib/c/conjugate_gradient.h"
#include "minunit.h"
#include "test.h"

char *test_objective() 
{
    GP g = Graph_create( "data/test/4.json");

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

    g = Graph_create("data/test/4-2.json");

    Graph_create_crosses(g);

    VP vi, vj, vk, vl;
    B2P cur = g->crosses;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VP vquad[4] = { vi, vj, vk, vl };

    VS_sort(vquad, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("first", vquad[0]->id == 0);
    mu_assert("second", vquad[1]->id == 1);
    msgpass();
    
    BondPairs_free(g->crosses);
    g->crosses = NULL;
    Graph_free(g);

    g = Graph_create("data/test/4-3.json");

    Graph_create_crosses(g);

    cur = g->crosses;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VP vquad2[4] = { vi, vj, vk, vl };

    VS_sort(vquad2, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("first", vquad2[1]->id == 2);
    mu_assert("second", vquad2[0]->id == 3);
    msgpass();

    BondPairs_free(g->crosses);
    g->crosses = NULL;

    Graph_free(g);

    g = Graph_create("data/test/4-4.json");

    Graph_create_crosses(g);

    cur = g->crosses;
    vi = cur->fst->fst; vj = cur->fst->snd; 
    vk = cur->snd->fst; vl = cur->snd->snd;
    
    VP vquad3[4] = { vi, vj, vk, vl };

    VS_sort(vquad3, cur->cross);

    msg("checking closest two vertices to intersection...");
    mu_assert("second", vquad3[0]->id == 3);
    mu_assert("first", vquad3[1]->id == 2);
    msgpass();

    BondPairs_free(g->crosses);
    g->crosses = NULL;

    Graph_free(g);
    return 0;
}

