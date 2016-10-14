
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <math.h>

#include "parse_json.h"
#include "constants.h"
#include "util.h"
#include "json.h"
#include "vertex_set.h"
#include "bond_set.h"
#include "pair.h"

static ParseResult parse_vertex_data(
        json_value *vertex, 
        int *o_id,
        VectorPointer o_pos,
        char *o_label,
        int *o_fixed
    )
{
        ParseResult result;
        unsigned int fields = vertex->u.object.length; 
        if (fields != 3)  {
            result.status = PS_VALUE_LENGTH_ERR;
            result.emsg = "Each vertex specified in the input file needs to have exactly 3 fields";
            return result;
        }

        char *fst_fieldname, *snd_fieldname, *thrd_fieldname;
        json_value *ident, *position, *label;
        fst_fieldname  = vertex->u.object.values[0].name;
        snd_fieldname  = vertex->u.object.values[1].name;
        thrd_fieldname = vertex->u.object.values[2].name;
        ident          = vertex->u.object.values[0].value;
        position       = vertex->u.object.values[1].value;
        label          = vertex->u.object.values[2].value;

        if (strcmp(fst_fieldname, "id")) {
            result.status = PS_NAME_SPELL_ERR;
            result.emsg = "First field of a vertex needs to be named 'id'"; 
            return result;
        } else if (strcmp(snd_fieldname, "fixed")) {
            result.status = PS_NAME_SPELL_ERR;
            result.emsg = "Second field of a vertex needs to be named 'fixed'"; 
            return result;
        } else if (strcmp(thrd_fieldname, "label")) {
            result.status = PS_NAME_SPELL_ERR;
            result.emsg = "Third field of a vertex needs to be named 'label'"; 
            return result;
        }

        int id, fixed;
        id = -99;

        if (ident->type == json_integer) {
            id = ident->u.integer;
        } else {
            result.status = PS_VALUE_TYPE_ERROR;
            result.emsg = "Field id does not have an integer as value"; 
            return result;
        }

        *o_id = id;
        fixed = 0;
        Vector pos;
        pos = Vector_zero();

        if (position->type == json_array) {
            fixed = 1; 
            int length;
            length = position->u.array.length;

            if (length != 2) {
                result.status = PS_VALUE_LENGTH_ERR;
                result.emsg = "Position coordinates != 2"; 
                return result;
            }

            json_value *j_x, *j_y;
            j_x = position->u.array.values[0];
            j_y = position->u.array.values[1];

            double fixed_x, fixed_y;
            fixed_x = fixed_y = 0;

            if (j_x->type == json_double) {
                if (Util_in_range(0, 1, (double) j_x->u.dbl)) {
                    fixed_x = (double) j_x->u.dbl;
                } else {
                    result.status = PS_VALUE_RANGE_ERROR;
                    result.emsg = "X-coordinate must lie in range (0, 1)";
                    return result;
                }
            } else {
                result.status = PS_VALUE_TYPE_ERROR;
                result.emsg = "X-coordinate be of type double";
                return result;
            }

            if (j_y->type == json_double) {
                if (Util_in_range(0, 1, (double) j_y->u.dbl)) {
                    fixed_y = (double) j_y->u.dbl;
                } else {
                    result.status = PS_VALUE_RANGE_ERROR;
                    result.emsg = "Y-coordinate must lie in range (0, 1)";
                    return result;
                }
            } else {
                result.status = PS_VALUE_TYPE_ERROR;
                result.emsg = "Y-coordinate be of type double";
                return result;
            }

            pos = Vector_initialize(fixed_x, fixed_y);
        } else if (position->type != json_null) {
            result.status = PS_VALUE_TYPE_ERROR;
            result.emsg = "The value fixed must be an array with 2 elements or null";
            return result;
        }

        *o_pos = pos;
        *o_fixed = fixed;

        char vertex_label[MAX_LABEL_LENGTH];

        if (label->type == json_string) {
            strcpy(vertex_label, label->u.string.ptr);
        } else if (label->type == json_null) {
            vertex_label[0] = 0;
        } else {
            result.status = PS_VALUE_TYPE_ERROR;
            result.emsg = "Label must be of type string";
            return result;
        }

        strcpy(o_label, vertex_label);
        result.status = PS_SUCCESS;
        result.emsg = NULL; 
        return result; 
}

