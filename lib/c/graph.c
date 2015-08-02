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
    
    GraphPointer rtn; 
    rtn = (GraphPointer) calloc(1, sizeof(Graph));
    
    rtn->grid = Grid_create(); 

    rtn->vs = vs; rtn->bs = bs;

    Graph_detect_connected(rtn);
    
    return rtn;
}

/** 
 * Given a vertex in a graph, assign it a zone.
 */

void assign_vertex_to_zone(const GridPointer grid, const VertexPointer v)
{
    int i, j;
    if (v->pos.y >= PANEL_Y) {
        j = PANEL_Y / PADDING - 1;
    } else if (v->pos.y <= 0) {
        j = 0;
    } else {
        j = ((int) v->pos.y) / PADDING;
    }
    if (v->pos.x >= PANEL_X) {
        i = PANEL_X / PADDING - 1;
    } else if (v->pos.x <= 0) {
        i = 0;
    } else {
        i = ((int) v->pos.x) / PADDING;
    }
    ZP z = *(grid->zps + (j * GRID_DIM_X) + i);
    Grid_append_member(grid, v, z);
}

/* Public ******************************************************************/

GraphPointer Graph_create(const char *fname) 
{

    int nv, nb;
    Pair pr;
    pr = process_json(fname, &nv, &nb);

    if ((float) nb > (float) nv * logf((float) nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    BondSetPointer bs;
    bs = (BondSetPointer) pr.snd; 

    VertexSetPointer vs;
    vs = (VertexSetPointer) pr.fst; 

    GraphPointer rtn;
    rtn = create(*vs, *bs);

    Placement_set_spiral(rtn->vs, nv); 
    Graph_reset_dynamics(rtn);

    return rtn;
}


void Graph_reset_dynamics(const GraphPointer g)
{
    Grid_reset_dynamics(g->grid);

    if (g->crs) BondPairs_free(g->crs);
    g->crs = NULL;

    int i;
    for (i = 0; i < g->vs.n; i++) {
        VertexPointer v = *(g->vs.set + i);
        Vertex_reset_dynamics(v);
        assign_vertex_to_zone(g->grid, v);
    }

    Grid_check_adjacent(g->grid);
    Graph_detect_crosses(g);
}

void Graph_detect_crosses(const GraphPointer g)
{
    int i, j;
    BondPairPointer crs; 
    crs = NULL; 
    for (i = 0; i < g->bs.n - 1; i++) {
        for (j = i + 1; j < g->bs.n; j++) {

            BondPointer b1, b2;
            b1 = *(g->bs.set + i);  
            b2 = *(g->bs.set + j);  

            float xi, yi;

            int crossing;
            BondPairPointer b2p;
            b2p = BondPair_create(Pair_initialize(b1, b2), NULL);
            crossing = BondPair_intersect(b2p, &xi, &yi);
            if (crossing) {
                b2p->next = crs;
                BondPair_set_cross(b2p, Vector_initialize(xi, yi));
                crs = b2p;
            } else {
                free(b2p);
                b2p = NULL;
            }
        }
    }
    g->crs = crs;
}

void Graph_detect_connected(const GraphPointer g)
{
    int i, j;
    BondPairPointer con;
    BondPointer fst, snd;
    con = NULL; 
    fst = snd = NULL;
    for (i = 0; i < g->bs.n - 1; i++) {
        for (j = i + 1; j < g->bs.n; j++) {
            fst = *(g->bs.set + i);  
            snd = *(g->bs.set + j);  
            Pair pr = Pair_initialize(fst, snd);
            int match = has_common_vertex(BondPair_initialize(pr , NULL));
            if (match) {
                BondPairPointer newpr;
                newpr = BondPair_create(Pair_initialize(fst, snd), con);
                con = newpr;
            }
        }
    }
    g->con = con;
}

void Graph_free(GraphPointer g)
{
    VertexSet_free(g->vs);
    BondSet_free(g->bs);
    if (g->con) BondPairs_free(g->con);
    if (g->crs) BondPairs_free(g->crs);
    Grid_free(g->grid);
    free(g->grid);
    free(g);
}

