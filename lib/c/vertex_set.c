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
        rt_error("No vertices");
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
            rt_error("Bad JSON data: ident");
        }

        Vector pos, zv;
        zv = Vector_zero();
        pos = zv;    
        json_value *position;
        position = vertex->u.object.values[1].value;
        if (position->type == json_array) {
            int length;
            float x, y;
            x = y = 0;
            length = position->u.array.length;
            if (length != 2) {
                rt_error("Bad JSON data, position dimension not 2");
            }
            json_value *j_x = position->u.array.values[0];
            json_value *j_y = position->u.array.values[1];
            if (j_x->type == json_integer) {
                x = (float) j_x->u.integer;
            } else if (j_x->type == json_double) {
                x = (float) j_x->u.dbl;
            } else {
                rt_error("Bad JSON data: position: x");
            }
            if (j_y->type == json_integer) {
                y = (float) j_y->u.integer;
            } else if (j_x->type == json_double) {
                y = (float) j_y->u.dbl;
            } else {
                rt_error("Bad JSON data: position: y");
            }
            pos = Vector_initialize(x, y);
            pos.given_coords = 1;
        } 
        else {
            if (position->type != json_null) {
                rt_error("Bad JSON data: position");
            }
        }

        char t;
        t = 0;
        json_value *vertex_type;
        vertex_type = vertex->u.object.values[3].value;
        if (vertex_type->type == json_string) {
            t = vertex_type ->u.string.ptr[0];
        } else {
            rt_error("Bad JSON data: type");
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
                float di, dj;
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

void VertexSet_move(const VertexSet vs, float x) 
{
    int i;   
    for (i = 0; i < vs.n; i++) {

        struct vertex *v = *(vs.set + i);

        Vector ds, s;
        ds = Vector_scalar_mult(v->grad0, x);
        s = Vector_add(v->pos0, ds);

        Vertex_move(v, s);
    }
}

void VertexSet_apply_forces(
        const VertexSet vs, 
        const float gam, 
        const Strategy strat
    )
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer vp = *(vs.set + i);
        vp->g.x = -vp->grad.x;
        vp->g.y = -vp->grad.y;
        if (strat == INITIALIZE) {
            vp->grad.x = vp->h.x = vp->g.x;
            vp->grad.y = vp->h.y = vp->g.y;
        } else {
            vp->grad.x = vp->h.x = vp->g.x + gam * vp->h.x;
            vp->grad.y = vp->h.y = vp->g.y + gam * vp->h.y;
        }
    }
}

void VertexSet_apply_forces_scalar(const VertexSet vs, float x)
{
    int i;
    for (i = 0; i < vs.n; i++) { 
        VertexPointer vp = *(vs.set + i);
        vp->grad.x *= x;
        vp->grad.y *= x;
    }   
}


void VertexSet_calculate_score( const VertexSet vs, float *gg, float *dgg)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer vp = *(vs.set + i);
        *gg += vp->g.x * vp->g.x;
        *gg += vp->g.y * vp->g.y;
        *dgg += (vp->grad.x + vp->g.x) * vp->grad.x;
        *dgg += (vp->grad.y + vp->g.y) * vp->grad.y;
    }
}

void VertexSet_set_statics(const VertexSet vs)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer vp;
        vp = *(vs.set + i);
        vp->pos0 = vp->pos;
        vp->grad0 = vp->grad;
    }
}

float *VertexSet_to_array(const VertexSet vs)
{
    float *rtn = (float *) Util_allocate(vs.n * 2, sizeof(float));
    int i;
    for (i = 0; i < vs.n; i++) {
        *(rtn + i * 2) = (*(vs.set + i))->pos.x;
        *(rtn + i * 2 + 1) = (*(vs.set + i))->pos.y;
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


