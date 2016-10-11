
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

enum ParseStatus { PS_NO_PARSE, PS_FIELD_NUM_ERR, PS_VERTEX_NAME_ERR, PS_BOND_NAME_ERR, PS_SUCCESS };
enum FileStatus { FS_FILE_NOT_FOUND, FS_NO_MEMORY, FS_NO_OPEN, FS_SUCCESS };

static void parse_vertex_data(
        json_value *vertex, 
        int *o_id,
        VectorPointer o_pos,
        char *o_label,
        int *o_fixed
    )
{
        unsigned int fields = vertex->u.object.length; 
        if (fields != 3)  {
            Util_runtime_error("Each vertex specified in the input file needs to have exactly 3 fields");
        }
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

        json_value *position;
        position = vertex->u.object.values[1].value;
        int fixed = 0;
        Vector pos;
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
            pos = Vector_initialize(fixed_x, fixed_y);
        } 
        else {
            if (position->type != json_null) {
                Util_runtime_error("Bad JSON data: position");
            }
            pos = Vector_zero();
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
}

static void parse_bond_data(
        VertexSet vs,
        json_value *bond, 
        VertexPointer *o_fst,
        VertexPointer *o_snd,
        double *o_len
    )
{
        unsigned int fields = bond->u.object.length; 
        if (fields != 3)  {
            Util_runtime_error("Each bond specified in the input file needs to have exactly 3 fields");
        }
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

    double next_base2_power;
    next_base2_power = ceil(log2(vsarr->u.array.length));
    double padding;
    padding = 1 / next_base2_power;

    int i;
    for (i = 0; i < nv; i++) {
        json_value *vertex;  
        vertex = vsarr->u.array.values[i];
        int id, fixed;
        Vector pos;
        char *label;

        label = Util_allocate(MAX_LABEL_LENGTH, sizeof(label));
        parse_vertex_data(vertex, &id, &pos, label, &fixed);

        if (id > nv - 1) {
            Util_runtime_error("Cant assign a vertex ID larger than the number of verticiies - 1");
        } else if (id < 0) {
            Util_runtime_error("Cant assign a negative vertex ID");
        }
        
        VertexPointer v = Vertex_create(id, pos, padding, label, fixed);
        VertexSet_update_vertex(vs, id, v);
    }
    if (!VertexSet_unique_ids(vs)) {
        Util_runtime_error("Verticies must have unique id's");
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

enum ParseStatus check_json(json_value *value)
{
    if (value == NULL) {
        return PS_NO_PARSE;
    } else if (value->u.object.length != 2) {
        return PS_FIELD_NUM_ERR;
    } else if (strcmp(value->u.object.values[0].name, "vertices") != 0) {
        return PS_VERTEX_NAME_ERR;
    } else if (strcmp(value->u.object.values[1].name, "bonds") != 0) {
        return PS_BOND_NAME_ERR;
    } else {
        return PS_SUCCESS;
    }
}


enum FileStatus load_json(const char *fname, json_value **o_value)
{
    struct stat filestatus;
    if (stat(fname, &filestatus) != 0) {
        return FS_FILE_NOT_FOUND;
    }

    char *file_contents;
    file_contents = (char *) malloc(filestatus.st_size);
    if (file_contents == NULL) {
        return FS_NO_MEMORY;
    }

    int file_size;
    file_size = filestatus.st_size;
    FILE *fp;
    fp = fopen(fname, "rt");
    int read_success;
    read_success = fread(file_contents, file_size, 1, fp);
    if (read_success != 1 || fp == NULL) {
        fclose(fp);
        free(file_contents);
        return FS_NO_OPEN;
    } else {
        fclose(fp);
    }

    json_char* json_contents;
    json_contents = (json_char*) file_contents;
    *o_value = json_parse(json_contents, file_size);

    free(file_contents);
    return FS_SUCCESS;
}

Pair json_to_vb_pair(const char *fname)
{
    json_value* value;
    value = NULL;
    char buf[256];
    switch (load_json(fname, &value)) {
        case FS_FILE_NOT_FOUND:
            strcpy(buf, "process_json(): File not found: ");
            strcat(buf, fname);
            Util_runtime_error(buf);
            break;
        case FS_NO_MEMORY:
            Util_runtime_error("process_json(): Unable to allocate memory for file");
            break;
        case FS_NO_OPEN:
            Util_runtime_error("process_json(): Unable to open file");
            break;
        case FS_SUCCESS:
            break;
    }

    switch (check_json(value)) {
        case PS_NO_PARSE:
            json_value_free(value);
            Util_runtime_error("process_json(): Unable to parse data");
            break;
        case PS_FIELD_NUM_ERR:
            json_value_free(value);
            Util_runtime_error("process_json(): Json object needs to have exactly two fields");
            break;
        case PS_VERTEX_NAME_ERR:
            json_value_free(value);
            Util_runtime_error("process_json(): First field must be named 'vertices'");
            break;
        case PS_BOND_NAME_ERR:
            json_value_free(value);
            Util_runtime_error("process_json(): second field must be named 'bonds'");
            break;
        case PS_SUCCESS:
            break;
    }

    int nv, nb;
    VertexSetPointer vs; BondSetPointer bs;
    vs = vertexset_from_json(value, &nv);
    bs = bondset_from_json(*vs, value, &nb);

    json_value_free(value);

    return Pair_initialize(vs, bs);
}

