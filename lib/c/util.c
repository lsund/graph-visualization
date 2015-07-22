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

#define ANSI_COLOR_RED "\x1b[31m"
#define ANSI_COLOR_RESET "\x1b[0m"
    
int has_common_vertex(Bptr b1, Bptr b2) 
{
    return  b1->fst->id == b2->fst->id ||
            b1->fst->id == b2->snd->id || 
            b1->snd->id == b2->fst->id ||
            b1->snd->id == b2->snd->id;
}

int equal(float tar, float x) {
    return fabs(x - tar) < COMP_EPS;
}

int about(float tar, float x) {
    if (equal(tar, x)) return 1;
    float err;
    err = fabs(x * MIN_DIST);
    return fabs(x - tar) <= err;
}

int in_range(float lower, float upper, float x)
{
    int lowcond = x > lower;
    int upcond = x < upper;
    return lowcond && upcond;
}

/**
 * Returns 1 if the lines intersect, otherwise 0. In addition, if the lines 
 * intersect the intersection point may be stored in the floats i_x and i_y.
 * Credit: http://stackoverflow.com/users/78216/gavin
 */
char intersection(float p0_x, float p0_y, float p1_x, float p1_y, 
    float p2_x, float p2_y, float p3_x, float p3_y, float *i_x, float *i_y)
{
    float s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     
    s2_y = p3_y - p2_y;

    float s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / 
        (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / 
        (-s2_x * s1_y + s1_x * s2_y);

    if (s >= MIN_DIST && s <= 1 - MIN_DIST && t >= MIN_DIST && t <= 1 - MIN_DIST)
    {
        if (i_x != NULL)
            *i_x = p0_x + (t * s1_x);
        if (i_y != NULL)
            *i_y = p0_y + (t * s1_y);
        return 1;
    }
    return 0; 
}

void rt_error(char error_text[])
{
    fprintf(stderr,ANSI_COLOR_RED "Runtime-error:%s\n" ANSI_COLOR_RESET,
            error_text);
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

void free_graph(Gptr graph)
{
    free_vertices(graph->vs, graph->nv);
    free_bonds(graph->bs, graph->nb);
    free_bpairs(graph->connected);
    free(graph);
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

