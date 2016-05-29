/*****************************************************************************

* File Name: vertex_set.c

* Author: Ludvig Sundström

* Description: Represents a set of vertices

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "string.h"
#include "constants.h"
#include "vertex_set.h"

void VertexSet_update_vertex(const VertexSet vs, const int i, const VertexPointer v)
{
    *(vs.set + i) = v;
}

VertexSet VertexSet_initialize(int nv)
{
    VertexSet rtn;
    rtn.set = (VertexPointer *) Util_allocate(nv, sizeof(VertexPointer));
    rtn.n = nv;

    return rtn;
}

VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i)
{
    return *(vs.set + i);
}

VertexSet VertexSet_copy(const VertexSet vs)
{
    VertexSet rtn;
    rtn = VertexSet_initialize(vs.n);

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer current = VertexSet_get_vertex(vs, i);
        VertexPointer copy = Vertex_copy_pointer(current);
        VertexSet_update_vertex(rtn, i, copy);
    }

    return rtn;
}

VectorPointer VertexSet_positions(const VertexSet vs)
{
    VectorPointer rtn;
    rtn = Util_allocate(vs.n, sizeof(Vector));

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer current;
        current = VertexSet_get_vertex(vs, i);
        *(rtn + i) = current->pos;
    }

    return rtn;
}

void VertexSet_store_gradient(const VertexSet vs)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        v->pos0 = v->pos;
        v->grad0 = v->gradient;
        v->gradient = Vector_zero();
    }
}

void VertexSet_move(const VertexSet vs, const double x)
{
    int i;   
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);

        Vector ds;
        ds = Vector_scalar_mult(v->grad0, x);

        Vertex_move(v, ds);
    }
}
    
void VertexSet_boost(const VertexSet vs, const double x)
{
    int i;    
    for (i = 0; i < vs.n; i++) { 
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        Vector_scalar_mult(v->gradient, x);
    }   
}

void VertexSet_create_sequences(
        const VertexSet vs,
        const double gam, 
        const Strategy strat
    )
{
    assert(vs.n > 0 && vs.n <= MAX_NV); 
    assert(strat == INITIALIZE || strat == UPDATE);
    
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = VertexSet_get_vertex(vs, i);
        v->g = Vector_negate(v->gradient);
        if (strat == INITIALIZE) {
            v->gradient = v->h = v->g;

        } else {
            Vector h_gam, g_h_gam;
            h_gam = Vector_scalar_mult(v->h, gam);
            g_h_gam = Vector_add(v->g, h_gam);

            v->gradient = v->h = g_h_gam;
        }
    }
}

void VertexSet_calculate_score(
        const VertexSet vs,
        double *gg, 
        double *dgg
    )
{
    assert(vs.n > 0 && vs.n <= MAX_NV);
    assert(Util_is_zero(*gg) && Util_is_zero(*dgg));

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = VertexSet_get_vertex(vs, i);
        *gg += Vector_dot(v->g, v->g);
        *dgg += Vector_dot(Vector_add(v->gradient, v->g), v->gradient);
    }
}

float *VertexSet_to_array(const VertexSet vs)
{
    float *rtn = (float *) Util_allocate(vs.n * 2, sizeof(double));
    int i;
    for (i = 0; i < vs.n; i++) {
        *(rtn + i * 2) = (float) (VertexSet_get_vertex(vs, i))->pos.x;
        *(rtn + i * 2 + 1) = (float) (VertexSet_get_vertex(vs, i))->pos.y;
    }
    return rtn;

}

void VertexSet_print(VertexSet vs)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = VertexSet_get_vertex(vs, i);
        Vertex_print(v);
    }
    printf("\n");
}

void VertexSet_free(VertexSet vs) 
{
    int i;
    for (i = 0; i < vs.n; i++) {
        Vertex_free(VertexSet_get_vertex(vs, i));
    }
    free(vs.set);
}

