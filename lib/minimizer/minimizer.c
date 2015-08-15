/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 
 * Description: Defines an object able to 'minimize' the energy of the graph
 * G(V, B) created by the set of Vertices V and Bonds B defined in JSON format.
 
 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <unistd.h>

#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "energy.h"
#include "gradient.h"
#include "local_minimizer.h"
#include "global_minimizer.h"


void Minimizer_run(const char *fname) 
{
    assert(fname);

    if (access(fname, R_OK) != -1) {

        GraphPointer graph;
        graph = Graph_create(fname);

        LocalMinimizer_run(graph, Energy_calculate, Gradient_calculate, FTOL);
        GlobalMinimizer_run(graph, Energy_calculate);
        
        Graph_free(graph);
        graph = NULL;
        
        assert(!graph);

    } else {
        Util_runtime_error("Minimizer_run(): Can't read file");
    }
}


