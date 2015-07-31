
#ifndef BOND_H
#define BOND_H

#include "vertex.h"

typedef struct bond B, *BP;

struct bond {
    VP fst, snd;
    float dist0;
};

BP bond_create(VP fst, VP snd, const float dist0);

void free_bonds(BP *bps, int nb);

int has_common_vertex(BP bpp1, BP bpp2);

float bond_attraction_energy(const BP bp);

Vec2D bond_attraction_force(const BP bp);

#endif
