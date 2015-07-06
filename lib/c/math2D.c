/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

#include <math.h>
#include "math2D.h"

struct point negate(struct point p) 
{
    struct point rtn;
    rtn.x = -p.x;
    rtn.y = -p.y;
    return rtn;
}

struct point add(struct point p1, struct point p2) 
{
    struct point rtn;
    rtn.x = p1.x + p2.x;
    rtn.y = p1.y + p2.y;
    return rtn;
}

struct vector2D mk_vector(struct point src, struct point tar)
{
    struct vector2D rtn;
    rtn.src = src;
    rtn.tar = tar;
    rtn.x = src.x - tar.x;
    rtn.y = src.y - tar.y;
    rtn.len = sqrtf(rtn.x * rtn.x + rtn.y * rtn.y);
    return rtn;
}

float dot(struct vector2D v1, struct vector2D v2)
{   
    return v1.x * v2.x + v1.y * v1.y;
}

