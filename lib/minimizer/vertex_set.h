
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

VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i);

void VertexSet_store_gradient(const VertexSet vs);

/**
 * Move all members along their stored gradient proportional to x 
 */
void VertexSet_move(const VertexSet vs, double x);

/**
 * Increase all members gradient proportional to x 
 */ 
void VertexSet_boost(const VertexSet vs, const double x);

float *VertexSet_to_array(const VertexSet vs);


void VertexSet_create_sequences(
        const VertexSet vs,
        const int n,
        const double gam, 
        const Strategy strat
    );

void VertexSet_calculate_score(
        const VertexSet vs,
        const int n,
        double *gg, 
        double *dgg
    );

void VertexSet_free(VertexSet vs);

#endif

