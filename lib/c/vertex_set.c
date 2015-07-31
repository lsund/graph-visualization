/*****************************************************************************

* File Name: vertex_set.c

* Author: Ludvig Sundström

* Description: Represents a set of vertices

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdlib.h>

#include "constants.h"
#include "util.h"
#include "vertex_set.h"

VS VS_initialize(json_value *contents, int *nvp)
{
    json_value *vsarr = contents->u.object.values[0].value;
    *nvp = vsarr->u.array.length;

    int nv;
    nv = *nvp;

    VS rtn = (VS) malloc(sizeof(VP) * nv);

    if (rtn == NULL) {
        rt_error("Error while allocating memory: create_vertices()");
    }
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

        Vec2D pos, zv;
        zv = Vector2d_zero();
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
            pos = Vector2d_initialize(x, y);
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

        *(rtn + i) = Vertex_create(id, pos, zv, zv, zv, 
                VERTEX_BASE_WIDTH, VERTEX_BASE_HEIGHT, t, nv);
    }
    return rtn;
}

VSP VS_create(json_value *contents, int *nvp)
{
    VSP rtn;
    rtn = (VSP) malloc(sizeof(VS));
    *rtn = VS_initialize(contents, nvp);
    return rtn;
}



void VS_free(VS vps, const int nv) 
{
    int i;
    for (i = 0; i < nv; i++) {
        Vertex_free(*(vps + i));
    }
    free(vps);
}

void VS_sort(VP *vquad, Vec2D cross) 
{
    int i;
    for (i = 0; i < 3; i++) {
        int j;
        for (j = i + 1; j < 4; j++) {
            VP vpi = *(vquad + i);
            VP vpj = *(vquad + j);
            if (vpj->mass < vpi->mass) {
                VP tmp = vquad[i];
                vquad[i] = vquad[j];
                vquad[j] = tmp;
            } else if (vpj->mass == vpi->mass) {
                float di, dj;
                di = Vector2d_norm(Vector2d_sub(cross, vpi->pos));
                dj = Vector2d_norm(Vector2d_sub(cross, vpj->pos));
                if (dj < di) {
                    VP tmp = vquad[i];
                    vquad[i] = vquad[j];
                    vquad[j] = tmp;
                }
            }
        }
    }
}

void VS_move(const VP *vs, const int nv, const Vec2DP pc, 
        const Vec2DP xc, float x) 
{
    int i;   
    for (i = 0; i < nv; i++) {

        struct vertex *v = *(vs + i);

        Vec2D ds, s;
        ds = Vector2d_scalar_mult(*(xc + i), x);
        s = Vector2d_add(*(pc + i), ds);

        Vertex_move(v, s);
    }
}

