/*****************************************************************************

* File Name: test.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 16-07-2015

*****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "util.h"
#include "inits.h"
#include "funcs.h"
#include "conjugate_gradient.h"
#include "constants.h"
#include "minunit.h"

char *test_objective() {

    const char *fname = "/data/8.json";

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
    
    float e = func(graph);
    mu_assert("total energy should be bigger than 0", e > 0 );

    return 0;
}

int tests_run = 0;

char *test_objective();

static char *all_tests() {
    mu_run_test(test_objective);
    return 0;
}

int main(int argc, char **argv) {
    char *result = all_tests();
    if (result != 0) {
        printf("%s\n", result);
    }
    else {
        printf("ALL TESTS PASSED\n");
    }
    printf("Tests run: %d\n", tests_run);

    return result != 0;
}
 


