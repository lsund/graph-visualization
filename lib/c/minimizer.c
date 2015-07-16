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

#include "util.h"
#include "placement.h"
#include "constants.h"

#include "../../tests/minunit.h"

void process_json(const char *filename, Vptr **vs, Bptr **bs,
        int *nv, int *nb);

float func(Gptr graph);

void dfunc(Gptr graph);

void frprmn(Gptr graph, float ftol, int *iter, float *fret, 
        float (*func)(Gptr), void (*dfunc)(Gptr));

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

    printf("%d iterations\n", *iter);

    free_vertices(graph->vs, nv);
    free_bonds(graph->bs, nb);
    free_bpairs(graph->bpairs);
    free(graph);

    free(fret);
    free(iter);
    
    return 0;
}

int main(int argc, char *argv[]) {
    const char *filename = "data/52.json";
    minimize(filename);
}

/////////////////////////////////////////////// TESTING ///////////////////////

char *test_minimizer()
{
    const char *fname = "data/52.json";
    int len = 104;
    int nv = len / 2;
    int nb, maxbonds;
    maxbonds = (nv * (nv - 1)) / 2;
    Vptr *vs = malloc(sizeof(void *) * nv);
    Bptr *bs = malloc(sizeof(void *) * maxbonds);
    float *iter = malloc(sizeof(int));
    float *fret = malloc(sizeof(float));
    
    if (vs == NULL || bs == NULL || iter == NULL || fret == NULL)
    {
        rt_error("Error in minimize when allocating memory");
    }

    process_json(fname, &vs, &bs, &nv, &nb);
    set_spiral(vs, nv);
    int i;
    int sum;
    for (i = 0; i < nv; i++) {
        sum += (*(vs + i))->conn;
        printf("%d %d\n", (*(vs + i))->id, (*(vs + i))->conn);
    }
    printf("%d %d\n", sum, nb);

    return 0;    
}

