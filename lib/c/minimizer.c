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
    float (*objective)(Gptr graph);
    void (*gradient)(Gptr graph);
    int i, j, nv, nb;
    int *nvptr, *nbptr;
    Vptr *vs;
    Bptr *bs;
    float *fret;
    int *iter;

    objective = func;
    gradient = dfunc;
    vs = NULL;
    bs = NULL;

    nvptr = malloc(sizeof(int));
    nbptr = malloc(sizeof(int));

    process_json(fname, &vs, &bs, nvptr, nbptr);

    nv = *nvptr;
    nb = *nbptr;
    free(nvptr);
    free(nbptr);
    
    BpairPtr bpairs = NULL;
    Bptr b1, b2;
    for (i = 0; i < nb - 1; i++) {
        for (j = i + 1; j < nb; j++) {
            b1 = *(bs + i);  
            b2 = *(bs + j);  
            if (b1->snd->id == b2->fst->id) {
                BpairPtr newpair;
                newpair = malloc(sizeof(Bpair));
                newpair->fst = b1;
                newpair->snd = b2;
                newpair->next = bpairs;
                bpairs = newpair;
            }
        }
    }

    Gptr graph = malloc(sizeof(G));
    graph->vs = vs;
    graph->bs = bs;
    graph->bpairs = bpairs;
    graph->nv = nv;
    graph->nb = nb;

    set_spiral(vs, nv);

    if ((float)nb > (float)nv * logf((float)nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    iter = calloc(1, sizeof(int));
    fret = calloc(1, sizeof(float));

    if (iter == NULL || fret == NULL)
    {
        rt_error("Error when allocating memory: minimize()");
    }
    
    frprmn(graph, FTOL, iter, fret, objective, gradient);

    free_vertices(graph->vs, nv);
    free_bonds(graph->bs, nb);
    free_bpairs(graph->bpairs);
    free(graph);

    free(fret);
    free(iter);
    
    return 0;
}
