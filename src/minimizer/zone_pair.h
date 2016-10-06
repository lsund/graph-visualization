
#ifndef ZONE_PAIR_H
#define ZONE_PAIR_H

#include "zone.h"
#include "pair.h"

// A zonepair is a pair of zones. They are stored as a linked list, so each
// zone keeps track of the next element in that list
typedef struct ZonePair ZonePair, *ZonePairPointer;

struct ZonePair {
  ZonePointer fst, snd;
  ZonePairPointer next;
};

// The pointer to the zone pair created from the pair pr, linked to the next
// element next
ZonePairPointer ZonePair_create(const Pair pr, const ZonePairPointer next);

// Frees the memory allocated for the zone pointed at by zprs, and iteratively
// the next linked zone
void ZonePairs_free(const ZonePairPointer zprs);

#endif
