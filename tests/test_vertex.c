/*****************************************************************************

* File Name: test_vertex.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include "../lib/c/util.h"
#include "../lib/c/graph.h"
#include "../lib/c/funcs.h"
#include "../lib/c/conjugate_gradient.h"
#include "../lib/c/constants.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "test.h"
#include "minunit.h"

char *test_vertex() 
{
    Vector2d zv = mk_vector2d(0, 0);
    Vector2d pos1 = mk_vector2d(500, 500);
    Vector2d pos2 = mk_vector2d(600, 500);
    Vector2d pos3 = mk_vector2d(600, 600);
    Vector2d pos4 = mk_vector2d(800, 800);
    Vptr v = mk_vertex(0, pos1, zv, zv, zv, 1, 1, 'r');
    Vptr v1 = mk_vertex(1, pos2, zv, zv, zv, 1, 1, 'r');
    Vptr v2 = mk_vertex(2, pos3, zv, zv, zv, 1, 1, 'r');
    Vptr v3 = mk_vertex(3, pos4, zv, zv, zv, 1, 1, 'r');
    msg("Checking vertex box...");
    mu_assert("tl should be 400, 400", 
            about(v->tl.x, 400) && about(v->tl.y, 400));
    mu_assert("br should be 600, 600", 
            about(v->br.x, 600) && about(v->br.y, 600));
    msgpass();

    msg("Checking intersection area...");
    mu_assert("should completely overlap", 
            about(intersection_area(v, v), 201 * 201)); 

    mu_assert("should overlap half", 
            about(intersection_area(v, v1), 201 * 201 / 2)); 

    mu_assert("should overlap 25 %", 
            about(intersection_area(v, v2), 201 * 201 / 4)); 
    msgpass();

    mu_assert("should not overlap", 
           about(intersection_area(v, v3), 0));
    
    msg("Checking intersection force...");

    mu_assert("should have negative x-component", 
           intersection_gradient(v, v1).x < 0);
    mu_assert("should have zero y-component", 
           about(intersection_gradient(v, v1).y, 0));

    mu_assert("should have negative x-component", 
           intersection_gradient(v, v2).x < 0);
    mu_assert("should have negative y-component", 
           intersection_gradient(v, v2).y < 0);

    mu_assert("should have zero x-component", 
           about(intersection_gradient(v, v3).x, 0));
    mu_assert("should have zero y-component", 
           about(intersection_gradient(v, v3).y, 0));

    msgpass();


    return 0;

}

