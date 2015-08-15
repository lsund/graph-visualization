/*****************************************************************************

* File Name: vertex_set.c

* Author: Ludvig Sundström

* Description: Represents a set of vertices

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdlib.h>

#include "util.h"
#include "constants.h"
#include "vertex_set.h"

VertexSet VertexSet_initialize(json_value *contents, int *nvp)
{
    json_value *vsarr = contents->u.object.values[0].value;
    *nvp = vsarr->u.array.length;

    int nv;
    nv = *nvp;

    VertexSet rtn;
    rtn.set = (VertexPointer *) Util_allocate(nv, sizeof(VertexPointer));
    rtn.n = nv;

    if (nv < 1) {
        Util_runtime_error("No vertices");
    }

    int i;
    for (i = 0; i < nv; i++) {
        
        json_value *vertex;  
        vertex = vsarr->u.array.values[i];

        json_value *ident;
        int id;
        id = -99;
        ident = vertex->u.object.values[0].value;
        if (ident->type == json_integer) {
            id = ident->u.integer;
        } else {
            Util_runtime_error("Bad JSON data: ident");
        }

        Vector pos, zv;
        zv = Vector_zero();
        pos = zv;    
        json_value *position;
        position = vertex->u.object.values[1].value;
        if (position->type == json_array) {
            int length;
            double x, y;
            x = y = 0;
            length = position->u.array.length;
            if (length != 2) {
                Util_runtime_error("Bad JSON data, position dimension not 2");
            }
            json_value *j_x = position->u.array.values[0];
            json_value *j_y = position->u.array.values[1];
            if (j_x->type == json_integer) {
                x = (double) j_x->u.integer;
            } else if (j_x->type == json_double) {
                x = (double) j_x->u.dbl;
            } else {
                Util_runtime_error("Bad JSON data: position: x");
            }
            if (j_y->type == json_integer) {
                y = (double) j_y->u.integer;
            } else if (j_x->type == json_double) {
                y = (double) j_y->u.dbl;
            } else {
                Util_runtime_error("Bad JSON data: position: y");
            }
            pos = Vector_initialize(x, y);
            pos.given_coords = 1;
        } 
        else {
            if (position->type != json_null) {
                Util_runtime_error("Bad JSON data: position");
            }
        }

        char t;
        t = 0;
        json_value *vertex_type;
        vertex_type = vertex->u.object.values[3].value;
        if (vertex_type->type == json_string) {
            t = vertex_type ->u.string.ptr[0];
        } else {
            Util_runtime_error("Bad JSON data: type");
        }

        *(rtn.set + i) = Vertex_create(id, pos,
                VERTEX_BASE_WIDTH, VERTEX_BASE_HEIGHT, t, nv);
    }
    return rtn;
}

VertexSetPointer VertexSet_create(json_value *contents, int *nvp)
{
    VertexSetPointer rtn;
    rtn = (VertexSetPointer) malloc(sizeof(VertexSet));
    *rtn = VertexSet_initialize(contents, nvp);
    return rtn;
}

VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i)
{
    return *(vs.set + i);
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
        const int n,
        const double gam, 
        const Strategy strat
    )
{
    assert(n > 0 && n <= MAX_NV); 
    assert(strat == INITIALIZE || strat == UPDATE);
    
    int i;
    for (i = 0; i < n; i++) {
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
        const int n,
        double *gg, 
        double *dgg
    )
{
    assert(n > 0 && n <= MAX_NV);
    assert(Util_is_zero(*gg) && Util_is_zero(*dgg));

    int i;
    for (i = 0; i < n; i++) {
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

void VertexSet_free(VertexSet vs) 
{
    int i;
    for (i = 0; i < vs.n; i++) {
        Vertex_free(VertexSet_get_vertex(vs, i));
    }
    free(vs.set);
}


