
#ifndef ZONE2D_H
#define ZONE2D_H

#include "vertex.h"

typedef struct zone2d Z, *Zptr;
typedef struct zonepair Zpair, *ZpairPtr;

struct zone2d {
  int id, i, j, minx, miny, width, height;
  Vptr members;
};

struct zonepair {
  Zptr fst, snd;
  ZpairPtr next;
};

Zptr mk_zone2d(const int id, const int i, const int j, const int minx, 
        const int miny, const int width, const int height);

void free_zones(Zptr *zs, int nz);

void free_zpairs(ZpairPtr zpairs);

#endif
