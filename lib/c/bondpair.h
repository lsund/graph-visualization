
#ifndef BONDPAIR_H
#define BONDPAIR_H

#include "pair.h"
#include "bond.h"

typedef struct bondpr Bpr, *B2P;

struct bondpr {
  VP common, other1, other2;
  BP fst, snd;
  B2P next;
  Vec2D cross;
};

B2P BondPair_create(P pr, B2P next);

void BondPair_set_cross(B2P bpr, Vec2D cross);

char BondPair_intersect(const B2P bpr, float *i_x, float *i_y);

float BondPair_angular_energy(const B2P bpr);

P BondPair_angular_force(const B2P bpr);

float BondPair_crossing_energy(const B2P bpr);

P BondPair_crossing_force(const B2P bpr, const VP v0, const VP v1);

void BondPairs_free(B2P b2ps);

#endif
