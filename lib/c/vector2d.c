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

Vector2d mk_vector2d(float x, float y)
{
    Vector2d rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.given_coords = 0;
    rtn.len = sqrtf(x * x + y * y);
    return rtn;
}

Vector2d add(Vector2d vec1, Vector2d vec2) 
{
    return mk_vector2d(vec1.x + vec2.x, vec1.y + vec2.y);
}

float dot(Vector2d v1, Vector2d v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

int parallel(Vector2d v1, Vector2d v2)
{
    return equal(angle(v1, v2), 0);
}

float angle(Vector2d v1, Vector2d v2)
{
    float scalp, lenp, div;
    scalp = dot(v1, v2);
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

Vector2d cross(Vector2d vec1, Vector2d vec2)
{
    return mk_vector2d(vec1.x * vec2.y, -vec1.y * vec2.x);
}

