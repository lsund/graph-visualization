
#ifndef ZONE_H
#define ZONE_H

#include "vertex.h"


typedef struct Zone Zone, *ZonePointer;

struct Zone {
      int id, i, j, minx, miny, width, height;
      VertexPointer members;
};


ZonePointer Zone_create(
        const int id, 
        const int i, 
        const int j, 
        const int minx, 
        const int miny, 
        const int width, 
        const int height
    );

void Zones_free(ZonePointer *zs, int nz);

#endif
