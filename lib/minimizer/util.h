
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include <assert.h>

typedef enum { INITIALIZE, UPDATE } Strategy;

float Util_collection_min(const float *col, const int n);

int Util_equal(const float tar, const float x);

int Util_is_zero(const float x);

int Util_about(const float tar, const float x);

int Util_in_range(const float lower, const float upper, const float x);

void Util_check_range(const float *x, const float lower, const float upper);

void Util_runtime_error(char []);

void *Util_allocate_initialize(int nmemb, int size);

void *Util_allocate(int nmemb, int size);

#endif
