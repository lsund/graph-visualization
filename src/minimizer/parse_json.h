#ifndef PARSE_JSON_H
#define PARSE_JSON_H

#include "pair.h"


enum ParseStatus { 
    PS_NO_PARSE,
	PS_NAME_SPELL_ERR,
	PS_VALUE_LENGTH_ERR,
	PS_VALUE_TYPE_ERROR,
    PS_VALUE_RANGE_ERROR,
	PS_SUCCESS 
};

enum FileReadStatus { 
    FS_FILE_NOT_FOUND, 
    FS_NO_MEMORY, 
    FS_NO_OPEN, 
    FS_SUCCESS 
};

struct fileReadResult 
{
    enum FileReadStatus status;
    char *emsg;
};
typedef struct fileReadResult FileReadResult;

struct parseResult 
{
    enum ParseStatus status;
    char *emsg;
};
typedef struct parseResult ParseResult;

struct result {
    FileReadResult file_result;
    ParseResult parse_result;
};
typedef struct result Result;


// Processes the JSON-formatted file specified under fname. Returned is a pair
// of two pointers to the vertex and bondset.
Result json_to_vb_pair(const char *fname, Pair *o_pair);

#endif

