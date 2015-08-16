/*****************************************************************************

* File Name: global_minimizer.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 13-08-2015

*****************************************************************************/

#include "global_minimizer.h"
#include "local_minimizer.h"
#include "constants.h"
#include "util.h"
#include "graph.h"

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

/* Private *****************************************************************/

#define ERR_NO_NUM -1
#define ERR_NO_MEM -2

int myRandom (int size) {
    int i, n;
    static int numNums = 0;
    static int *numArr = NULL;

    // Initialize with a specific size.

    if (size >= 0) {
        if (numArr != NULL)
            free (numArr);
        if ((numArr = malloc (sizeof(int) * size)) == NULL)
            return ERR_NO_MEM;
        for (i = 0; i  < size; i++)
            numArr[i] = i;
        numNums = size;
    }

    // Error if no numbers left in pool.

    if (numNums == 0)
       return ERR_NO_NUM;

    // Get random number from pool and remove it (rnd in this
    //   case returns a number between 0 and numNums-1 inclusive).

    n = rand() % numNums;
    i = numArr[n];
    numArr[n] = numArr[numNums-1];
    numNums--;
    if (numNums == 0) {
        free (numArr);
        numArr = 0;
    }

    return i;
}

static VertexSet pick_subset_random(const VertexSet vs, const int n)
{
    int i, count;
    count = 0;
    i = myRandom (vs.n);
    VertexSet rtn;
    rtn = VertexSet_initialize(n);
    while (i >= 0) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        VertexSet_update_vertex(vs, i, v);
        i = myRandom (-1);
        if (count > n) {
            break;
        } else {
            count++;
        }
    }
    return rtn;
}

static VertexSet pick_subset(const VertexSet vs, const int n) 
{
    return pick_subset_random(vs, n);
}

Vector generate_move()
{
    double x, y;
    x = (((double) rand()) / RAND_MAX) * 2 - 1;
    y = (((double) rand()) / RAND_MAX) * 2 - 1;
    
    assert(x < 1 && x >= -1 && y < 1 && y >= -1); 

    double a = 0.01;
    
    Vector rtn;
    rtn = Vector_scalar_mult(Vector_initialize(x, y), a);
    
    return rtn;    
}

static void mutate(const GraphPointer graph)
{
    assert(graph);
    assert(graph->vs.n);
    
    VertexSet vs;
    vs = graph->vs; 

    int n;
    n = vs.n / 5; 

    VertexSet subset;
    subset = pick_subset(vs, n);
    
    int i; 
    for (i = 0; i < n; i++) {
        Vector new_pos;
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        new_pos = Vector_add(v->pos, generate_move());
        Vertex_set_position(v, new_pos);
    }
}

/* Public ******************************************************************/

void GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer),
        void (*g_fun)(GraphPointer)
    )
{
    assert(graph);
    double e0 = graph->energy; 
    srand(time(NULL));
    int i; 

    for (i = 0; i < G_ITMAX; i++) {
        e_fun(graph);

        double old_e; 
        old_e = graph->energy;
        
        VertexSet vs = graph->vs;
        VectorPointer ps_0;
        ps_0 = VertexSet_positions(vs);
    
        mutate(graph);
        LocalMinimizer_run(graph, e_fun, g_fun, FTOL);

        e_fun(graph);

        double new_e; 
        new_e = graph->energy;

        double energy_ratio;
        energy_ratio = new_e / old_e;

        assert(!(energy_ratio != energy_ratio));
        double temperature, r, c;
        temperature = Util_is_zero(TEMPERATURE) ? MIN_DIST : TEMPERATURE;
        r = (((double) rand()) / RAND_MAX);
        c = exp(-(new_e - old_e) / temperature);
        if (new_e > old_e && r > c) {
            int j;
            for (j = 0; j < vs.n; j++) {
                VertexPointer v;
                v = VertexSet_get_vertex(vs, j);
                Vertex_set_position(v, *(ps_0 + j));
            }
        }
        free(ps_0);
    }
    double e1 = graph->energy;
    double rat = e1 / e0;
    printf("%f%% energy improvement\n", (1 - rat) * 100);
}

