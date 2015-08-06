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

        *(rtn.set + i) = Vertex_create(id, pos, zv, zv, zv,
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

void VertexSet_sort(VertexPointer *vquad, Vector cross) 
{
    int i;
    for (i = 0; i < 3; i++) {
        int j;
        for (j = i + 1; j < 4; j++) {
            VertexPointer vpi = *(vquad + i);
            VertexPointer vpj = *(vquad + j);
            if (vpj->mass < vpi->mass) {
                VertexPointer tmp = vquad[i];
                vquad[i] = vquad[j];
                vquad[j] = tmp;
            } else if (vpj->mass == vpi->mass) {
                double di, dj;
                di = Vector_norm(Vector_sub(cross, vpi->pos));
                dj = Vector_norm(Vector_sub(cross, vpj->pos));
                if (dj < di) {
                    VertexPointer tmp = vquad[i];
                    vquad[i] = vquad[j];
                    vquad[j] = tmp;
                }
            }
        }
    }
}

void VertexSet_move(const VertexSet vs, const VectorPointer gradient, double x)
{
    int i;   
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = *(vs.set + i);
        Vector ds;
        ds = Vector_scalar_mult(gradient[i], x);
        Vertex_move(v, ds);
    }
}

float *VertexSet_to_array(const VertexSet vs)
{
    float *rtn = (float *) Util_allocate(vs.n * 2, sizeof(double));
    int i;
    for (i = 0; i < vs.n; i++) {
        *(rtn + i * 2) = (float) (*(vs.set + i))->pos.x;
        *(rtn + i * 2 + 1) = (float) (*(vs.set + i))->pos.y;
    }
    return rtn;

}

void VertexSet_free(VertexSet vs) 
{
    int i;
    for (i = 0; i < vs.n; i++) {
        Vertex_free(*(vs.set + i));
    }
    free(vs.set);
}


