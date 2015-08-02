/*****************************************************************************

* File Name: Bond_set.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include "util.h"
#include "vertex_set.h"
#include "bond_set.h"

BondSet BondSet_initialize(VertexPointer *vs, json_value *contents, int *nbp)
{
    int i, fstid, sndid;
    float len;
    VertexPointer fst, snd;

    json_value *bsarr = contents->u.object.values[1].value;
    *nbp = bsarr->u.array.length;
    int nb;
    nb = *nbp;

    BondSet rtn;
    rtn.set = (BondPointer *) Util_allocate(nb, sizeof(BondPointer));
    rtn.n = nb;

    for (i = 0; i < nb; i++) {
        
        json_value *Bond = bsarr->u.array.values[i];
        
        json_value *first = Bond->u.object.values[0].value;
        json_value *second = Bond->u.object.values[1].value;
        json_value *length = Bond->u.object.values[2].value;

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

        BondPointer bp;
        bp = Bond_create(fst, snd, len);
        *(rtn.set + i) = bp;
    }

    return rtn;
}

BondSetPointer BondSet_create(VertexPointer *vs, json_value *contents, int *nbp)
{
    BondSetPointer rtn;
    rtn = (BondSetPointer) malloc(sizeof(BondSet));
    *rtn = BondSet_initialize(vs, contents, nbp);
    return rtn;
}

void BondSet_free(BondSet bs) 
{
    int i;
    for (i = 0; i < bs.n; i++) {
        Bond_free(*(bs.set + i));
    }
    free(bs.set);
}

