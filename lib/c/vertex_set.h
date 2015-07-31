
#ifndef VERTEX_SET_H
#define VERTEX_SET_H

#include "json.h"
#include "vertex.h"

typedef VP *VS, **VSP;

VSP VS_create(json_value *contents, int *nvp);

VS VS_initialize(json_value *contents, int *nvp);

void VS_sort(VP *vquad, Vec2D cross);

void VS_free(VS vs, int nv);

void VS_move(const VP *vs, const int nv, const Vec2DP pc, 
        const Vec2DP xc, float x);

#endif
