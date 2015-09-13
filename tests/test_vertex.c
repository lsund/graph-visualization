/*****************************************************************************

* File Name: test_vertex.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include "test.h"
#include "minunit.h"

char *test_vertex() 
{
    Vector pos1 = Vector_initialize(0.500, 0.500);
    Vector pos2 = Vector_initialize(0.550, 0.500);
    Vector pos3 = Vector_initialize(0.550, 0.550);
    Vector pos4 = Vector_initialize(0.800, 0.800);
    VertexPointer v = Vertex_create(0, pos1, 0, 'r', 0);
    VertexPointer v1 = Vertex_create(1, pos2, 0, 'r', 0);
    VertexPointer v2 = Vertex_create(2, pos3, 0, 'r', 0);
    VertexPointer v3 = Vertex_create(3, pos4, 0, 'r', 0);
    msg("Checking vertex box...");
    mu_assert("tl should be 0.450, 0.450", 
            Util_about(v->tl.x, 0.450) && Util_about(v->tl.y, 0.450));
    mu_assert("br should be 0.550, 0.550", 
            Util_about(v->br.x, 0.550) && Util_about(v->br.y, 0.550));
    msgpass();

    msg("Checking repulsion area...");
    mu_assert("{v, v} should completely overlap", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v)), 
                2 *pow(0.1 * 0.1, 2))); 
    mu_assert("{v, v1}  should overlap half", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v1)), 
                2 * pow(0.1 * 0.1 / 2, 2)));
    
    mu_assert("{v, v2} should overlap 25 %", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v2)), 
                2 * pow(0.1 * 0.1 / 4, 2))); 
    msgpass();

    mu_assert("{v, v3} should not overlap", 
           Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v3)), 0));
    
    msg("Checking Vertex_repulsion gradient...");
    
    mu_assert("should have negative x-component", 
           VertexPair_repulsion_gradient(Pair_initialize(v, v1)).x < 0);
    
    mu_assert("should have negative x-component", 
           VertexPair_repulsion_gradient(Pair_initialize(v, v2)).x < 0);
    mu_assert("should have negative y-component", 
           VertexPair_repulsion_gradient(Pair_initialize(v, v2)).y < 0);

    mu_assert("should have zero x-component", 
           Util_about(VertexPair_repulsion_gradient(Pair_initialize(v, v3)).x, 0));
    mu_assert("should have zero y-component", 
           Util_about(VertexPair_repulsion_gradient(Pair_initialize(v, v3)).y, 0));

    msgpass();
    
    Vector pos = Vector_initialize(30, 30); 
    Vector g = Vector_initialize(123, 123);
    Vector h = Vector_initialize(23, 23);
    Vector pos0 = Vector_initialize(1234, 234);
    Vector grad0 = Vector_initialize(0, 43);
    Vector gradient = Vector_initialize(1, 41);
    Vertex v4 = Vertex_initialize(77, pos, 0, 'r', 0);
    Vertex v5 = Vertex_initialize(66, pos, 0, 'r', 0);
    v4.next = &v5;
    v4.g = g;
    v4.h = h;
    v4.pos0 = pos0;
    v4.grad0 = grad0;
    v4.gradient = gradient;
    double e = 234;
    v4.energy = e;

    Vertex v6 = Vertex_copy(v4);
    
    mu_assert("v4 address should not equal v6", &v4 != &v6);
    mu_assert("pos: v4 not equal to v6", Vector_equal(v4.pos, v6.pos));
    mu_assert("gradient: v4 not equal to v6", Vector_equal(v4.gradient, v6.gradient));
    mu_assert("pos0: v4 not equal to v6", Vector_equal(v4.pos0, v6.pos0));
    mu_assert("grad0: v4 not equal to v6", Vector_equal(v4.grad0, v6.grad0));
    mu_assert("tl: v4 not equal to v6", Vector_equal(v4.tl, v6.tl));
    mu_assert("br: v4 not equal to v6", Vector_equal(v4.br, v6.br));
    mu_assert("g: v4 not equal to v6", Vector_equal(v4.g, v6.g));
    mu_assert("h: v4 not equal to v6", Vector_equal(v4.h, v6.h));
    mu_assert("id || type: v4 not equal to v6", v4.id == v6.id && v4.type == v6.type);
    mu_assert("mass || next: v4 not equal to v6", v4.mass == v6.mass && v4.next == v6.next);
    mu_assert("energy: v4 not equal to v6", Util_equal(v4.energy, v6.energy));

    VertexPointer v7 = Vertex_create(77, pos, 0, 'r', 0);
    v7->next = &v5;
    v7->g = g;
    v7->h = h;
    v7->pos0 = pos0;
    v7->grad0 = grad0;
    v7->gradient = gradient;
    v7->energy = e;

    VertexPointer v8 = Vertex_copy_pointer(v7);

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
    mu_assert("mass || next: v7 not equal to v8", v7->mass == v8->mass && v7->next == v8->next);
    mu_assert("energy: v7 not equal to v8", Util_equal(v7->energy, v8->energy));
    
    
    Vertex_free(v7);
    Vertex_free(v8);

    return 0;

}

