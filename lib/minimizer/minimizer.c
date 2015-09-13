/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 
 * Description: Defines the minimizer, the engine capable of creating a
 * graph-object G and minimizing its energy as an attempt of finding a good
 * visual representation of G. 
 
 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <unistd.h>
#include <string.h>

#include "emscripten.h"
#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "energy.h"
#include "gradient.h"
#include "local_minimizer.h"
#include "global_minimizer.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

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

float *Minimizer_run(const char *fname) 
{
    assert(fname);
    float *rtn;
    rtn = 0;
    if (access(fname, R_OK) != -1) {

        GraphPointer graph;
        graph = Graph_create(fname);

        LocalMinimizer_run(graph, Energy_calculate, Gradient_calculate, FTOL);
        js_interact(graph);
        GlobalMinimizer_run(graph, Energy_calculate, Gradient_calculate);
        
        if (EMSCRIPT) {
            js_interact(graph);
        } else {
            rtn = VertexSet_to_array(graph->vs); 
        }
        if (PRINT_STATISTICS) {
            printf("Overlaps: %d\n", graph->ncrosses);
            printf("Angular resolution %f\n", Graph_angular_resolution(graph));
            printf("-----------------------\n");
        }

        Graph_free(graph);
        graph = 0;
    } else {
        assert((sizeof(fname) / sizeof(char)) <= MAX_FILENAME_LENGTH);

        char emsg[128];
        strcpy(emsg, "Minimizer_run: Can't read file: ");
        strcat(emsg, fname);
        Util_runtime_error(emsg);
    }

    return rtn;
}

