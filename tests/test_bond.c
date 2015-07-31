/*****************************************************************************

* File Name: test_bond.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 29-07-2015

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

char *test_bond() 
{
    Vec2D zv = Vector2d_initialize(0, 0);
    Vec2D pos1 = Vector2d_initialize(500, 500);
    Vec2D pos2 = Vector2d_initialize(600, 500);
    int nv = 2;
    VP v = Vertex_create(0, pos1, zv, zv, zv, 1, 1, 'r', nv);
    VP v1 = Vertex_create(1, pos2, zv, zv, zv, 1, 1, 'r', nv);
    
    bond_create(v, v1, 1);
    
    return 0;
}

