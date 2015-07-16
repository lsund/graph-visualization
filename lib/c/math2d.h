
#ifndef MATH2D_H
#define MATH2D_H

typedef struct vector2d
{
    float x;
    float y;
    float len;
} Vector2d;

Vector2d mk_vector2d(float x, float y);

Vector2d add(Vector2d vec1, Vector2d vec2);

float dot(Vector2d v1, Vector2d v2);

#endif
