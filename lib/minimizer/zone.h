
#ifndef ZONE_H
#define ZONE_H

#include "vertex.h"

// A zone is a rectangular partition of a larger quadratic area. A zone is
// indexed by its field (id), and it has a coordinates (i, j) that indicates
// the zone position, when the top-left zone has zone-coordinates (0, 0). A
// zone has fields (minx, miny) which are the coordinates of the top-left
// corner of the zone. A zone also has a (width, height). A zone is associated
// with a number of vertices, which are stored in the array (members)
typedef struct Zone Zone, *ZonePointer;

struct Zone {
      int id, i, j, minx, miny, width, height;
      VertexPointer members;
};

// The zone with the specified id, zone-coordinates, coordinates, width and
// height
ZonePointer Zone_create(
        const int id, 
        const int i, 
        const int j, 
        const double minx, 
        const double miny, 
        const double width, 
        const double height
    );

// Frees the memory allocated for all zones in array zones
void Zones_free(ZonePointer *zs, int nz);

#endif
