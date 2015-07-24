/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 * Description: Defines an energy function and its derivatives aswell as
 * working as minimize() which is the exported function by emscripten.

 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <unistd.h>

#include "util.h"
#include "constants.h"
#include "inits.h"
#include "funcs.h"
#include "conjugate_gradient.h"

int minimize (const char *fname) 
{
    
    float *fret;
    int *iter;

    float (*local_objective)(const Gptr graph);
    void (*local_gradient)(const Gptr graph);
    float (*global_objective)(const Gptr graph);
    void (*global_gradient)(const Gptr graph);

    local_objective = flocal; 
    local_gradient = dflocal; 
    global_objective = fglobal; 
    global_gradient = dfglobal; 
    Gptr graph;
    graph = malloc(sizeof(G));
    create_graph(fname, graph);

    set_spiral(graph->vs, graph->nv);

    iter = calloc(1, sizeof(int));
    fret = calloc(1, sizeof(float));
    if (iter == NULL || fret == NULL)
    {
        rt_error("Error when allocating memory: minimize()");
    }
    
    frprmn(graph, FTOL, iter, fret, local_objective, local_gradient);

    printf("Done, local optimization\n");
    
    frprmn(graph, FTOL, iter, fret, global_objective, global_gradient);

    printf("Done, global optimization\n");
    
    free_graph(graph);

    free(fret); free(iter);
    
    return 0;
}

