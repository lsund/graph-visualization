/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include "test.h"

char *test_gradient() 
{
    GraphPointer graph;
    graph = Graph_create( "data/test/4.json", Energy_local, Gradient_local);

    (*test_first_order_gradient)(graph);

    return 0;
}


