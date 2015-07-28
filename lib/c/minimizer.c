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

    void (*local_objective)(const Gptr g);
    void (*local_gradient)(const Gptr g);
    void (*global_objective)(const Gptr g);
    void (*global_gradient)(const Gptr g);

    local_objective = flocal; 
    local_gradient = dflocal; 
    global_objective = fglobal; 
    global_gradient = dfglobal; 
    Gptr g;
    g = (Gptr) calloc(1, sizeof(G));
    create_graph(fname, g);
    set_spiral(g->vs, g->nv); 

    int i;
    for (i = 0; i < g->nv; i++) {
        assign_zone(g, *(g->vs + i));
    }
    check_adjacent(g);

    iter = calloc(1, sizeof(int));
    fret = calloc(1, sizeof(float));
    if (iter == NULL || fret == NULL)
    {
        rt_error("Error when allocating memory: minimize()");
    }
    
    frprmn(g, FTOL, iter, fret, local_objective, local_gradient);

    printf("Done, local optimization\n");
    
    frprmn(g, FTOL, iter, fret, global_objective, global_gradient);

    printf("Done, global optimization\n");
    
    free_graph(g);

    free(fret); free(iter);
    
    return 0;
}

