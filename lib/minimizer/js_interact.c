
#include <unistd.h>

#include "js_interact.h"
#include "emscripten.h"
#include "constants.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

void js_interact(GraphPointer graph)
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

