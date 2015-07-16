/*****************************************************************************

 * Author : Ludvig Sundström

 * File Name : util.c

 * Purpose : 

 * Creation Date : 26-06-2015

 * Last Modified : 

 *****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <limits.h>

#include "util.h"
#include "constants.h"

int equal(float tar, float x) {
    return fabs(x - tar) < COMP_EPS;
}

int in_range(float lower, float upper, float x)
{
    int lowcond = x > lower + COMP_EPS;
    int upcond = x < upper - COMP_EPS;
    return lowcond && upcond;
}

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

void free_vertices(Vptr *vs, int nv) 
{
    int i;
    for (i = 0; i < nv; i++) {
        free(*(vs + i));
    }
    free(vs);
}

void free_bonds(Bptr *bs, int nb) 
{
    int i;
    for (i = 0; i < nb; i++) {
        free(*(bs + i));
    }
    free(bs);
}

void free_bpairs(BpairPtr bpairs)
{
    BpairPtr cur = bpairs;
    while(cur != NULL) {
        BpairPtr tmp = cur;
        cur = cur->next;
        free(tmp);
    }
    bpairs = NULL;
}

void print_vertex(V v) 
{
    printf("vertex {id: %d, position: [%f, %f], mass: %f, radius: %f, \n\
            type: %c}\n", v.id, v.pos.x, v.pos.y, v.mass, v.radius, v.type);
}

void print_bond(B b) 
{
    printf("bond {fst: %d, snd: %d, len: %f, stiffness: %f}\n", b.fst->id, 
            b.snd->id, b.dist0, b.k);
}

