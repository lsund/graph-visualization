/*****************************************************************************

* File Name: Bond_set.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include "util.h"
#include "vertex_set.h"
#include "bond_set.h"


BondSet BondSet_initialize(int nb)
{
    BondSet rtn;
    rtn.set = (BondPointer *) Util_allocate(nb, sizeof(BondPointer));
    rtn.n = nb;
    
    return rtn;
}

BondPointer BondSet_get_bond(const BondSet bs, const int i) 
{
    return *(bs.set + i);  
}

/*BondSetPointer BondSet_create(*/
        /*VertexPointer *vs, */
        /*json_value *contents, */
        /*int *nbp*/
    /*)*/
/*{*/
    /*BondSetPointer rtn;*/
    /*rtn = (BondSetPointer) malloc(sizeof(BondSet));*/
    /**rtn = BondSet_initialize(vs, contents, nbp);*/
    /*return rtn;*/
/*}*/

int *Bondset_to_array(BondSet bs)
{
    int *rtn = (int *) Util_allocate(bs.n * 2, sizeof(int));
    int i;
    for (i = 0; i < bs.n; i++) {
        *(rtn + i * 2) = (*(bs.set + i))->fst->id;
        *(rtn + i * 2 + 1) = (*(bs.set + i))->snd->id;
    }
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

