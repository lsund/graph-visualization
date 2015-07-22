/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 18-07-2015:

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "../lib/c/util.h"
#include "../lib/c/inits.h"
#include "../lib/c/funcs.h"
#include "../lib/c/conjugate_gradient.h"
#include "minunit.h"
#include "test.h"

char *test_objective() 
{
    Gptr graph;
    graph = malloc(sizeof(G));
    create_graph("data/test/4.json", graph);

    float f1, f2, f3;
    float p1, p2, p3, p4, p5;

    f1 = func1(graph);
    f2 = func2(graph);
    f3 = func3(graph);
    printf("%f %f %f\n", f1, f2, f3);

    /////// 1d attraction /////////////////////////////////////////////////////

    f1 = func1(graph);

    p1 = 200000;
    p2 = 130000;
    p3 = 170000;
    p4 = 100000;

    msg("Objective: Central energy greater than 0...");
    mu_assert("Central energy should be greater or equal to 0", f1 >= 0);
    msgpass();
    msg("Central energy for 4 vs...");
    mu_assert("energy should be equal to the sum of the energy of each member",
            about(f1, p1 + p2 + p3 + p4));
    msgpass();
    
    /////// 2d attraction /////////////////////////////////////////////////////

    f2 = func2(graph);

    p1 = 70877;
    p2 = 62600; 
    p3 = 2500;
    p4 = 70877;
    p5 = 62600; 
    
    msg("Objective: Attraction energy...");
    mu_assert("energy should be equal to the sum of the energy of each member",
            about(f2, p1 + p2 + p3 + p4 + p5));
    msgpass();

    free_graph(graph);
    
    /////// Angular ///////////////////////////////////////////////////////////

    graph = malloc(sizeof(G));
    create_graph("data/test/3.json", graph);
    msg("Objective: Angular energy...");
    
    mu_assert("energy should be equal to the sum of the energy angle",
            about(func3(graph), 2.467));
    msgpass();
    free_graph(graph);

    graph = malloc(sizeof(G));
    create_graph("data/test/3-1.json", graph);
    msgpass();
    free_graph(graph);

    return 0;
}

