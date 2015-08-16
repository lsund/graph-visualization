/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "constants.h"
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

Vector Vector_add(Vector vec0, Vector vec1) 
{
    return Vector_initialize(vec0.x + vec1.x, vec0.y + vec1.y);
}

Vector Vector_sub(Vector vec0, Vector vec1) 
{
    return Vector_initialize(vec0.x - vec1.x, vec0.y - vec1.y);
}

Vector Vector_mult(Vector vec0, Vector vec1) 
{
    return Vector_initialize(vec0.x * vec1.x, vec0.y * vec1.y);
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

double Vector_dot(Vector v0, Vector v1)
{   
    return v0.x * v1.x + v0.y * v1.y;
}

double Vector_norm(Vector v) 
{
    return sqrt(Vector_dot(v, v));
}

double Vector_angle(Vector v0, Vector v1)
{

    double scalp;
    scalp = Vector_dot(v0, v1);
    assert(!(scalp != scalp));
    
    double lenp;
    lenp = (v0.len * v1.len);
    assert(lenp >= 0);

    if (Util_is_zero(lenp)) {
        return 0.0;
        /*Util_runtime_error("Vector_angle: Division by zero");*/
    }
    if (scalp != scalp) Util_runtime_error("Vector_angle: Nan scalp");
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
    if (fabs(div - 1.0) < EPS || fabs(div + 1.0) < EPS) 
        return 0.0;
    if (!Util_in_range_strict(-1.0, 1.0, div)) {
        Util_runtime_error("Vector_angle: Outside acos range"); 
    }
    return acos(div);
}

int Vector_parallel(Vector v0, Vector v1)
{
    return Util_equal(Vector_angle(v0, v1), 0);
}

int Vector_equal(Vector v0, Vector v1)
{
    return Util_equal(v0.x, v1.x) && Util_equal(v0.y, v1.y);
}

/**
 * Magnitude of the vector that would result from a regular 3D space. 
 */

double Vector_cross(Vector vec0, Vector vec1)
{
    return (vec0.x * vec1.y) - (vec1.x * vec0.y);
}

