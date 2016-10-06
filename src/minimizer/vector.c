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
    rtn.len = sqrt(x * x + y * y);
    return rtn;
}

VectorPointer Vector_create(const double x, const double y)
{
    VectorPointer rtn = (VectorPointer) malloc(sizeof(Vector));
    *rtn = Vector_initialize(x, y);
    return rtn;
}

Vector Vector_zero()
{
    return Vector_initialize(0.0, 0.0);
}

Vector Vector_add(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x + vec1.x, vec0.y + vec1.y);
}

Vector Vector_sub(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x - vec1.x, vec0.y - vec1.y);
}

Vector Vector_mult(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x * vec1.x, vec0.y * vec1.y);
}

Vector Vector_negate(const Vector vec) 
{
    return Vector_initialize(-vec.x, -vec.y);
}

Vector Vector_scalar_mult(const Vector vec, const double c)
{
    return Vector_initialize(c * vec.x, c * vec.y);
}

Vector Vector_scalar_add(const Vector vec, const double c)
{
    return Vector_initialize(c + vec.x, c + vec.y);
}

double Vector_dot(const Vector vec0, const Vector vec1)
{   
    return vec0.x * vec1.x + vec0.y * vec1.y;
}

double Vector_norm(const Vector v) 
{
    return sqrt(Vector_dot(v, v));
}

double Vector_angle(const Vector vec0, const Vector vec1)
{

    double scalp;
    scalp = Vector_dot(vec0, vec1);
    
    double lenp;
    lenp = (vec0.len * vec1.len);
    assert(lenp >= 0);

    if (Util_is_zero(lenp)) {
        return 0.0;
    }
    if (scalp != scalp) {
        Util_runtime_error("Vector_angle: Nan scalp");
    }
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

int Vector_parallel(const Vector vec0, const Vector vec1)
{
    return Util_equal(Vector_angle(vec0, vec1), 0);
}

int Vector_equal(const Vector vec0, const Vector vec1)
{
    return Util_equal(vec0.x, vec1.x) && Util_equal(vec0.y, vec1.y);
}

char *Vector_string(Vector vec)
{
    char *rtn = Util_allocate_initialize(18 * 2 + 10, sizeof(char));
    sprintf(rtn, "(x: %f, y: %f)", vec.x, vec.y);
    return rtn;
}

