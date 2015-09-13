
#ifndef VECTOR_H
#define VECTOR_H

// A vector is a measure of direction and length in 2D-space. It is represented
// as thee values: (x, y) for the x and y coordinates the vector is pointind at
// and (len) for its length. The root of a vector is at origo (0, 0)
typedef struct vector Vector, *VectorPointer;

struct vector
{
    double x, y, len;
};

// The vector pointing at (x, y)
Vector Vector_initialize(const double x, const double y);

// The pointer to the vector pointing at (x, y)
VectorPointer Vector_create(const double x, const double y);

// The vector pointing at (0, 0)
Vector Vector_zero();

// The resulting vector from the summation of vectors vec0, vec1
Vector Vector_add(Vector vec0, Vector vec1);

// The resulting vector from the negation of vectors vec0, vec1
Vector Vector_sub(Vector vec0, Vector vec1);

// The resulting vector from the multiplication of vectors vec0, vec1
Vector Vector_mult(Vector vec0, Vector vec1);

// The resulting vector from the negation of vector vec
Vector Vector_negate(Vector vec);

// The resulting vector from the element-wise multiplication of vector vec and
// scalar c
Vector Vector_scalar_mult(Vector vec, double c);

// The resulting vector from the element-wise addition of vector vec and scalar
// c
Vector Vector_scalar_add(Vector vec, double c);

// The dot product of vectors vec0, vec1
double Vector_dot(Vector vec0, Vector vec1);

// The norm (length) of vector v
double Vector_norm(Vector v);

// The angle between vectors vec0, vec1
double Vector_angle(Vector vec0, Vector vec1);

// 1 if vectors vec0, vec1 are parallel, 0 otherwise
int Vector_parallel(Vector vec0, Vector vec1);

// 1 if vectors vec0, vec1 are equal 0 otherwise
int Vector_equal(Vector vec0, Vector vec1);

#endif
