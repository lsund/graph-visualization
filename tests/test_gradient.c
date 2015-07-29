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
#include "../lib/c/funcs.h"
#include "../lib/c/conjugate_gradient.h"
#include "../lib/c/constants.h"
#include "minunit.h"
#include "test.h"

char *test_gradient() 
{
    Gptr graph;
    graph = malloc(sizeof(G));
    create_graph(graph, "data/test/4.json");

    dfunc1(graph);
    
/*    msg("Gradient: Center attrction:\n");*/
    /*msg("First...");*/
    /*mu_assert("first velocity towards center", */
            /*about((*(graph->vs + 0))->vel.x, 800.0) && */
            /*about((*(graph->vs + 0))->vel.y, 400.0));*/
    /*msgpass();*/
    /*msg("Second...");*/
    /*mu_assert("second velocity towards center", */
            /*about((*(graph->vs + 1))->vel.x, 600.0) && */
            /*about((*(graph->vs + 1))->vel.y, 400.0));*/
    /*msgpass();*/
    /*msg("Third...");*/
    /*mu_assert("third velocity towards center", */
            /*about((*(graph->vs + 2))->vel.x, 800.0) && */
            /*about((*(graph->vs + 2))->vel.y, -200.0));*/
    /*msgpass();*/
    /*msg("Fourth...");*/
    /*mu_assert("fourth velocity towards center", */
            /*about((*(graph->vs + 3))->vel.x, 600.0) && */
            /*about((*(graph->vs + 3))->vel.y, -200.0));*/
    /*msgpass();*/
    /*free_graph(graph);*/

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/4.json");*/
    
    /*float vel0x, vel1x, vel2x, vel3x;*/
    /*float vel0y, vel1y, vel2y, vel3y;*/

    /*vel0x = vel1x = vel2x = vel3x = 0.0;*/
    /*vel0y = vel1y = vel2y = vel3y = 0.0;*/

    /*dfunc2attr(graph);*/
    
    /*vel0x -= -168.3;*/
    /*vel0y -= -505.1;*/
    /*vel3x += -168.3;*/
    /*vel3y += -505.1;*/

    /*vel0y -= -500;*/
    /*vel2y += -500;*/

    /*vel2x -= -100;*/
    /*vel3x += -100;*/

    /*vel1x -= 168.3;*/
    /*vel1y -= -505.1;*/
    /*vel2x += 168.3;*/
    /*vel2y += -505.1;*/

    /*vel1y -= -500;*/
    /*vel3y += -500;*/
    
    /*msg("Gradient: Attraction between bonds:\n");    */
    /*msg("First...");*/
    /*mu_assert("First attraction vel...", */
            /*about((*(graph->vs + 0))->vel.x, vel0x) && */
            /*about((*(graph->vs + 0))->vel.y, vel0y));*/
    /*msgpass();*/
    /*msg("Second...");*/
    /*mu_assert("Second attraction vel...", */
            /*about((*(graph->vs + 1))->vel.x, vel1x) && */
            /*about((*(graph->vs + 1))->vel.y, vel1y));*/
    /*msgpass();*/
    /*msg("third...");*/
    /*mu_assert("third attraction vel...", */
            /*about((*(graph->vs + 2))->vel.x, vel2x) && */
            /*about((*(graph->vs + 2))->vel.y, vel2y));*/
    /*msgpass();*/
    /*msg("forth...");*/
    /*mu_assert("forth attraction vel...", */
            /*about((*(graph->vs + 3))->vel.x, vel3x) && */
            /*about((*(graph->vs + 3))->vel.y, vel3y));*/
    /*msgpass();*/
    /*free_graph(graph);*/

    /*msg("Gradient Angular forces:\n");    */

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/3.json");*/
    /*dfunc3(graph);*/
    /*msg("first X velocity should be negative...");*/
    /*mu_assert("first X velocity should be negative", */
            /*(*(graph->vs + 0))->vel.x < 0);*/
    /*msgpass();*/
    /*msg("first Y velocity should be zero...");*/
    /*mu_assert("first Y velocity should be zero", */
            /*equal((*(graph->vs + 0))->vel.y, 0));*/
    /*msgpass();*/
    /*msg("second X velocity should be zero...");*/
    /*mu_assert("second X velocity should be zero", */
            /*equal((*(graph->vs + 1))->vel.x, 0));*/
    /*msgpass();*/
    /*msg("first Y velocity should be zero...");*/
    /*mu_assert("first Y velocity should be zero", */
            /*equal((*(graph->vs + 1))->vel.y, 0));*/
    /*msgpass();*/
    /*msg("third X velocity should be zero...");*/
    /*mu_assert("third X velocity should be zero", */
            /*equal((*(graph->vs + 2))->vel.x, 0));*/
    /*msgpass();*/
    /*msg("third Y velocity should be positive...");*/
    /*mu_assert("third Y velocity should be positive", */
            /*(*(graph->vs + 2))->vel.y > 0);*/
    /*msgpass();*/
    /*free_graph(graph);*/

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/3-1.json");*/
    /*dfunc3(graph);*/
    /*mu_assert("first X velocity should be zero", */
            /*equal((*(graph->vs + 0))->vel.x, 0));*/
    /*mu_assert("first Y velocity should be zero", */
            /*equal((*(graph->vs + 0))->vel.y, 0));*/
    /*mu_assert("second X velocity should less than zero", */
            /*((*(graph->vs + 1))->vel.x < 0));*/
    /*mu_assert("first Y velocity should be less than zero", */
            /*((*(graph->vs + 1))->vel.y < 0));*/
    /*mu_assert("third X velocity should be zero", */
            /*equal((*(graph->vs + 2))->vel.x, 0));*/
    /*mu_assert("third Y velocity should be positive", */
            /*(*(graph->vs + 2))->vel.y > 0);*/
    /*free_graph(graph);*/

    /*graph = malloc(sizeof(G));*/
    /*create_graph(graph, "data/test/3-2.json");*/
    /*dfunc3(graph);*/
    /*mu_assert("first X velocity should be zero", */
            /*equal((*(graph->vs + 0))->vel.x, 0));*/
    /*mu_assert("first Y velocity should be zero", */
            /*equal((*(graph->vs + 0))->vel.y, 0));*/
    /*mu_assert("second X velocity should be zero", */
            /*equal((*(graph->vs + 1))->vel.x, 0));*/
    /*mu_assert("second Y velocity should be less than zero", */
            /*((*(graph->vs + 1))->vel.y < 0));*/
    /*mu_assert("third X velocity should be negative", */
            /*((*(graph->vs + 2))->vel.x < 0));*/
    /*mu_assert("third Y velocity should be positive", */
            /*(*(graph->vs + 2))->vel.y > 0);*/
    /*free_graph(graph);*/

    return 0;
}


