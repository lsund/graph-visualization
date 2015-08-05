/*****************************************************************************

* File Name: zone_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include <stdlib.h>

#include "pair.h"
#include "zone_pair.h"

ZonePairPointer ZonePair_create(const Pair pr, const ZonePairPointer next)
{
    ZonePairPointer rtn = (ZonePairPointer) malloc(sizeof(ZonePair));
    rtn->fst = (ZonePointer) pr.fst;
    rtn->snd = (ZonePointer) pr.snd;
    rtn->next = next;
    return rtn;
}

void ZonePairs_free(ZonePairPointer z2p)
{
    ZonePairPointer cur = z2p;
    while(cur != NULL) {
        ZonePairPointer tmp = cur;
        cur = cur->next;
        free(tmp);
    }
}

