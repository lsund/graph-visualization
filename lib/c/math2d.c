/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>
#include "math2d.h"

Vector2d mk_vector2d(float x, float y)
{
    Vector2d rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.len = sqrtf(x * x + y * y);
    return rtn;
}

Vector2d add(Vector2d vec1, Vector2d vec2) 
{
    Vector2d rtn;
    rtn.x = vec1.x + vec2.x;
    rtn.y = vec1.y + vec2.y;
    return rtn;
}

float dot(Vector2d v1, Vector2d v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

