
#ifndef VECTOR2D_H
#define VECTOR2D_H

typedef struct vector2d Vector2d, *Vector2dPtr;

struct vector2d
{
    float x, y, len;
    int given_coords;
};

Vector2d mk_vector2d(float x, float y);

Vector2d add(Vector2d vec1, Vector2d vec2);

Vector2d sub(Vector2d vec1, Vector2d vec2);

Vector2d negate(Vector2d vec);

Vector2d scalar_mult(Vector2d vec, float c);

float cross(Vector2d vec1, Vector2d vec2);

float dot(Vector2d v1, Vector2d v2);

float angle(Vector2d v1, Vector2d v2);

int parallel(Vector2d v1, Vector2d v2);

#endif
