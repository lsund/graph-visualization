
#ifndef VECTOR2D_H
#define VECTOR2D_H

typedef struct vector2d
{
    float x, y, len;
    int given_coords;
} Vector2d;

Vector2d mk_vector2d(float x, float y);

Vector2d add(Vector2d vec1, Vector2d vec2);

Vector2d cross(Vector2d vec1, Vector2d vec2);

float dot(Vector2d v1, Vector2d v2);

float angle(Vector2d v1, Vector2d v2);

int parallel(Vector2d v1, Vector2d v2);

#endif
