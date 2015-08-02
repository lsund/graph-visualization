
#ifndef ZONE_H
#define ZONE_H

#include "vertex.h"

typedef struct Z Z, *ZP;

struct Z {
      int id, i, j, minx, miny, width, height;
      VertexPointer members;
};


ZP Zone_create(const int id, const int i, const int j, const int minx, 
          const int miny, const int width, const int height);

void Zones_free(ZP *zs, int nz);

#endif
