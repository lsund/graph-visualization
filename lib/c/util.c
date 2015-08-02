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
    
int equal(const float tar, const float x) {
    return fabs(x - tar) < COMP_EPS;
}

int about(const float tar, const float x) {
    if (equal(tar, x)) return 1;
    float err;
    err = fabs(x * MIN_DIST);
    return fabs(x - tar) <= err;
}

int in_range(const float lower, const float upper, const float x)
{
    int lowcond = x > lower;
    int upcond = x < upper;
    return lowcond && upcond;
}

void *Util_allocate(int nmemb, int size) {
    void *rtn = malloc(nmemb * size);
    if (rtn == NULL)
    {
        rt_error("Error when allocating memory");
    }
    return rtn;
}

void *Util_allocate_initialize(int nmemb, int size) {
    void *rtn = calloc(nmemb, size);
    if (rtn == NULL)
    {
        rt_error("Error when allocating memory");
    }
    return rtn;
}

void rt_error(char error_text[])
{
    fprintf(stderr,ANSI_COLOR_RED "Runtime-error:%s\n" ANSI_COLOR_RESET,
            error_text);
    exit(1);
}

