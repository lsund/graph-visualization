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

void process_json(const char *filename, struct vertex **vs, struct bond **bs,
        struct point **ps, int *nv, int *nb);

float func(struct vertex **, struct bond **, int, int);

void dfunc(struct vertex **, struct bond **, int, int, float *);

void frprmn(struct vertex **vs, struct bond **bs, int nv, int nb, float ftol,
        int *iter, float *fret, float (*func)(), void (*dfunc)());

static void set_positions(struct point **ps, int nv) {
    int i, n, vdim, rows, cols;
    float gapx, gapy, offsetx, offsety, x, y;
    n = nv; 
    while (fabs(sqrt(n) - (int) sqrt(n)) > 0.01) {
        n++;
    }
    vdim = sqrt(n);
    gapx = PANEL_X / vdim;
    gapy = PANEL_Y / vdim;
    offsetx = gapx / 2;
    offsety = gapy / 2;
    rows = 0;
    cols = -1;
    for (i = 0; i < nv; i++) {
        if (i % vdim == 0) {
            rows++;
            cols = 0; 
        }
        x = cols * gapx + offsetx;
        y = rows * gapy + offsety; 
        *(ps + i) = mk_point(x, y);
        cols++;
    }
}

static void toarrays(struct vertex **vs, struct bond **bs, float *vsarr, 
        int *bsarr, int nv, int nb)
{
    int i;
    for (i = 0; i < nv; i++) {
        *(vsarr + i * 2) = (*(vs + i))->pos->x;
        *(vsarr + i * 2 + 1) = (*(vs + i))->pos->y;
    }
    *bsarr = nb;
    for (i = 1; i < nb + 1; i++) {
        *(bsarr + i * 2) = (*(bs + i - 1))->fst->id;
        *(bsarr + i * 2 + 1) = (*(bs + i - 1))->snd->id;
    }
}

int minimize (const char *fname, float *varr, int *barr, const int len) 
{

    float (*objective)(struct vertex **, struct bond **, int, int);
    void (*gradient)(struct vertex **, struct bond **, int, int, float *);
    int nv, nb, maxbonds;
    struct point **ps;
    struct vertex **vs;
    struct bond **bs;
    float *fret;
    int *iter;

    nv = len / 2;
    maxbonds = (nv * (nv - 1)) / 2;
    objective = func;
    gradient = dfunc;
    ps = malloc(sizeof(void *) * nv);
    vs = malloc(sizeof(void *) * nv);
    bs = malloc(sizeof(void *) * maxbonds);
    iter = malloc(sizeof(int));
    fret = malloc(sizeof(float));
    
    if (ps == NULL || vs == NULL || bs == NULL || iter == NULL || fret == NULL)
    {
        rt_error("Error in minimize when allocating memory");
    }

    set_positions(ps, nv); 
    process_json(fname, vs, bs, ps, &nv, &nb);

    if ((float)nb > (float)nv * logf((float)nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    frprmn(vs, bs, nv, nb, FTOL, iter, fret, objective, gradient);
    toarrays(vs, bs, varr, barr, nv, nb);

    printf("%d iterations\n", *iter);

    free(ps);
    free_vertices(vs, nv);
    free_bonds(bs, nb);
    free(fret);
    free(iter);

    return 0;
}

int main(int argc, char *argv[]) {

    const char *filename = "data/52.json";
    int len = 104;
    int nv = len / 2;
    float *vsarr = malloc(sizeof(float) * nv * 2); 
    int *bsarr = malloc(sizeof(int) * (nv * (nv - 1) + 4)); 

    minimize(filename, vsarr, bsarr, len);

}

