
#ifndef VECTOR2D_H
#define VECTOR2D_H

typedef struct Vec2D Vec2D, *Vec2DP;

struct Vec2D
{
    float x, y, len;
    int given_coords;
};

Vec2D Vector2d_initialize(float x, float y);

Vec2DP Vector2d_create(float x, float y);

Vec2D Vector2d_zero();

Vec2D Vector2d_add(Vec2D vec1, Vec2D vec2);

Vec2D Vector2d_sub(Vec2D vec1, Vec2D vec2);

Vec2D Vector2d_negate(Vec2D vec);

Vec2D Vector2d_scalar_mult(Vec2D vec, float c);

float Vector2d_cross(Vec2D vec1, Vec2D vec2);

float Vector2d_dot(Vec2D v1, Vec2D v2);

float Vector2d_norm(Vec2D v);

float Vector2d_angle(Vec2D v1, Vec2D v2);

int Vector2d_parallel(Vec2D v1, Vec2D v2);

int Vector2d_equal(Vec2D v1, Vec2D v2);

#endif
