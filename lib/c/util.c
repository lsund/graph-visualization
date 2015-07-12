/*****************************************************************************

 * Author : Ludvig Sundström

 * File Name : util.c

 * Purpose : 

 * Creation Date : 26-06-2015

 * Last Modified : 

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>

#include "util.h"

void rt_error(char error_text[])
{
    fprintf(stderr,"Run-time error...\n");
    fprintf(stderr,"%s\n",error_text);
    fprintf(stderr,"...now exiting to system...\n");
    exit(1);
}

float *vector(long n) 
{
    float *v = NULL;
    v = (float *) calloc(n, (size_t)(n * sizeof(float)));
    if (v == NULL) {
        rt_error("error while allocating memory");
        return NULL;
    }
    return v;
}

struct point *arrtop(float arr[], int n) 
{   
    int i;
    struct point *ps = malloc(sizeof(struct point) * n);
    if (ps == NULL) {
        rt_error("Error while allocating memory");
    }
    for (i = 0; i < n * 2; i += 2) {
        struct point p;
        p.x = arr[i]; 
        p.y = arr[i + 1];
        *(ps + (i / 2)) = p;
    }
    return ps;
}

void free_vertices(struct vertex **vs, int nv) 
{
    int i;
    for (i = 0; i < nv; i++) {
        free((*(vs + i))->pos);
        free(*(vs + i));
    }
    free(vs);
}

void free_bonds(struct bond **bs, int nb) 
{
    int i;
    for (i = 0; i < nb; i++) {
        free(*(bs + i));
    }
    free(bs);
}

void print_vertex(struct vertex v) {
    printf("vertex {id: %d, position: [%f, %f], mass: %f, radius: %f, \n\
            type: %c}\n", v.id, v.pos->x, v.pos->y, v.mass, v.radius, v.type);
}

void print_bond(struct bond b) {
    printf("bond {fst: %d, snd: %d, len: %f, stiffness: %f}\n", b.fst->id, 
            b.snd->id, b.dist0, b.k);
}