static ParseResult parse_bond_data(
        VertexSet vs,
        json_value *bond, 
        VertexPointer *o_fst,
        VertexPointer *o_snd,
        double *o_len
    )
{
    ParseResult result; 
    unsigned int fields = bond->u.object.length; 
    if (fields != 3)  {
        result.status = PS_VALUE_LENGTH_ERR;
        result.emsg = "Each bond object needs to have exactly 3 fields";
        return result;
    }
    json_value *fst_value, *snd_value, *len_value;
    fst_value = bond->u.object.values[0].value;
    snd_value = bond->u.object.values[1].value;
    len_value = bond->u.object.values[2].value;
    
    char *fst_name, *snd_name, *thrd_name;
    fst_name  = bond->u.object.values[0].name;
    snd_name  = bond->u.object.values[1].name;
    thrd_name = bond->u.object.values[2].name;

    if (strcmp(fst_name, "fst")) {
        result.status = PS_NAME_SPELL_ERR; 
        result.emsg = "First field of a bond object needs to be named 'fst'";
        return result;
    }
    if (strcmp(snd_name, "snd")) {
        result.status = PS_NAME_SPELL_ERR; 
        result.emsg = "Second field of a bond object needs to be named 'snd'";
        return result;
    }
    if (strcmp(thrd_name, "len")) {
        result.status = PS_NAME_SPELL_ERR; 
        result.emsg = "Third field of a bond object needs to be named 'len'";
        return result;
    }


    int fstid, sndid;
    fstid = sndid = 0;

    if (fst_value->type == json_integer) {
        fstid = fst_value->u.integer;
    } else {
        result.status = PS_VALUE_TYPE_ERROR; 
        result.emsg = "The type of the first field in a bond needs to be an integer";
        return result;

    }
    
    if (snd_value->type == json_integer) {
        sndid = snd_value->u.integer;
    } else {
        result.status = PS_VALUE_TYPE_ERROR; 
        result.emsg = "The type of the second field in a bond needs to be an integer";
        return result;
    }

    *o_fst = VertexSet_get_vertex(vs, fstid);
    *o_snd = VertexSet_get_vertex(vs, sndid);

    double len;
    len = 0;
    if (len_value->type == json_double) {
        if (Util_in_range(0, 1, len_value->u.dbl))  {
            len = (double) len_value->u.dbl;
        } else {
            result.status = PS_VALUE_RANGE_ERROR;
            result.emsg = "The length value must lie in range (0,1)";
            return result;
        }
    } else {
        result.status = PS_VALUE_TYPE_ERROR;
        result.emsg = "The type of the third field in a bonds needs to be a double";
        return result;
    }
    *o_len = len;

    result.status = PS_SUCCESS;
    result.emsg = NULL; 

    return result;
}

static ParseResult populate_vertexset(VertexSet vs, json_value *contents, int *nvp)
{
    int nv = *nvp;
    json_value *vsarr = contents->u.object.values[0].value;

    ParseResult result;

    if (nv < 1) {
        result.status = PS_NO_PARSE;
        result.emsg = "No verticies in file" ;
        return result;
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

        result = parse_vertex_data(vertex, &id, &pos, label, &fixed);

        if (result.status != PS_SUCCESS) {
            return result;
        } else {
            if (id > nv - 1) {
                result.status = PS_VALUE_RANGE_ERROR;
                result.emsg = "Cant have a vertex ID larger than the (number of verticiies) - 1";
                return result;
            } else if (id < 0) {
                result.status = PS_VALUE_RANGE_ERROR;
                result.emsg = "Cant have a vertex ID that is negative";
                return result;
            } else {
                VertexPointer v = Vertex_create(id, pos, padding, label, fixed);
                VertexSet_update_vertex(vs, id, v);
            }
        }
    }
    if (!VertexSet_unique_ids(vs)) {
        result.status = PS_VALUE_RANGE_ERROR;
        result.emsg = "All verticies must have unique id's";
    }
    return result;
}

