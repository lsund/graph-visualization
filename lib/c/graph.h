
#ifndef GRAPH_H 
#define GRAPH_H

/// Fixed && not Fixed
//

#include "bond_pair.h"
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
    Grd *grd;
    VertexSet vs;
    BondSet bs;
    float e;
    BondPairPointer con, crs; 
    void (*calc_e)(const GraphPointer gph);
    void (*calc_f)(const GraphPointer gph);
};

GraphPointer Graph_create(
        const char *fname, 
        void (*e_fun)(GraphPointer), 
        void (*f_fun)(GraphPointer)
    );

void Graph_run_objective(const GraphPointer gph);

void Graph_detect_connected(const GraphPointer gph);

void Graph_detect_crosses(const GraphPointer gph);

void Graph_reset_dynamics(const GraphPointer gph);

void Graph_free(const GraphPointer gph);

///// Testing

GraphPointer graph_create(VertexPointer *vs, BondPointer *bs, int nv, int nb);


#endif
