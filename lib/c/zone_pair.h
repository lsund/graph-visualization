
#ifndef ZONE_PAIR_H
#define ZONE_PAIR_H

#include "zone.h"

typedef struct Z2 Z2, *Z2P;

struct Z2 {
  ZP fst, snd;
  Z2P next;
};

Z2P ZonePair_create(Pair pr, Z2P next);

void ZonePairs_free(Z2P z2ps);

#endif
