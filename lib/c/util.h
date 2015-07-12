
#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

#include "graph.h"

void rt_error(char []);

float *vector(long n);

struct point *arrtop(float arr[], int n);


void free_vertices(struct vertex **vs, int nv);

void free_bonds(struct bond **bs, int nb);

void print_vertex(struct vertex);
void print_bond(struct bond);
