
#ifndef GRAPH_H 
#define GRAPH_H

#include "math2d.h"

/// Fixed && not Fixed
// derivatives

struct vertex {
    int id;
    int conn;
    struct vector2d *pos;
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

struct vertex *mk_vertex(int id, int conn, struct vector2d *pos, float mass, 
    float radius, char type);

struct bond *mk_bond(struct vertex *fst, struct vertex *snd, float dist0, 
        float k);

#endif
