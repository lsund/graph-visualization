/*****************************************************************************

* File Name: graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 07-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdio.h>

#include "constants.h"
#include "graph.h"
#include "placement.h"

#include "process_input.h"

/* Private ******************************************************************/

GraphPointer create(VertexSet vs, BondSet bs) 
{
    assert(vs.set && bs.set);
    assert(vs.n > 0);

    GraphPointer rtn; 
    rtn = (GraphPointer) calloc(1, sizeof(Graph));
    
    rtn->grid = Grid_create(); 
    rtn->con = NULL; rtn->crs = NULL;
    rtn->energy = 0;
    rtn->vs = vs; 
    rtn->bs = bs;

    Graph_detect_connected(rtn);
    
    assert(rtn); 
    return rtn;
}

/** 
 * Given a vertex in a graph, assign it a zone.
 */

static void assign_vertex_to_zone(
        const GridPointer grid, 
        const VertexPointer v
    )
{
    assert(grid && v);
    assert(grid->nz > 0 && grid->is_populated);
    assert(grid->zps && grid->pzps);
    
    int i, j; 
    i = Vertex_zone_idx(v);
    j = Vertex_zone_idy(v);

    Grid_append_member(grid, v, Grid_get_zone(grid, i, j));
}

static void link_bondpair(const GraphPointer graph, const Pair pr) 
{
    BondPairPointer newpr;
    newpr = BondPair_create(pr);
    newpr->next = graph->con;
    graph->con = newpr;
}

static void link_bondcross(
        const GraphPointer graph, 
        const BondPair bpr, 
        const Vector cross
    )
{
    BondCrossPointer bcrs;
    bcrs = BondCross_create(bpr, cross);
    bcrs->next = graph->crs;
    graph->crs = bcrs;
} 

/* Public ******************************************************************/

GraphPointer Graph_create(const char *fname) 
{
    int nv, nb;
    Pair pr;
    pr = process_json(fname, &nv, &nb);
    
    assert(nb < (double) nv * log((double) nv));
    assert(pr.fst && pr.snd);

    VertexSetPointer vs;
    vs = (VertexSetPointer) pr.fst; 

    BondSetPointer bs;
    bs = (BondSetPointer) pr.snd; 

    GraphPointer rtn;
    rtn = create(*vs, *bs);

    free(vs);
    free(bs);

    Placement_set_spiral(rtn->vs, nv); 
    Graph_reset_dynamics(rtn);
    
    assert(rtn->max_vw >= 0 && rtn->max_vh >= 0);
    assert(rtn->grid && rtn->vs.set && rtn->bs.set);
    assert(rtn->vs.n > 0 && rtn->vs.n <= MAX_NV);
    assert(rtn->bs.n >= 0);

    return rtn;
}

void Graph_reset_dynamics(const GraphPointer graph)
{
    assert(graph && graph->grid && graph->vs.n > 0 && graph->vs.set);

    Grid_reset_dynamics(graph->grid);

    if (graph->crs) BondCrosses_free(graph->crs);
    graph->crs = NULL;

    int i;
    for (i = 0; i < graph->vs.n; i++) {
        VertexPointer v = *(graph->vs.set + i);
        Vertex_reset_dynamics(v);
        assign_vertex_to_zone(graph->grid, v);
    }

    Grid_check_adjacent(graph->grid);
    Graph_detect_crosses(graph);
}

void Graph_detect_crosses(const GraphPointer graph)
{
    assert(graph && graph->bs.set && graph->bs.n >= 0);
    assert(!graph->crs);

    BondSet bs;
    bs = graph->bs;

    int i;
    for (i = 0; i < bs.n - 1; i++) {
        int j;
        for (j = i + 1; j < bs.n; j++) {
            BondPointer fst, snd;
            fst = BondSet_get_bond(bs, i);
            snd = BondSet_get_bond(bs, j);

            BondPair bpr;
            bpr = BondPair_initialize(Pair_initialize(fst, snd));

            int crossing;
            Vector cross;
            crossing = BondPair_intersect(bpr, &cross);
            if (crossing) {
                link_bondcross(graph, bpr, cross);
            } 
        }
    }
}

void Graph_detect_connected(const GraphPointer graph)
{
    assert(!graph->con);
    int i;
    for (i = 0; i < graph->bs.n - 1; i++) {
        int j;
        for (j = i + 1; j < graph->bs.n; j++) {
            BondPointer fst, snd;
            fst = BondSet_get_bond(graph->bs, i);
            snd = BondSet_get_bond(graph->bs, j);
            Pair pr = Pair_initialize(fst, snd);
            int common;
            common = BondPair_has_common_vertex(BondPair_initialize(pr));
            if (common) {
                link_bondpair(graph, Pair_initialize(fst, snd));
            }
        }
    }
}

void Graph_free(const GraphPointer graph)
{
    if (graph->con) BondPairs_free(graph->con);
    if (graph->crs) BondCrosses_free(graph->crs);
    VertexSet_free(graph->vs);
    BondSet_free(graph->bs);
    Grid_free(graph->grid);
    free(graph->grid);
    free(graph);
}

