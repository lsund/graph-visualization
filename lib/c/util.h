
#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

typedef enum { INITIALIZE, UPDATE } Strategy;

int equal(const float tar, const float x);

int about(const float tar, const float x);

int in_range(const float lower, const float upper, const float x);

void check_range(const float *x, const float lower, const float upper);

const float max(const float *x, int len);

void rt_error(char []);

void *Util_allocate_initialize(int nmemb, int size);

void *Util_allocate(int nmemb, int size);

#endif
