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
    Vector zv = Vector_zero();
    Vector pos1 = Vector_initialize(500, 500);
    Vector pos2 = Vector_initialize(550, 500);
    Vector pos3 = Vector_initialize(550, 550);
    Vector pos4 = Vector_initialize(800, 800);
    VertexPointer v = Vertex_create(0, pos1, zv, zv, zv, 1, 1, 'r', 4);
    VertexPointer v1 = Vertex_create(1, pos2, zv, zv, zv, 1, 1, 'r', 4);
    VertexPointer v2 = Vertex_create(2, pos3, zv, zv, zv, 1, 1, 'r', 4);
    VertexPointer v3 = Vertex_create(3, pos4, zv, zv, zv, 1, 1, 'r', 4);
    msg("Checking vertex box...");
    mu_assert("tl should be 450, 450", 
            Util_about(v->tl.x, 450) && Util_about(v->tl.y, 450));
    mu_assert("br should be 550, 550", 
            Util_about(v->br.x, 550) && Util_about(v->br.y, 550));
    msgpass();

    msg("Checking repulsion area...");
    mu_assert("{v, v} should completely overlap", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v)), 
                2 *powf(101 * 101, 2))); 
    mu_assert("{v, v1}  should overlap half", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v1)), 
                2 * powf(101 * 101 / 2, 2)));
    
    mu_assert("{v, v2} should overlap 25 %", 
            Util_about(VertexPair_repulsion_energy(Pair_initialize(v, v2)), 
                2 * powf(102 * 102 / 4, 2))); 
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


    return 0;

}

