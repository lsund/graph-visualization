
#include "math2d.h"

struct vertex {
    int id;
    struct point *pos;
    float mass;
    float radius;
    char type;
};

struct bond {
    struct vertex *fst;
    struct vertex *snd;
    float dist0;
    float k;
};

struct vertex *mk_vertex(int id, struct point *pos, float mass, float radius,
        char type);

struct bond *mk_bond(struct vertex *fst, struct vertex *snd, float dist0, 
        float k);
