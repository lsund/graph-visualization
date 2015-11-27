
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <math.h>

#include "constants.h"
#include "util.h"
#include "json.h"
#include "vertex_set.h"
#include "bond_set.h"
#include "pair.h"

static void parse_vertex_data(
        json_value *vertex, 
        int *o_id,
        VectorPointer o_pos,
        char *o_label,
        char *o_type,
        int *o_fixed
    )
{
        json_value *ident;
        int id;
        id = -99;
        ident = vertex->u.object.values[0].value;
        if (ident->type == json_integer) {
            id = ident->u.integer;
        } else {
            Util_runtime_error("Bad JSON data: ident");
        }
        *o_id = id;

        Vector pos, zv;
        zv = Vector_zero();
        json_value *position;
        position = vertex->u.object.values[1].value;
        int fixed = 0;
        if (position->type == json_array) {
            fixed = 1; 
            int length;
            length = position->u.array.length;
            if (length != 2) {
                Util_runtime_error("Bad JSON data, position dimension not 2");
            }
            json_value *j_x = position->u.array.values[0];
            json_value *j_y = position->u.array.values[1];
            double fixed_x, fixed_y;
            fixed_x = fixed_y = 0;
            if (j_x->type == json_double && Util_in_range(0, 1, (double) j_x->u.dbl)) {
                fixed_x = (double) j_x->u.dbl;
            } else {
                Util_runtime_error("Bad JSON data: position: x");
            }
            if (j_y->type == json_double && Util_in_range(0, 1, (double) j_y->u.dbl)) {
                fixed_y = (double) j_y->u.dbl;
            } else {
                Util_runtime_error("Bad JSON data: position: y");
            }
            printf(" pos: %f %f\n", fixed_x, fixed_y);
            pos = Vector_initialize(fixed_x, fixed_y);
        } 
        else {
            pos = zv;
            if (position->type != json_null) {
                Util_runtime_error("Bad JSON data: position");
            }
        }
        *o_pos = pos;
        *o_fixed = fixed;
        
        char vertex_label[MAX_LABEL_LENGTH];
        json_value *label;
        label = vertex->u.object.values[2].value;
        if (label->type == json_string) {
            strcpy(vertex_label, label->u.string.ptr);
        } else if (label->type == json_null) {
            vertex_label[0] = 0;
        } else {
            Util_runtime_error("Bad JSON data: label");
        }
        strcpy(o_label, vertex_label);

        char t;
        t = 0;
        json_value *vertex_type;
        vertex_type = vertex->u.object.values[3].value;
        if (vertex_type->type == json_string) {
            t = vertex_type->u.string.ptr[0];
        } else {
            Util_runtime_error("Bad JSON data: type");
        }
        *o_type = t;
}

static void parse_bond_data(
        VertexSet vs,
        json_value *bond, 
        VertexPointer *o_fst,
        VertexPointer *o_snd,
        double *o_len
    )
{
        json_value *first = bond->u.object.values[0].value;
        json_value *second = bond->u.object.values[1].value;
        json_value *length = bond->u.object.values[2].value;
        
        int fstid, sndid;
        fstid = sndid = 0;
        if (first->type == json_integer && second->type == json_integer) {
            fstid = first->u.integer;
            sndid = second->u.integer;
        } else {
            Util_runtime_error("Bad JSON data");
        }
        *o_fst = VertexSet_get_vertex(vs, fstid);
        *o_snd = VertexSet_get_vertex(vs, sndid);

        double len;
        len = 0;
        if (length->type == json_integer) {
            len = (double) length->u.integer;
        } else if (length->type == json_double) {
            len = (double) length->u.dbl;
        } else {
            Util_runtime_error("Bad JSON data\n");
        }
        *o_len = len;

}

