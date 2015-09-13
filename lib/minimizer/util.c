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

Sign Util_sign(const double x)
{
    return x > 0 ? PLUS : MINUS;
}

double Util_doubles_min(const double *set, const int n)
{
    double min;
    min = set[0];

    int i;
    for (i = 1; i < n; i++) {
        if (set[i] < min) min = set[i];
    }
    return min;
}

double Util_doubles_max(const double *set, const int n)
{
    double max;
    max = set[0];

    int i;
    for (i = 1; i < n; i++) {
        if (set[i] > max) max = set[i];
    }
    return max;
}

void Util_normalize(
        double *set, 
        const int n, 
        const double upper, 
        const double min, 
        const double max 
    )
{
    int i;
    for (i = 0; i < n; i++) {
        assert(Util_in_range(min, max, set[i]));

        set[i] = upper * ((set[i] - min) / (max - min));
    }
}

int Util_is_zero(const double x)
{
    return Util_equal(x, 0.0);
}

int Util_equal(const double tar, const double x) {
    if (tar == 0 && x == 0) return 1;
    return fabs(x - tar) < TINY;
}

int Util_close_to(const double tar, const double x) {
    if (tar == 0 && x == 0) return 1;
    return fabs(x - tar) < EPS;
}

int Util_about(const double tar, const double x) {
    if (Util_equal(tar, x)) return 1;
    double err;
    err = fabs(x * EPS);
    return fabs(x - tar) <= err;
}

int Util_in_range(const double lower, const double upper, const double x)
{
    int lowcond, upcond;
    lowcond = x > lower || Util_equal(x, lower);
    upcond = x < upper || Util_equal(x, upper);
    return lowcond && upcond;
}

int Util_in_range_strict(
        const double lower, 
        const double upper, 
        const double x
    )
{
    int lowcond, upcond;
    lowcond = x > lower;
    upcond = x < upper;
    return lowcond && upcond;
}

void Util_runtime_error(char error_text[])
{
    fprintf(stderr,ANSI_COLOR_RED "Runtime-error: %s\n" ANSI_COLOR_RESET,
            error_text);
    exit(1);
}

void *Util_allocate(int nmemb, int size) {
    void *rtn = malloc(nmemb * size);
    if (rtn == NULL)
    {
        Util_runtime_error("Error when allocating memory");
    }
    return rtn;
}

void *Util_allocate_initialize(int nmemb, int size) {
    void *rtn = calloc(nmemb, size);
    if (rtn == NULL)
    {
        Util_runtime_error("Error when allocating memory");
    }
    return rtn;
}

