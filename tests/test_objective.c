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
#include "../lib/c/funcs.h"
#include "../lib/c/conjugate_gradient.h"
#include "minunit.h"
#include "test.h"

char *test_objective() 
{
    Gptr graph;
    graph = malloc(sizeof(G));
    create_graph(graph, "data/test/4.json");

    float f1, f2, f3;

    f1 = first_order(graph);
    f2 = second_order(graph);
    f3 = third_order(graph);
    /*printf("%f %f %f\n", f1, f2, f3);*/

    /////// 1d attraction /////////////////////////////////////////////////////

    f1 = first_order(graph);

    
    msg("Objective: Central energy greater than 0...");
    mu_assert("Central energy should be greater or equal to 0", f1 >= 0);
    msgpass();
    
    /////// 2d attraction /////////////////////////////////////////////////////

    f2 = second_order(graph);

    msg("Objective: Attraction energy...");
    mu_assert("Repulsion energy should be greater or equal to 0", f2 >= 0);
    msgpass();

    free_graph(graph);
    
    /////// Angular ///////////////////////////////////////////////////////////

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/3.json");*/
    
    /*free_graph(graph);*/

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/3-1.json");*/
    msg("Objective: Angular energy...");
    mu_assert("Repulsion energy should be greater or equal to 0", f3 >= 0);
    msgpass();
    /*free_graph(graph);*/

    return 0;
}

