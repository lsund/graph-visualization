
#ifndef MATH2D_H
#define MATH2D_H

struct vector2d
{
    float x;
    float y;
    float len;
};

struct vector2d *mk_vector2d(float x, float y);

struct vector2d add(struct vector2d vec1, struct vector2d vec2);

float dot(struct vector2d *v1, struct vector2d *v2);

#endif
