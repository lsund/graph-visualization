
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

void VertexSet_move(const VertexSet vs, float x);

void VertexSet_apply_forces(
        const VertexSet vs, 
        float gam, 
        Strategy strat 
    );

void VertexSet_apply_forces_scalar(const VertexSet vs, float x);

void VertexSet_calculate_score( const VertexSet vs, float *gg, float *dgg);

void VertexSet_set_statics(const VertexSet vs);

float *VertexSet_to_array(const VertexSet vs);

void VertexSet_free(VertexSet vs);

#endif
