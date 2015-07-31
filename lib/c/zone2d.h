
#ifndef ZONE2D_H
#define ZONE2D_H

#include "vertex.h"

typedef struct zone2d Z, *ZP;
typedef struct zonepr Zpr, *ZprPtr;

struct zone2d {
  int id, i, j, minx, miny, width, height;
  VP members;
};

struct zonepr {
  ZP fst, snd;
  ZprPtr next;
};

ZP zone2d_create(const int id, const int i, const int j, const int minx, 
        const int miny, const int width, const int height);

void free_zones(ZP *zs, int nz);

void free_zprs(ZprPtr zprs);

#endif
