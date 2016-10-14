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

#include "parse_json.h"

/* Private ******************************************************************/

static GraphPointer create(VertexSet vs, BondSet bs) 
{
    assert(vs.set && bs.set);
    assert(vs.n > 0);

    GraphPointer rtn; 
    rtn = (GraphPointer) calloc(1, sizeof(Graph));

    double padding;
    padding = VertexSet_get_vertex(vs, 0)->padding;

    rtn->grid = Grid_create(padding); 
    rtn->con = NULL; rtn->crs = NULL;
    rtn->energy = 0;
    rtn->vs = vs; 
    rtn->bs = bs;

    rtn->center = Vertex_initialize(-1, Vector_zero(), 0.0, "center", 1);

    Graph_detect_connected(rtn);

    assert(rtn); 
    return rtn;
}

static void assign_vertex_to_zone(
        const GridPointer grid, 
        const VertexPointer v
    )
{
    assert(grid && v);
    assert(grid->nz > 0 && grid->is_populated);
    assert(grid->zps && grid->pzps);

    Grid_append_vertex(grid, v);
}

static void link_bondconnection(const GraphPointer graph, const Pair pr) 
{
    BondConnectionPointer newpr;
    newpr = BondConnection_create(pr);
    newpr->next = graph->con;
    graph->con = newpr;
    graph->ncon++;
}

static void link_bondcross(
        const GraphPointer graph, 
        const BondPair bpr, 
        const Vector cross
        )
{
    BondOverlapPointer bcrs;
    bcrs = BondOverlap_create(bpr, cross);
    bcrs->next = graph->crs;
    graph->crs = bcrs;
} 

/* Public ******************************************************************/

GraphPointer Graph_create(const char *fname) 
{
    Pair pr;
    Result result; 
    result = json_to_vb_pair(fname, &pr);
    if (result.file_result.status != FS_SUCCESS) {
        Util_runtime_error(result.file_result.emsg);
    } else if (result.parse_result.status != PS_SUCCESS) {
        Util_runtime_error(result.parse_result.emsg);
    }

    VertexSetPointer vs;
    vs = (VertexSetPointer) pr.fst; 

    BondSetPointer bs;
    bs = (BondSetPointer) pr.snd; 

    assert(pr.fst && pr.snd);

    GraphPointer rtn;
    rtn = create(*vs, *bs);

    free(vs);
    free(bs);

    Placement_set_spiral(rtn->vs, &rtn->center); 
    Graph_reset_dynamic_data(rtn);
    
    assert(rtn->grid && rtn->vs.set && rtn->bs.set);
    assert(rtn->vs.n > 0 && rtn->vs.n <= MAX_NV);
    assert(rtn->bs.n >= 0);

    return rtn;
}

void Graph_reset_dynamic_data(const GraphPointer graph)
{
    assert(graph && graph->grid && graph->vs.n > 0 && graph->vs.set);

    Grid_reset_dynamic_data(graph->grid);

    if (graph->crs) {
        BondOverlap_free(graph->crs);
    }
    graph->crs = NULL;

    int i;
    for (i = 0; i < graph->vs.n; i++) {
        VertexPointer v = *(graph->vs.set + i);
        Vertex_reset_dynamics(v);
        assign_vertex_to_zone(graph->grid, v);
    }

    Grid_detect_adjacent_zones(graph->grid);
    Graph_detect_overlapping_bonds(graph);
}

void Graph_detect_overlapping_bonds(const GraphPointer graph)
{
    assert(graph && graph->bs.set && graph->bs.n >= 0);
    assert(!graph->crs);

    BondSet bs;
    bs = graph->bs;
    graph->ncrosses = 0;
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
                graph->ncrosses++;
                link_bondcross(graph, bpr, cross);
            } 
        }
    }
}

void Graph_detect_connected(const GraphPointer graph)
{
    assert(!graph->con);
    graph->ncon = 0;
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
                link_bondconnection(graph, Pair_initialize(fst, snd));
            }
        }
    }
}

double Graph_angular_resolution(const GraphPointer graph)
{
    int i, nconn;
    nconn = 0;
    double rtn = 0;
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
                nconn++;
                BondConnectionPointer bconn;
                bconn = BondConnection_create(pr);
                VertexPointer vi, vj, vk;
                vi = bconn->other1; 
                vj = bconn->common;
                vk = bconn->other2; 
                double xji, yji, xjk, yjk;
                xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
                xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

                Vector vecji, vecjk;
                vecji = Vector_initialize(xji, yji);
                vecjk = Vector_initialize(xjk, yjk);
                
                rtn += Vector_angle(vecji, vecjk);
            }
        }
    }
    return rtn;
}

void Graph_free(const GraphPointer graph)
{
    if (graph->con) {
        BondConnections_free(graph->con);
    }
    if (graph->crs) BondOverlap_free(graph->crs);
    VertexSet_free(graph->vs);
    BondSet_free(graph->bs);
    Grid_free(graph->grid);
    free(graph->grid);
    free(graph);
}

