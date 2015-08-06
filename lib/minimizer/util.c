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

double Util_collection_min(const double *col, const int n)
{
    int i, min;
    min = col[0];
    for (i = 1; i < n; i++) {
        if (col[i] < min) min = col[i];
    }
    return min;
}

int Util_is_zero(const double x)
{
    return Util_equal(x, 0.0);
}

int Util_equal(const double tar, const double x) {
    return fabs(x - tar) < EPS;
}

int Util_about(const double tar, const double x) {
    if (Util_equal(tar, x)) return 1;
    double err;
    err = fabs(x * 0.05);
    return fabs(x - tar) <= err;
}

int Util_in_range(const double lower, const double upper, const double x)
{
    int lowcond = x > lower || Util_equal(x, lower);
    int upcond = x < upper || Util_equal(x, upper);
    return lowcond && upcond;
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

void Util_runtime_error(char error_text[])
{
    fprintf(stderr,ANSI_COLOR_RED "Runtime-error: %s\n" ANSI_COLOR_RESET,
            error_text);
    exit(1);
}

