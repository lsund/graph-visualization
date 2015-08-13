
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include <assert.h>

typedef enum { INITIALIZE, UPDATE } Strategy;

typedef enum { PLUS, MINUS } Sign;

Sign Util_sign(const double x);

/** 
 * Returns the minimum value of a set of doubles;
 */
double Util_doubles_min(const double *set, const int n);

/**
 * Returns the maximum value of a set of doubles.
 */
double Util_doubles_max(const double *set, const int n);

/**
 * Normalizes a set of doubles to range [0, upper] where the domain of the set
 * is [min, max]
 */
void Util_normalize(
        double *set, 
        const int n, 
        const double upper, 
        const double min, 
        const double max 
    );

/**
 * Evaluates weather two double values are "equal", returning 1 if they are, 0
 * otherwise
 */
int Util_equal(const double tar, const double x);

int Util_is_zero(const double x);

int Util_about(const double tar, const double x);

int Util_close_to(const double tar, const double x);

int Util_in_range(const double lower, const double upper, const double x);

int Util_in_range_strict(
        const double lower, 
        const double upper, 
        const double x
    );

void Util_check_range(const double *x, const double lower, const double upper);

void Util_runtime_error(char []);

void *Util_allocate_initialize(int nmemb, int size);

void *Util_allocate(int nmemb, int size);

#endif
