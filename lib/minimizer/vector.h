
#ifndef VECTOR_H
#define VECTOR_H

typedef struct vector Vector, *VectorPointer;

struct vector
{
    double x, y, len;
    int given_coords;
};

Vector Vector_initialize(const double x, const double y);

VectorPointer Vector_create(const double x, const double y);

Vector Vector_zero();

Vector Vector_add(Vector vec1, Vector vec2);

Vector Vector_sub(Vector vec1, Vector vec2);

Vector Vector_mult(Vector vec1, Vector vec2);

Vector Vector_negate(Vector vec);

Vector Vector_scalar_mult(Vector vec, double c);

Vector Vector_scalar_add(Vector vec, double c);

double Vector_cross(Vector vec1, Vector vec2);

double Vector_dot(Vector v1, Vector v2);

double Vector_norm(Vector v);

double Vector_angle(Vector v1, Vector v2);

int Vector_parallel(Vector v1, Vector v2);

int Vector_equal(Vector v1, Vector v2);

#endif
