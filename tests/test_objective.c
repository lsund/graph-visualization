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
    GraphPointer g = Graph_create( "data/test/4.json");

    double f1, f2;

    f1 = test_first_order_energy(g->vs);
    f2 = test_second_order_energy(g);

    /////// 1d attraction /////////////////////////////////////////////////////
    
    msg("Objective: Central energy greater than 0...");
    mu_assert("Central energy should be greater or equal to 0", f1 >= 0);
    msgpass();
    
    /////// 2d attraction /////////////////////////////////////////////////////

    msg("Objective: Attraction energy...");
    mu_assert("Repulsion energy should be greater or equal to 0", f2 >= 0);
    msgpass();

    Graph_free(g);
    
    /////// Crosses ///////////////////////////////////////////////////////////

    return 0;
}

