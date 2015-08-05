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
    ({2.0 * fabs(fret - e) <= (ftol) * (fabs((fret)) + fabs((e)) + EPS);})

static void js_interact(GraphPointer graph)
{
    assert(graph);
    float *varr;
    int *barr, *zarr;
    varr = NULL;
    barr = NULL; zarr = NULL;
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
    varr = NULL; barr = NULL; zarr = NULL;
}

void create_sequences(
        const VectorPointer gradient,
        const VectorPointer g,
        const VectorPointer h,
        const int n,
        const float gam, 
        const Strategy strat
    )
{
    int i;
    for (i = 0; i < n; i++) {
        g[i] = Vector_negate(gradient[i]);
        if (strat == INITIALIZE) {
            gradient[i] = h[i] = g[i];
        } else {
            Vector h_gam, g_h_gam;
            h_gam = Vector_scalar_mult(h[i], gam);
            g_h_gam = Vector_add(g[i], h_gam);
            gradient[i] = h[i] = g_h_gam;
        }
    }
}

void calculate_score(
       const VectorPointer gradient, 
       const VectorPointer g,
       const int n,
       float *gg, 
       float *dgg
    )
{
    int i;
    for (i = 0; i < n; i++) {
        *gg += Vector_dot(g[i], g[i]);
        *dgg += Vector_dot(Vector_add(gradient[i], g[i]), gradient[i]);

    }
}

static void conjugate_gradient(
        GraphPointer graph, 
        float (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer, VectorPointer),
        float ftol
    )
{
    
    assert(graph);
    assert(e_fun);
    assert(g_fun);
    assert(ftol > 0 && ftol < 0.1);

    int nv;
    nv = graph->vs.n;

    VectorPointer gradient, g, h;
    g = Util_allocate_initialize(nv, sizeof(Vector));
    h = Util_allocate_initialize(nv, sizeof(Vector));
    gradient = Util_allocate_initialize(nv, sizeof(Vector));

    assert(g && h && gradient);

    g_fun(graph, gradient);

    create_sequences(gradient, g, h, nv, 1, INITIALIZE);

    float energy;
    energy = e_fun(graph);

    assert(energy >= 0);
    
    int i; 
    for (i = 0; i < ITMAX; i++) {
        
        float fret = 0.0;
        linmin(graph, e_fun, &fret, gradient);

        if (CLOSE_TO_TARGET(fret, energy, ftol)) break;

        g_fun(graph, gradient);
        energy = e_fun(graph);

        float gg, dgg;
        dgg = gg = 0.0;
        calculate_score(gradient, g, nv, &gg, &dgg); 

        if (fabs(gg) < EPS) {
            break;
        }
        
        float gam;
        gam = dgg / gg;
        create_sequences(gradient, g, h, nv, gam, UPDATE);
    }
    free(gradient); free(g); free(h);
    gradient = NULL; g = NULL; h = NULL;

    assert(!g && !h && !gradient);

    js_interact(graph);
}

int Minimizer_run(const char *fname) 
{
    assert(fname);

    GraphPointer graph;
    graph = Graph_create(fname);

    conjugate_gradient(graph, Energy_calculate, Gradient_calculate, FTOL);

    Graph_free(graph);
    graph = NULL;
    
    assert(!graph);
    return 0;
}


