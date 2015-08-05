
#ifndef VECTOR_H
#define VECTOR_H

typedef struct vector Vector, *VectorPointer;

struct vector
{
    float x, y, len;
    int given_coords;
};

Vector Vector_initialize(const float x, const float y);

VectorPointer Vector_create(const float x, const float y);

Vector Vector_zero();

Vector Vector_add(Vector vec1, Vector vec2);

Vector Vector_sub(Vector vec1, Vector vec2);

Vector Vector_mult(Vector vec1, Vector vec2);

Vector Vector_negate(Vector vec);

Vector Vector_scalar_mult(Vector vec, float c);

Vector Vector_scalar_add(Vector vec, float c);

float Vector_cross(Vector vec1, Vector vec2);

float Vector_dot(Vector v1, Vector v2);

float Vector_norm(Vector v);

float Vector_angle(Vector v1, Vector v2);

int Vector_parallel(Vector v1, Vector v2);

int Vector_equal(Vector v1, Vector v2);

#endif
