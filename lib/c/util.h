
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include "graph.h"

int has_common_vertex(Bptr b1, Bptr b2);

int equal(float tar, float x);
int about(float tar, float x);

int in_range(float lower, float upper, float x);

void check_range(float *x, float lower, float upper);

float max(float *x, int len);

char intersection(float p0_x, float p0_y, float p1_x, float p1_y, 
    float p2_x, float p2_y, float p3_x, float p3_y, float *i_x, float *i_y);

void rt_error(char []);

float *vector(long n);

Vector2d *arrtop(float arr[], int n);

void free_vertices(Vptr *vs, int nv);

void free_bonds(Bptr *bs, int nb);

void free_bpairs(BpairPtr bpairs);

void free_graph(Gptr graph);

void print_vertex(V v);
void print_bond(B b);

#endif
