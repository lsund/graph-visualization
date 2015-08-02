/*****************************************************************************

* File Name: zone_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdlib.h>

#include "pair.h"
#include "zone_pair.h"

Z2P ZonePair_create(Pair pr, Z2P next)
{
    Z2P rtn = (Z2P) malloc(sizeof(Z2));
    rtn->fst = (ZP) pr.fst;
    rtn->snd = (ZP) pr.snd;
    rtn->next = next;
    return rtn;
}

void ZonePairs_free(Z2P z2p)
{
    Z2P cur = z2p;
    while(cur != NULL) {
        Z2P tmp = cur;
        cur = cur->next;
        free(tmp);
    }
}

