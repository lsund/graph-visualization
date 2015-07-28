
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <math.h>

#include "constants.h"
#include "util.h"
#include "json.h"
#include "graph.h"
#include "inits.h"

static void create_vertices(Vptr **vs, json_value *contents, int *nv)
{
    json_value *vsarr = contents->u.object.values[0].value;
    *nv = vsarr->u.array.length;
    *vs = malloc(sizeof(void *) * *nv);

    if (vs == NULL) {
        rt_error("Error while allocating memory: create_vertices()");
    }
    if (*nv < 1) {
        rt_error("No vertices");
    }

    int i;
    for (i = 0; i < *nv; i++) {
        
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

        Vector2d pos, zv;
        zv = mk_vector2d(0.0, 0.0);
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
            pos = mk_vector2d(x, y);
            pos.given_coords = 1;
        } 
        else {
            if (position->type != json_null) {
                rt_error("Bad JSON data: position");
            }
        }

        float r;
        json_value *radius;
        r = -99.0;
        radius = vertex->u.object.values[2].value;
        if (radius->type == json_integer) {
            r = (float) radius->u.integer;
        } else if (radius->type == json_double) {
            r = (float) radius->u.dbl;
        } else {
            rt_error("Bad JSON data: radius");
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

        *(*vs + i) = mk_vertex(id, pos, zv, zv, zv, r, t);
    }
}

static void create_bonds(Vptr **vs, Bptr **bs, 
        json_value *contents, int *nb)
{
    int i, fstid, sndid;
    float len;
    Vptr fst, snd;
    Bptr bptr;

    json_value *bsarr = contents->u.object.values[1].value;
    *nb = bsarr->u.array.length;
    *bs = malloc(sizeof(void *) * *nb);

    if (bs == NULL) {
        rt_error("Error while allocating memory: create_bonds()");
    }

    for (i = 0; i < *nb; i++) {
        
        json_value *bond = bsarr->u.array.values[i];
        
        json_value *first = bond->u.object.values[0].value;
        json_value *second = bond->u.object.values[1].value;
        json_value *length = bond->u.object.values[2].value;

        if (first->type == json_integer && second->type == json_integer) {
            fstid = first->u.integer;
            sndid = second->u.integer;
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        if (length->type == json_integer) {
            len = (float) length->u.integer;
        } else if (length->type == json_double) {
            len = (float) length->u.dbl;
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        fst = *(*vs + fstid);
        snd = *(*vs + sndid);

        bptr = mk_bond(fst, snd, len, DEFAULT_STIFFNESS);
        *(*bs + i) = bptr;
    }
}

void process_json(const char *filename, Vptr **vs, Bptr **bs,
        int *nv, int *nb)
{
    FILE *fp;
    struct stat filestatus;
    int file_size;
    char* file_contents;
    json_char* json;
    json_value* value;

    if ( stat(filename, &filestatus) != 0) {
        char  buf[256];
        strcpy(buf, "process_json(): File not found: ");
        strcat(buf, filename);
        rt_error(buf);
    }
    file_size = filestatus.st_size;
    file_contents = (char *) malloc(filestatus.st_size);
    if ( file_contents == NULL) {
        rt_error("process_json(): Unable to allocate memory");
    }

    fp = fopen(filename, "rt");

    if (fp == NULL) {
        fclose(fp);
        free(file_contents);
        rt_error("process_json(): Unable to open file");
    }
    if ( fread(file_contents, file_size, 1, fp) != 1 ) {
        fclose(fp);
        free(file_contents);
        rt_error("process_json(): Unable to read file");
    }

    fclose(fp);

    json = (json_char*)file_contents;

    value = json_parse(json,file_size);

    if (value == NULL) {
        free(file_contents);
        json_value_free(value);
        rt_error("process_json(): Unable to parse data");
    }
    if (value->u.object.length != 2) {
        free(file_contents);
        json_value_free(value);
        rt_error("process_json(): Wrong number of keys");
    }
    if (strcmp(value->u.object.values[0].name, "vertices") != 0) {
        free(file_contents);
        json_value_free(value);
        rt_error("process_json(): First key is not vertices");
    }
    if (strcmp(value->u.object.values[1].name, "bonds") != 0) {
        free(file_contents);
        json_value_free(value);
        rt_error("process_json(): Second key is not 'bonds'");
    }
    create_vertices(vs, value, nv);
    create_bonds(vs, bs, value, nb);

    json_value_free(value);
    free(file_contents);
}

void create_graph(const char *fname, Gptr g) 
{

    g->nz = 0;
    create_zones(g);
    g->npz = 0;

    Vptr *vs; Bptr *bs;
    int nv, nb;
    vs = NULL; bs = NULL;

    process_json(fname, &vs, &bs, &nv, &nb);
    if ((float)nb > (float)nv * logf((float)nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    create_connected(g);

    g->vs = vs; g->bs = bs;
    g->nv = nv; g->nb = nb;

}

