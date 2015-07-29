
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

int equal(float tar, float x);

int about(float tar, float x);

int in_range(float lower, float upper, float x);

void check_range(float *x, float lower, float upper);

float max(float *x, int len);

char intersection(float p0_x, float p0_y, float p1_x, float p1_y, 
    float p2_x, float p2_y, float p3_x, float p3_y, float *i_x, float *i_y);

void rt_error(char []);

float *vector(long n);

struct vector2d **arrtop(float arr[], int n);

#endif
