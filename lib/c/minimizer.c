/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 
 * Description: Defines an object able to 'minimize' the energy of the graph
 * G(V, B) created by the set of Vertices V and Bonds B defined in JSON format.
 
 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <unistd.h>

#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "linmin.h"
#include "energy.h"
#include "gradient.h"

#include "emscripten.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

#define CLOSE_TO_TARGET(fret, e, ftol) \
    ({2.0 * fabs(fret - e) <= ftol * (fabs(fret) + fabs(e) + EPS);})

static void js_interact(GraphPointer graph)
{
    float *varr;
    int *barr, *zarr;
    if (EMSCRIPT) {
        varr = VertexSet_to_array(graph->vs);
        barr = Bondset_to_array(graph->bs);
        zarr = Grid_to_array(graph->grid);
        EM_ASM_({
            window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5);
        }, varr, barr, zarr, 
                graph->vs.n * 2, graph->bs.n * 2, graph->grid->nz * 3);
    }
    free(varr); free(barr); free(zarr);
}

static void conjugate_gradient(
        GraphPointer graph, 
        float (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        float ftol
    )
{

    g_fun(graph);

    VertexSet_apply_forces(graph->vs, 1, INITIALIZE);

    float energy;
    energy = e_fun(graph);
    
    int i; 
    for (i = 0; i < ITMAX; i++) {
        
        float fret = 0.0;
        linmin(graph, e_fun, &fret);

        if (CLOSE_TO_TARGET(fret, energy, ftol)) break;

        g_fun(graph);

        energy = e_fun(graph);

        float gg, dgg;
        dgg = gg = 0.0;
        VertexSet_calculate_score(graph->vs, &gg, &dgg); 

        if (fabs(gg) < EPS) break;
        
        float gam;
        gam = dgg / gg;
        VertexSet_apply_forces(graph->vs, gam, UPDATE);
    }
    js_interact(graph);
    return;
}

int Minimizer_run(const char *fname) 
{

    GraphPointer graph;
    graph = Graph_create(fname);

    conjugate_gradient(graph, Energy_calculate, Gradient_calculate, FTOL);

    printf("Done, local optimization\n");
    
    Graph_free(graph);

    return 0;
}


