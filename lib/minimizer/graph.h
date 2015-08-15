#ifndef GRAPH_H 
#define GRAPH_H

#include "bond_cross.h"
#include "grid.h"
#include "zone.h"
#include "vertex_set.h"
#include "vertex_pair.h"
#include "bond_set.h"
#include "zone_pair.h"

typedef struct graph Graph, *GraphPointer;

struct graph
{
    int max_vw, max_vh;
    GridPointer grid;
    VertexSet vs;
    BondSet bs;
    BondPairPointer con;
    BondCrossPointer crs;
    double energy;
};

GraphPointer Graph_create(const char *fname);

void Graph_detect_connected(const GraphPointer gph);

void Graph_detect_crosses(const GraphPointer gph);

void Graph_reset_dynamics(const GraphPointer gph);

void Graph_free(const GraphPointer gph);

///// Testing

GraphPointer graph_create(VertexPointer *vs, BondPointer *bs, int nv, int nb);


#endif
