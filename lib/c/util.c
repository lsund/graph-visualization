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

    if (s >= MIN_DIST && s <= 1 - MIN_DIST && 
        t >= MIN_DIST && t <= 1 - MIN_DIST)
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

