/*****************************************************************************

* File Name: pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

#include <stdlib.h>
#include "pair.h"

P pair_initialize(void *fst, void *snd) 
{
    P rtn;
    rtn.fst = fst;
    rtn.snd = snd;
    return rtn;
}

PP pair_create(void *fst, void *snd) 
{
    PP rtn = (PP) malloc(sizeof(P));
    rtn->fst = fst;
    rtn->snd = snd;
    return rtn;
}

