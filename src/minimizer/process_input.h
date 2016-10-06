#ifndef PROCESS_INPUT_H
#define PROCESS_INPUT_H

#include "pair.h"

// Processes the JSON-formatted file specified under fname. Returned is a pair
// of two pointers to the vertex and bondset.
Pair process_json(const char *fname);

#endif

