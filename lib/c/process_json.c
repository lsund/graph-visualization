
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>

#include "constants.h"
#include "util.h"
#include "json.h"

void process_json(const char *filename, struct vertex **vs, struct bond **bs,
        struct point **ps, int *nv, int *nb)
{
    FILE *fp;
    struct stat filestatus;
    int file_size;
    char* file_contents;
    json_char* json;
    json_value* value;

    int i, id, fstid, sndid;
    float m, r, len;
    char t;
    struct vertex *fst, *snd;
    struct bond *bptr;

    if ( stat(filename, &filestatus) != 0) {
        rt_error("process_json(): File not found");
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
        rt_error("process_json(): Unable to parse data");
    }

    json_value *vsarr = value->u.object.values[0].value;
    *nv = vsarr->u.array.length;

    for (i = 0; i < *nv; i++) {
        
        json_value *vertex = vsarr->u.array.values[i];
        
        json_value *ident = vertex->u.object.values[0].value;
        json_value *mass = vertex->u.object.values[1].value;
        json_value *radius = vertex->u.object.values[2].value;
        json_value *vertex_type = vertex->u.object.values[3].value;

        if (mass->type == json_integer) {
            m = (float) mass->u.integer;
        } else if (mass->type == json_double) {
            m = (float) mass->u.dbl;
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        if (radius->type == json_integer) {
            r = (float) radius->u.integer;
        } else if (radius->type == json_double) {
            r = (float) radius->u.dbl;
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        if (vertex_type->type == json_string) {
            t = vertex_type ->u.string.ptr[0];
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        if (ident->type == json_integer) {
            id = ident->u.integer;
        } else {
            fprintf(stderr, "Bad JSON data\n");
        }

        *(vs + i) = mk_vertex(id, *(ps + i), m, r, t);
    }

    json_value *bsarr = value->u.object.values[1].value;

    *nb = bsarr->u.array.length;

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

        fst = *(vs + fstid);
        snd = *(vs + sndid);

        bptr = mk_bond(fst, snd, len, DEFAULT_STIFFNESS);
        *(bs + i) = bptr;
    }
    json_value_free(value);
    free(file_contents);
}

