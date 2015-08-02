/*****************************************************************************

* File Name: Pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdlib.h>
#include "util.h"
#include "pair.h"

Pair Pair_initialize(void *fst, void *snd) 
{
    Pair rtn;
    rtn.fst = fst;
    rtn.snd = snd;
    return rtn;
}

PairPointer Pair_create(void *fst, void *snd) 
{
    PairPointer rtn = (PairPointer) Util_allocate(1, sizeof(Pair));
    *rtn = Pair_initialize(fst, snd);
    return rtn;
}

