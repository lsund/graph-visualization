
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include <assert.h>

typedef enum { INITIALIZE, UPDATE } Strategy;

typedef enum { PLUS, MINUS } Sign;

// The sign as type Sign of its arguments
Sign Util_sign(const double x);

// The minimum value of a set of doubles;
double Util_doubles_min(const double *set, const int n);

// The maximum value of a set of doubles.
double Util_doubles_max(const double *set, const int n);

// Normalizes a set of doubles to range [0, upper] where the domain of the set
// is [min, max]
void Util_normalize(
        double *set, 
        const int n, 
        const double upper, 
        const double min, 
        const double max 
    );

// 1 if tar and x are "equal" (high precision), 0 otherwise
int Util_equal(const double tar, const double x);

// 1 if x is equal to zero (high precision), 0 otherwise
int Util_is_zero(const double x);

// 1 if tar and x are "equal" (medium precision), 0 otherwise
int Util_about(const double tar, const double x);

// 1 if tar and x are "equal" (low precision), 0 otherwise
int Util_close_to(const double tar, const double x);

// 1 if x has a value between lower and upper or x is "equal" to (high
// precision) to lower or upper, 0 otherwise
int Util_in_range(const double lower, const double upper, const double x);

// 1 if x has a value between lower and upper, 0 otherwise
int Util_in_range_strict(
        const double lower, 
        const double upper, 
        const double x
    );

// Prints the specified message to stderr and terminates the program
void Util_runtime_error(char []);

// A pointer to a number of nmemb allocated memory-blocks of size size bytes,
// initialized to zero.
void *Util_allocate_initialize(int nmemb, int size);

// A pointer to a number of nmemb allocated memory-blocks of size size bytes
void *Util_allocate(int nmemb, int size);

#endif
