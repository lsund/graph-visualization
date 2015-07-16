
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include "graph.h"

int equal(float tar, float x);

int in_range(float lower, float upper, float x);

void check_range(float *x, float lower, float upper);

void rt_error(char []);

float *vector(long n);

Vector2d *arrtop(float arr[], int n);

void free_vertices(Vptr *vs, int nv);

void free_bonds(Bptr *bs, int nb);

void free_bpairs(BpairPtr bpairs);

void print_vertex(V v);
void print_bond(B b);

#endif
