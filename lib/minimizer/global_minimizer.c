/*****************************************************************************

* File Name: global_minimizer.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 13-08-2015

*****************************************************************************/

#include "constants.h"
#include "util.h"
#include "graph.h"

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

/* Private *****************************************************************/

static Vector generate_move()
{
    double a, b, c;
    c = sqrt(0.2);
    a = 1 / c * sqrt(2 * M_PI); 
    b = 0; 
    
    double x, y;
    x = (((double) rand()) / RAND_MAX) * 2 - 1;
    y = (((double) rand()) / RAND_MAX) * 2 - 1;
    
    assert(x < 1 && x >= 0 && y < 1 && y >= 0); 
    printf("%f %f\n", x, y);
     
    double movex, movey;
    movex = a * exp(pow(-(x - b), 2) / (2 * pow(c, 2)));
    movey = a * exp(pow(-(y - b), 2) / (2 * pow(c, 2)));
    
    printf("%f %f\n", movex, movey); 
    assert(movex < 1 && movey < 1 && movex >= 0 && movey >= 0);

    return Vector_initialize(movex, movey);
}

static VertexPointer pick_candidate_random(const VertexSet vs)
{
    int rvi;
    rvi = ((double) (rand()) / RAND_MAX) * vs.n;
    assert(rvi <= vs.n);
    return VertexSet_get_vertex(vs, rvi);
}

static VertexPointer pick_candidate_high_energy(const VertexSet vs)
{
    VertexPointer chosen = *vs.set;
    double max_energy = 0.0;
    int i;
    for (i = 1; i < vs.n; i++) {
        VertexPointer current;
        current = VertexSet_get_vertex(vs, i);
        if (current->energy > max_energy) {
            chosen = current;
           max_energy = current->energy; 
        }
    }
    return chosen;
}

static Vertex mutate(const GraphPointer graph)
{
    assert(graph);
    assert(graph->vs.n);
    
    VertexSet vs = graph->vs;
    
    VertexPointer chosen = pick_candidate_high_energy(vs); 

    Vertex old_v;
    old_v = Vertex_copy(*chosen);

    Vertex_move(chosen, generate_move());

    return old_v;
}

/* Public ******************************************************************/

void GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer)
    )
{
    assert(graph);
    
    srand(time(NULL));

    int i; 
    for (i = 0; i < G_ITMAX; i++) {
        e_fun(graph);

        double old_e; 
        old_e = graph->energy;

        Vertex old_v;
        old_v = mutate(graph);

        e_fun(graph);
        double new_e; 
        new_e = graph->energy;
        printf("%f %f\n", old_e, new_e);
        if (old_e < new_e) {
            VertexPointer new_v;
            new_v  = VertexSet_get_vertex(graph->vs, old_v.id);
            *new_v = old_v;
        }
    }
}

