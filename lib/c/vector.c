/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "vector.h"
#include "util.h"

Vector Vector_initialize(float x, float y)
{
    Vector rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.given_coords = 0;
    rtn.len = sqrtf(x * x + y * y);
    return rtn;
}

VectorPointer Vector_create(float x, float y)
{
    VectorPointer rtn = (VectorPointer) malloc(sizeof(Vector));
    *rtn = Vector_initialize(x, y);
    return rtn;
}

Vector Vector_zero()
{
    return Vector_initialize(0.0f, 0.0f);
}

Vector Vector_add(Vector vec1, Vector vec2) 
{
    return Vector_initialize(vec1.x + vec2.x, vec1.y + vec2.y);
}

Vector Vector_sub(Vector vec1, Vector vec2) 
{
    return Vector_initialize(vec1.x - vec2.x, vec1.y - vec2.y);
}

Vector Vector_negate(Vector vec) 
{
    return Vector_initialize(-vec.x, -vec.y);
}

Vector Vector_scalar_mult(Vector vec, float c)
{
    return Vector_initialize(c * vec.x, c * vec.y);
}

float Vector_dot(Vector v1, Vector v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

float Vector_norm(Vector v) 
{
    return sqrt(Vector_dot(v, v));
}

float Vector_angle(Vector v1, Vector v2)
{
    float scalp, lenp, div;
    scalp = Vector_dot(v1, v2);
    lenp = (v1.len * v2.len);
    if (equal(lenp, 0)) rt_error("Division by zero");
    if (scalp != scalp) rt_error("angle: Nan scalp");
    if (equal(scalp, lenp) || equal(scalp, -lenp) || equal(-scalp, lenp))
        return 0.0;
    div = scalp / lenp;
    if (equal(div, 1.0) || equal(div, -1.0)) 
        return 0.0;
    if (!in_range(-1.0, 1.0, div)) {
        rt_error("Outside acos range"); 
    }
    return acosf(div);
}

int Vector_parallel(Vector v1, Vector v2)
{
    return equal(Vector_angle(v1, v2), 0);
}

int Vector_equal(Vector v1, Vector v2)
{
    return equal(v1.x, v2.x) && equal(v1.y, v2.y);
}

/**
 * Magnitude of the vector that would result from a regular 3D space. 
 */

float Vector_cross(Vector vec1, Vector vec2)
{
    return (vec1.x * vec2.y) - (vec2.x * vec1.y);
}

