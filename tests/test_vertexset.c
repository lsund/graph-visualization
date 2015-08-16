/*****************************************************************************

* File Name: test_vertexset.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 16-08-2015

*****************************************************************************/


#include <stdio.h>
#include <stdlib.h>
#include "test.h"
#include "minunit.h"

char *test_vertexset() 
{
    GraphPointer g = Graph_create("data/test/52.json");    
    VertexSet vs = g->vs;
    
    VertexSet copy = VertexSet_copy(vs); 

    mu_assert("vs not equal copy", vs.n == copy.n);
    mu_assert("vs set should not have the same address as copy set", vs.set != copy.set);

    for (int i = 0; i < vs.n; i++) {
        VertexPointer v7 = VertexSet_get_vertex(vs, i);
        VertexPointer v8 = VertexSet_get_vertex(copy, i);
        mu_assert("v7 address should not equal v8", v7 != v8);
        mu_assert("pos: v7 not equal to v8", Vector_equal(v7->pos, v8->pos));
        mu_assert("gradient: v7 not equal to v8", Vector_equal(v7->gradient, v8->gradient));
        mu_assert("pos0: v7 not equal to v8", Vector_equal(v7->pos0, v8->pos0));
        mu_assert("grad0: v7 not equal to v8", Vector_equal(v7->grad0, v8->grad0));
        mu_assert("tl: v7 not equal to v8", Vector_equal(v7->tl, v8->tl));
        mu_assert("br: v7 not equal to v8", Vector_equal(v7->br, v8->br));
        mu_assert("g: v7 not equal to v8", Vector_equal(v7->g, v8->g));
        mu_assert("h: v7 not equal to v8", Vector_equal(v7->h, v8->h));
        mu_assert("id || type: v7 not equal to v8", v7->id == v8->id && v7->type == v8->type);
        mu_assert("mass || next: v7 not equal to v8", 
                v7->mass == v8->mass && v7->next == v8->next);
        mu_assert("energy: v7 not equal to v8", Util_equal(v7->energy, v8->energy));
    }
    
    Graph_free(g);
    VertexSet_free(copy);

    return 0;
}
