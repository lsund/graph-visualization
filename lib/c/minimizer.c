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

    float (*objective)(Gptr graph);
    void (*gradient)(Gptr graph);
    objective = func; gradient = dfunc;
    
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
    
    frprmn(graph, FTOL, iter, fret, objective, gradient);
    
    free_graph(graph);

    free(fret); free(iter);
    
    return 0;
}

