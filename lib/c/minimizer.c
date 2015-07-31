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

#include "graph.h"
#include "process_input.h"
#include "placement.h"
#include "util.h"
#include "constants.h"
#include "frprmn.h"
#include "energy.h"
#include "force.h"

int minimize (const char *fname) 
{
    
    float *fret;
    int *iter;


    GP gp;
    gp = Graph_create(fname);
    gp->calc_e = Energy_local;
    gp->calc_f = Force_local;

    set_spiral(gp->vps, gp->nv); 

    Graph_reinitialize(gp);

    iter = calloc(1, sizeof(int));
    fret = calloc(1, sizeof(float));
    if (iter == NULL || fret == NULL)
    {
        rt_error("Error when allocating memory: minimize()");
    }
    
    frprmn(gp, FTOL, iter, fret);

    printf("Done, local optimization\n");
    
    /*frprmn(g, FTOL, iter, fret, global_objective, global_gradient);*/

    /*printf("Done, global optimization\n");*/
    
    Graph_free(gp);

    free(fret); free(iter);
    
    return 0;
}

