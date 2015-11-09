/*****************************************************************************

* File Name: local_minimizer.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 13-08-2015

*****************************************************************************/

#include <math.h>
#include <stdio.h>

#include "constants.h"
#include "linmin.h"
#include "js_interact.h"
#include "emscripten.h"

/* Private ******************************************************************/

static int close_to_target(double fret, double e, double ftol)
{
    return 2.0 * fabs(fret - e) <= (ftol) * (fabs((fret)) + fabs((e)) + EPS);
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

    VertexSet_create_sequences(graph->vs, 1, INITIALIZE);

    double e;
    e_fun(graph);
    e = graph->energy;

    assert(e >= 0);
    
    int i; 
    for (i = 0; i < L_ITMAX; i++) {
        
        if (STEP) {
            js_interact(graph);
            /*emscripten_sleep(INTERVAL);*/
        }
        
        double fret = 0.0;
        linmin(graph, e_fun, &fret);

        if (close_to_target(fret, e, ftol)) break;

        g_fun(graph);
        e_fun(graph);
        e = graph->energy;

        double gg, dgg;
        dgg = gg = 0.0;
        VertexSet_calculate_score(graph->vs, &gg, &dgg); 

        if (fabs(gg) < EPS) {
            break;
        }
        
        double gam;
        gam = dgg / gg;
        VertexSet_create_sequences(graph->vs, gam, UPDATE);
        /*if (PRINT_STATISTICS) */
            /*printf("Bonds: %d Ovelaps: %d Ratio: %f\n", */
                    /*graph->bs.n, */
                    /*graph->ncrosses,*/
                    /*(double) graph->ncrosses / (double) graph->bs.n);*/
    }
    if (PRINT_STATISTICS) printf("Iterations LM: %d\n", i);
}

