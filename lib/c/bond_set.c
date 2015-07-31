/*****************************************************************************

* File Name: bond_set.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include "util.h"
#include "vertex_set.h"
#include "bond_set.h"

BS BS_initialize(VS vs, json_value *contents, int *nbp)
{
    int i, fstid, sndid;
    float len;
    VP fst, snd;

    json_value *bsarr = contents->u.object.values[1].value;
    *nbp = bsarr->u.array.length;
    int nb;
    nb = *nbp;

    BS rtn = (BS) malloc(sizeof(BP) * nb);

    if (rtn == NULL) {
        rt_error("Error while allocating memory: create_bonds()");
    }

    for (i = 0; i < nb; i++) {
        
        json_value *bond = bsarr->u.array.values[i];
        
        json_value *first = bond->u.object.values[0].value;
        json_value *second = bond->u.object.values[1].value;
        json_value *length = bond->u.object.values[2].value;

        if (first->type == json_integer && second->type == json_integer) {
            fstid = first->u.integer;
            sndid = second->u.integer;
        } else {
            rt_error("Bad JSON data");
        }

        if (length->type == json_integer) {
            len = (float) length->u.integer;
        } else if (length->type == json_double) {
            len = (float) length->u.dbl;
        } else {
            rt_error("Bad JSON data\n");
        }

        fst = *(vs + fstid);
        snd = *(vs + sndid);

        BP bp;
        bp = bond_create(fst, snd, len);
        *(rtn + i) = bp;
    }

    return rtn;
}

BSP BS_create(VS vs, json_value *contents, int *nbp)
{
    BSP rtn;
    rtn = (BSP) malloc(sizeof(BS));
    *rtn = BS_initialize(vs, contents, nbp);
    return rtn;
}

