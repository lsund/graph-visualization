
#ifndef ZONE_PAIR_H
#define ZONE_PAIR_H

#include "zone.h"

typedef struct ZonePair ZonePair, *ZonePairPointer;

struct ZonePair {
  ZonePointer fst, snd;
  ZonePairPointer next;
};

ZonePairPointer ZonePair_create(const Pair pr, const ZonePairPointer next);

void ZonePairs_free(const ZonePairPointer zprs);

#endif
