
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
        const double minx, 
        const double miny, 
        const double width, 
        const double height
    );

void Zones_free(ZonePointer *zs, int nz);

#endif