static ParseResult populate_bondset(BondSet bs, VertexSet vs, json_value *contents, int nb)
{
    json_value *bsarr = contents->u.object.values[1].value;
    ParseResult result;
    
    int i;
    for (i = 0; i < nb; i++) {
        json_value *bond_value = bsarr->u.array.values[i];
        
        double len; 
        VertexPointer fst, snd;
        ParseResult result;
        result = parse_bond_data(vs, bond_value, &fst, &snd, &len); 

        if (result.status != PS_SUCCESS) {
            return result;
        } else {
            BondPointer bp;
            bp = Bond_create(fst, snd, len);
            fst->mass++;
            snd->mass++;
            *(bs.set + i) = bp;
        }
    }
    result.status = PS_SUCCESS;
    result.emsg   = NULL;
    return result;
}


ParseResult vertexset_from_json(json_value *contents, VertexSetPointer *o_vs)
{
    int nv;
    ParseResult result;
    json_value *vsarr = contents->u.object.values[0].value;
    nv = vsarr->u.array.length;
    **o_vs = VertexSet_initialize(nv);
    result = populate_vertexset(**o_vs, contents, &nv);
    return result;
}

ParseResult bondset_from_json(VertexSet vs, json_value *contents, BondSetPointer *o_bs)
{
    ParseResult result;

    if (contents->u.object.length > 1) {
        json_value *bsarr = contents->u.object.values[1].value;
        int nb = bsarr->u.array.length;
        **o_bs = BondSet_initialize(nb);
        result = populate_bondset(**o_bs, vs, contents, nb);
        return result;
    } else {
        **o_bs = BondSet_initialize(0);
        result.status = PS_SUCCESS;
        result.emsg = "";
        return result;
    }
}

ParseResult check_json(json_value *value)
{
    ParseResult result;
    int len = value->u.object.length;
    if (value == NULL) {
        result.status = PS_NO_PARSE;
        result.emsg = "Could not parse JSON";
    } else if (len != 2 && len != 1) {
        result.status = PS_VALUE_LENGTH_ERR;
        result.emsg = "Outermost json object needs to have one or two fields";
    } else if (strcmp(value->u.object.values[0].name, "vertices") != 0) {
        result.status = PS_NAME_SPELL_ERR;
        result.emsg = "First field must be named 'vertices'"; 
    } else if (len == 2 && strcmp(value->u.object.values[1].name, "bonds") != 0) {
        result.status = PS_NAME_SPELL_ERR;
        result.emsg = "Second field must be named 'bonds'";
    } else {
        result.status = PS_SUCCESS;
        result.emsg = NULL;
    }
    return result;
}


FileReadResult load_json(const char *fname, json_value **o_value)
{
    struct stat filestatus;
    FileReadResult result; 

    if (stat(fname, &filestatus) != 0) {
        result.status = FS_FILE_NOT_FOUND;
        result.emsg = "File not found";
        return result;
    }

    char *file_contents;
    file_contents = (char *) malloc(filestatus.st_size);
    if (file_contents == NULL) {
        result.status = FS_NO_MEMORY; 
        result.emsg = "Not able to allocate enough memory";
        return result;
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
        result.status = FS_NO_OPEN;
        result.emsg = "Could not open file";
        return result;
    } else {
        fclose(fp);
    }

    json_char* json_contents;
    json_contents = (json_char*) file_contents;
    *o_value = json_parse(json_contents, file_size);

    free(file_contents);
    result.status = FS_SUCCESS;
    result.emsg   = NULL;
    return result;
}

Result json_to_vb_pair(const char *fname, Pair *o_pair)
{
    Result result;

    json_value* value;
    value = NULL;
    result.file_result = load_json(fname, &value);

    if (result.file_result.status != FS_SUCCESS) {
        return result;
    }

    result.parse_result = check_json(value);

    if (result.parse_result.status  != PS_SUCCESS) {
        json_value_free(value);
        return result;
    }

    VertexSetPointer vs; BondSetPointer bs;
    vs = (VertexSetPointer) Util_allocate(1, sizeof(VertexSet));
    result.parse_result = vertexset_from_json(value, &vs);

    if (result.parse_result.status  != PS_SUCCESS) {
        json_value_free(value);
        return result;
    }

    bs = (BondSetPointer) Util_allocate(1, sizeof(BondSet));
    result.parse_result = bondset_from_json(*vs, value, &bs);
    if (result.parse_result.status  != PS_SUCCESS) {
        json_value_free(value);
        return result;
    }
    
    if (value != NULL) {
        json_value_free(value);
    }

    *o_pair = Pair_initialize(vs, bs);

    return result;

}

