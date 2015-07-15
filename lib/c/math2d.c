/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <math.h>
#include "math2d.h"

struct vector2d mk_vector2d(float x, float y)
{
    struct vector2d rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.len = sqrtf(x * x + y * y);
    return rtn;
}

struct vector2d add(struct vector2d vec1, struct vector2d vec2) 
{
    struct vector2d rtn;
    rtn.x = vec1.x + vec2.x;
    rtn.y = vec1.y + vec2.y;
    return rtn;
}

float dot(struct vector2d v1, struct vector2d v2)
{   
    return v1.x * v2.x + v1.y * v2.y;
}

