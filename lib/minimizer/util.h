
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include <assert.h>

typedef enum { INITIALIZE, UPDATE } Strategy;

double Util_collection_min(const double *col, const int n);

int Util_equal(const double tar, const double x);

int Util_is_zero(const double x);

int Util_about(const double tar, const double x);

int Util_in_range(const double lower, const double upper, const double x);

void Util_check_range(const double *x, const double lower, const double upper);

void Util_runtime_error(char []);

void *Util_allocate_initialize(int nmemb, int size);

void *Util_allocate(int nmemb, int size);

#endif
