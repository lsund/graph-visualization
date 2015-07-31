
#ifndef BOND_SET_H
#define BOND_SET_H

#include "bond.h"
#include "vertex_set.h"

typedef BP *BS, **BSP;

BSP BS_create(VS vs, json_value *contents, int *nb);

BS BS_initialize(VS vs, json_value *contents, int *nbp);

#endif
