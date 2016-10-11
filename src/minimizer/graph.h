#ifndef GRAPH_H 
#define GRAPH_H

#include "bond_connection.h"
#include "bond_overlap.h"
#include "grid.h"
#include "zone.h"
#include "vertex_set.h"
#include "vertex_pair.h"
#include "bond_set.h"
#include "zone_pair.h"

// A graph consists of a set of vertices, a set of bonds and other data to
// support these structures: (grid) is a partition of the graph. (con) is the
// set of all bonds which share a common vertex. (crs) is the set of all
// overlapping bonds. (energy) is a placeholder for the graphs energy value which
// should be set by external routines. (center) is the vector to the center of
// the graph. (ncrosses) and (ang_res) is statistical data for the number of
// bond overlaps and the angular resolution of the graph.
typedef struct graph Graph, *GraphPointer;

struct graph
{
    VertexSet vs;
    BondSet bs;
    GridPointer grid;
    BondConnectionPointer con;
    BondOverlapPointer crs;
    Vertex center;
    double energy;
    int ncrosses, ncon;
    double ang_res;
};

// The pointer to the graph created from parsing the file fname which should
// contain properly formatted JSON
GraphPointer Graph_create(const char *fname);

// Detects the connected bonds in the graph and updates the field con
// accordingly
void Graph_detect_connected(const GraphPointer graph);

// Detects the overlapping bonds in the graph and updates the field crs
// accordingly
void Graph_detect_overlapping_bonds(const GraphPointer graph);

// Reset all non-static data in the graph
void Graph_reset_dynamic_data(const GraphPointer graph);

// Calculate the angular resolution for the graph
double Graph_angular_resolution(const GraphPointer graph);

// Free the memory allocated for the graph
void Graph_free(const GraphPointer graph);

#endif
