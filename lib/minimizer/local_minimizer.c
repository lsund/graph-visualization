/*****************************************************************************

* File Name: local_minimizer.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 13-08-2015

*****************************************************************************/

#include <math.h>

#include "constants.h"
#include "graph.h"
#include "emscripten.h"
#include "linmin.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

/* Private ******************************************************************/

static int close_to_target(double fret, double e, double ftol)
{
    return 2.0 * fabs(fret - e) <= (ftol) * (fabs((fret)) + fabs((e)) + EPS);
}

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

/* Public ******************************************************************/

void LocalMinimizer_run(
        const GraphPointer graph, 
        void (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        const double ftol
    )
{
    assert(graph && e_fun && g_fun);
    assert(graph->grid && graph->vs.set && graph->bs.set);
    assert(ftol > 0 && ftol < 0.1);

    int nv;
    nv = graph->vs.n;

    g_fun(graph);

    VertexSet_create_sequences(graph->vs, nv, 1, INITIALIZE);

    double e;
    e_fun(graph);
    e = graph->energy;

    assert(e >= 0);
    
    int i; 
    for (i = 0; i < L_ITMAX; i++) {
        
        double fret = 0.0;
        linmin(graph, e_fun, &fret);

        if (close_to_target(fret, e, ftol)) break;

        g_fun(graph);
        e_fun(graph);
        e = graph->energy;

        double gg, dgg;
        dgg = gg = 0.0;
        VertexSet_calculate_score(graph->vs, nv, &gg, &dgg); 

        if (fabs(gg) < EPS) {
            break;
        }
        
        double gam;
        gam = dgg / gg;
        VertexSet_create_sequences(graph->vs, nv, gam, UPDATE);
    }

    js_interact(graph);
}

