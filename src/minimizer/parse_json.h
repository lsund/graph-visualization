#ifndef PARSE_JSON_H
#define PARSE_JSON_H

#include "pair.h"

// Processes the JSON-formatted file specified under fname. Returned is a pair
// of two pointers to the vertex and bondset.
Pair json_to_vb_pair(const char *fname);

#endif

