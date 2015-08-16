/*****************************************************************************

* File Name: test_Bond.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 29-07-2015

*****************************************************************************/

#include "test.h"

char *test_bond() 
{
    Vector pos1 = Vector_initialize(500, 500);
    Vector pos2 = Vector_initialize(600, 500);

    VertexPointer v = Vertex_create(0, pos1, 1, 1, 'r');
    VertexPointer v1 = Vertex_create(1, pos2, 1, 1, 'r');
    
    Bond_create(v, v1, 1);
    
    return 0;
}

