
#ifndef VERTEX_SET_H
#define VERTEX_SET_H

#include "json.h"
#include "vertex.h"
#include "util.h"

typedef struct vertexset VertexSet, *VertexSetPointer;

struct vertexset {
    VertexPointer *set;
    int n;
};

VertexSetPointer VertexSet_create(json_value *contents, int *nvp);

VertexSet VertexSet_initialize(json_value *contents, int *nvp);

void VertexSet_sort(VertexPointer *vquad, Vector cross);

float *VertexSet_to_array(const VertexSet vs);

void VertexSet_free(VertexSet vs);

#endif

