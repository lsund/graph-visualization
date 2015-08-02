
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <math.h>

#include "constants.h"
#include "util.h"
#include "json.h"
#include "graph.h"
#include "vertex_set.h"
#include "vertex_set.h"

Pair process_json(const char *filename, int *nvp, int *nbp)
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

    VertexSetPointer vs; BondSetPointer bs;
    vs = VertexSet_create(value, nvp);
    bs = BondSet_create(vs->set, value, nbp);

    json_value_free(value);
    free(file_contents);

    return Pair_initialize(vs, bs);
}

