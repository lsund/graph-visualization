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

Vector Vector_initialize(const double x, const double y)
{
    Vector rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.given_coords = 0;
    rtn.len = sqrt(x * x + y * y);
    return rtn;
}

VectorPointer Vector_create(double x, double y)
{
    VectorPointer rtn = (VectorPointer) malloc(sizeof(Vector));
    *rtn = Vector_initialize(x, y);
    return rtn;
}

Vector Vector_zero()
{
    return Vector_initialize(0.0, 0.0);
}

Vector Vector_add(Vector vec1, Vector vec2) 
{
    return Vector_initialize(vec1.x + vec2.x, vec1.y + vec2.y);
}

Vector Vector_sub(Vector vec1, Vector vec2) 
{
    return Vector_initialize(vec1.x - vec2.x, vec1.y - vec2.y);
}

Vector Vector_mult(Vector vec1, Vector vec2) 
{
    return Vector_initialize(vec1.x * vec2.x, vec1.y * vec2.y);
}

Vector Vector_negate(Vector vec) 
{
    return Vector_initialize(-vec.x, -vec.y);
}

Vector Vector_scalar_mult(Vector vec, double c)
{
    return Vector_initialize(c * vec.x, c * vec.y);
}

Vector Vector_scalar_add(Vector vec, double c)
{
    return Vector_initialize(c + vec.x, c + vec.y);
}

double Vector_dot(Vector v1, Vector v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

double Vector_norm(Vector v) 
{
    return sqrt(Vector_dot(v, v));
}

double Vector_angle(Vector v1, Vector v2)
{

    double scalp;
    scalp = Vector_dot(v1, v2);
    assert(!(scalp != scalp));
    
    double lenp;
    lenp = (v1.len * v2.len);
    assert(lenp >= 0);

    if (Util_is_zero(lenp)) {
        Util_runtime_error("Vector_angle: Division by zero");
    }
    if (scalp != scalp) Util_runtime_error("angle: Nan scalp");
    if (
            Util_equal(scalp, lenp) || 
            Util_equal(scalp, -lenp) || 
            Util_equal(-scalp, lenp)
        )
    {
        return 0.0;
    }

    double div;
    div = scalp / lenp;
    if (Util_equal(div, 1.0) || Util_equal(div, -1.0)) 
        return 0.0;
    if (!Util_in_range(-1.0, 1.0, div)) {
        Util_runtime_error("Outside acos range"); 
    }
    return acos(div);
}

int Vector_parallel(Vector v1, Vector v2)
{
    return Util_equal(Vector_angle(v1, v2), 0);
}

int Vector_Util_equal(Vector v1, Vector v2)
{
    return Util_equal(v1.x, v2.x) && Util_equal(v1.y, v2.y);
}

/**
 * Magnitude of the vector that would result from a regular 3D space. 
 */

double Vector_cross(Vector vec1, Vector vec2)
{
    return (vec1.x * vec2.y) - (vec2.x * vec1.y);
}