static void populate_vertexset(VertexSet vs, json_value *contents, int *nvp)
{
    int nv = *nvp;
    json_value *vsarr = contents->u.object.values[0].value;

    if (nv < 1) {
        Util_runtime_error("No vertices");
    }

    int i;
    for (i = 0; i < nv; i++) {
        
        json_value *vertex;  
        vertex = vsarr->u.array.values[i];
        
        int id, fixed;
        Vector pos;
        char *label;
        char t;
        label = Util_allocate(MAX_LABEL_LENGTH, sizeof(label));
        parse_vertex_data(vertex, &id, &pos, label, &t, &fixed);

        VertexSet_update_vertex(
                vs, 
                i, 
                Vertex_create(id, pos, label, t, fixed)
            );
    }
}

static void populate_bondset(BondSet bs, VertexSet vs, json_value *contents, int nb)
{
    json_value *bsarr = contents->u.object.values[1].value;
    
    int i;
    for (i = 0; i < nb; i++) {
        json_value *bond_value = bsarr->u.array.values[i];
        
        double len; 
        VertexPointer fst, snd;
        parse_bond_data(vs, bond_value, &fst, &snd, &len); 
        BondPointer bp;
        bp = Bond_create(fst, snd, len);
        fst->mass++;
        snd->mass++;
        *(bs.set + i) = bp;
    }
        
}


VertexSetPointer vertexset_from_json(json_value *contents, int *nvp)
{
    json_value *vsarr = contents->u.object.values[0].value;
    *nvp = vsarr->u.array.length;

    int nv;
    nv = *nvp;
    
    VertexSetPointer rtn;
    rtn = (VertexSetPointer) Util_allocate(1, sizeof(VertexSet));
    
    *rtn = VertexSet_initialize(nv);
    populate_vertexset(*rtn, contents, nvp);

    return rtn;
}

BondSetPointer bondset_from_json(VertexSet vs, json_value *contents, int *nbp)
{
    json_value *bsarr = contents->u.object.values[1].value;
    *nbp = bsarr->u.array.length;

    int nb;
    nb = *nbp;
    
    BondSetPointer rtn;
    rtn = (BondSetPointer) Util_allocate(1, sizeof(BondSet));
    
    *rtn = BondSet_initialize(nb);
    populate_bondset(*rtn, vs, contents, nb);
    
    return rtn;
}

Pair process_json(const char *filename)
{
    FILE *fp;
    struct stat filestatus;
    int file_size;
    char* file_contents;
    json_char* json;

    if ( stat(filename, &filestatus) != 0) {
        char  buf[256];
        strcpy(buf, "process_json(): File not found: ");
        strcat(buf, filename);
        Util_runtime_error(buf);
    }
    file_size = filestatus.st_size;
    file_contents = (char *) malloc(filestatus.st_size);
    if ( file_contents == NULL) {
        Util_runtime_error("process_json(): Unable to allocate memory");
    }

    fp = fopen(filename, "rt");

    if (fp == NULL) {
        fclose(fp);
        free(file_contents);
        Util_runtime_error("process_json(): Unable to open file");
    }
    if ( fread(file_contents, file_size, 1, fp) != 1 ) {
        fclose(fp);
        free(file_contents);
        Util_runtime_error("process_json(): Unable to read file");
    }

    fclose(fp);

    json = (json_char*)file_contents;

    json_value* value;
    value = NULL;
    value = json_parse(json,file_size);

    if (value == NULL) {
        free(file_contents);
        json_value_free(value);
        printf("Error in file: %s\n", filename);
        Util_runtime_error("process_json(): Unable to parse data");
    }
    if (value->u.object.length != 2) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): Wrong number of keys");
    }
    if (strcmp(value->u.object.values[0].name, "vertices") != 0) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): First key is not vertices");
    }
    if (strcmp(value->u.object.values[1].name, "bonds") != 0) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): Second key is not 'bonds'");
    }

    int nv, nb;
    VertexSetPointer vs; BondSetPointer bs;
    vs = vertexset_from_json(value, &nv);
    bs = bondset_from_json(*vs, value, &nb);

    json_value_free(value);
    free(file_contents);

    return Pair_initialize(vs, bs);
}

