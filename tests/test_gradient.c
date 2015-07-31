/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "../lib/c/graph.h"
#include "../lib/c/util.h"
#include "../lib/c/energy.h"
#include "../lib/c/force.h"
#include "../lib/c/conjugate_gradient.h"
#include "../lib/c/constants.h"
#include "minunit.h"
#include "test.h"

char *test_gradient() 
{
    GP graph;
    graph = Graph_create( "data/test/4.json");

    (*test_first_order_force)(graph);

    return 0;
}


