/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "vector2d.h"
#include "util.h"

Vec2D Vector2d_initialize(float x, float y)
{
    Vec2D rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.given_coords = 0;
    rtn.len = sqrtf(x * x + y * y);
    return rtn;
}

Vec2DP Vector2d_create(float x, float y)
{
    Vec2DP rtn = (Vec2DP) malloc(sizeof(Vec2D));
    *rtn = Vector2d_initialize(x, y);
    return rtn;
}

Vec2D Vector2d_zero()
{
    return Vector2d_initialize(0.0f, 0.0f);
}

Vec2D Vector2d_add(Vec2D vec1, Vec2D vec2) 
{
    return Vector2d_initialize(vec1.x + vec2.x, vec1.y + vec2.y);
}

Vec2D Vector2d_sub(Vec2D vec1, Vec2D vec2) 
{
    return Vector2d_initialize(vec1.x - vec2.x, vec1.y - vec2.y);
}

Vec2D Vector2d_negate(Vec2D vec) 
{
    return Vector2d_initialize(-vec.x, -vec.y);
}

Vec2D Vector2d_scalar_mult(Vec2D vec, float c)
{
    return Vector2d_initialize(c * vec.x, c * vec.y);
}

float Vector2d_dot(Vec2D v1, Vec2D v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

float Vector2d_norm(Vec2D v) 
{
    return sqrt(Vector2d_dot(v, v));
}

float Vector2d_angle(Vec2D v1, Vec2D v2)
{
    float scalp, lenp, div;
    scalp = Vector2d_dot(v1, v2);
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

int Vector2d_parallel(Vec2D v1, Vec2D v2)
{
    return equal(Vector2d_angle(v1, v2), 0);
}

int Vector2d_equal(Vec2D v1, Vec2D v2)
{
    return equal(v1.x, v2.x) && equal(v1.y, v2.y);
}

/**
 * Magnitude of the vector that would result from a regular 3D space. 
 */

float Vector2d_cross(Vec2D vec1, Vec2D vec2)
{
    return (vec1.x * vec2.y) - (vec2.x * vec1.y);
}

