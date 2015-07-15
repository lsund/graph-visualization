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
#include "constants.h"

#include "../../tests/minunit.h"

void set_spiral(struct vertex **vs, int nv);
void set_grid(struct vertex **vs, int nv);

void process_json(const char *filename, struct vertex ***vs, struct bond ***bs,
        int *nv, int *nb);

float func(struct vertex **, struct bond **, int, int);

void dfunc(struct vertex **, struct bond **, int, int, float *);

void frprmn(struct vertex **vs, struct bond **bs, int nv, int nb, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)());

int minimize (const char *fname) 
{

    float (*objective)(struct vertex **, struct bond **, int, int);
    void (*gradient)(struct vertex **, struct bond **, int, int, float *);
    int nv, nb;
    struct vertex **vs;
    struct bond **bs;
    float *varr, *fret;
    int *barr, *iter;

    objective = func;
    gradient = dfunc;
    vs = NULL;
    bs = NULL;
    
    if (iter == NULL || fret == NULL || varr == NULL || barr == NULL)
    {
        rt_error("Error when allocating memory: minimize()");
    }

    process_json(fname, &vs, &bs, &nv, &nb);
    set_spiral(vs, nv);

    if ((float)nb > (float)nv * logf((float)nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    iter = calloc(1, sizeof(int));
    fret = calloc(1, sizeof(float));

    frprmn(vs, bs, nv, nb, FTOL, iter, fret, objective, gradient);

    printf("%d iterations\n", *iter);

    free_vertices(vs, nv);
    free_bonds(bs, nb);
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
    struct vertex **vs = malloc(sizeof(void *) * nv);
    struct bond **bs = malloc(sizeof(void *) * maxbonds);
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
    for (i = 0; i < nv; i++) {
        mu_assert("None of the vertex positions are null", 
                (*(vs + i))->pos != NULL);
    }

    return 0;    
}

