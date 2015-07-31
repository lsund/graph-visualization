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

#include "graph.h"

#include "util.h"
#include "constants.h"

#include "process_input.h"

/* Private ******************************************************************/

/** 
 * Given a vertex in a graph, assign it a zone.
 */

static void assign_vertex_zone(const GP gp, const VP v)
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
    ZP z = *(gp->zps + (j * GRID_DIM_X) + i);
    Graph_append_member(gp, v, z);
}

GP create(VP *vs, BP *bs, int nv, int nb) 
{
    
    GP rtn; 
    rtn = (GP) calloc(1, sizeof(G));

    Graph_create_zones(rtn);

    rtn->vps = vs; rtn->bps = bs;
    rtn->nv = nv; rtn->nb = nb;

    Graph_create_connected(rtn);
    
    return rtn;
}

/* Public ******************************************************************/

GP Graph_create(const char *fname) 
{

    int nv, nb;
    P pr;
    pr = process_json(fname, &nv, &nb);

    if ((float) nb > (float) nv * logf((float) nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }
    
    GP rtn;
    rtn = create((VS) pr.fst, (BS) pr.snd, nv, nb);

    return rtn;
}

void Graph_reinitialize(const GP gp)
{
    gp->npz = 0;
    if (gp->crosses) BondPairs_free(gp->crosses);
    gp->crosses = NULL;
    int i;
    for (i = 0; i < gp->nz; i++) {
        *(gp->is_populated + i) = 0;
        ZP z = *(gp->zps + i);
        z->members = NULL;
    }

    if (gp->azps) free_zprs(gp->azps);
    gp->azps = NULL;

    for (i = 0; i < gp->nv; i++) {
        VP v = *(gp->vps + i);
        v->next = NULL;
        assign_vertex_zone(gp, v);
        free(v->crs_bof);
        v->crs_bof = (int *) calloc(gp->nv, sizeof(int)); 
    }
    Graph_check_adjacent(gp);
    Graph_create_crosses(gp);
}

void Graph_create_crosses(const GP gp)
{
    int i, j;
    B2P crosses; 
    crosses = NULL; 
    for (i = 0; i < gp->nb - 1; i++) {
        for (j = i + 1; j < gp->nb; j++) {

            BP b1, b2;
            b1 = *(gp->bps + i);  
            b2 = *(gp->bps + j);  

            float xi, yi;

            int crossing;
            B2P b2p;
            b2p = BondPair_create(pair_initialize(b1, b2), NULL);
            crossing = BondPair_intersect(b2p, &xi, &yi);
            if (crossing) {
                b2p->next = crosses;
                BondPair_set_cross(b2p, Vector2d_initialize(xi, yi));
                crosses = b2p;
            } else {
                free(b2p);
                b2p = NULL;
            }
        }
    }
    gp->crosses = crosses;
}

void Graph_create_connected(const GP gp)
{
    int i, j;
    B2P connected;
    BP fst, snd;
    connected = NULL; 
    fst = snd = NULL;
    for (i = 0; i < gp->nb - 1; i++) {
        for (j = i + 1; j < gp->nb; j++) {
            fst = *(gp->bps + i);  
            snd = *(gp->bps + j);  
            int match = has_common_vertex(fst, snd);
            if (match) {
                B2P newpr;
                newpr = BondPair_create(pair_initialize(fst, snd), connected);
                connected = newpr;
            }
        }
    }
    gp->connected = connected;
}    

void Graph_create_zones(const GP gp)
{
    gp->nz = 0;
    gp->zps = (ZP *) malloc(sizeof(Z) * GRID_DIM_X * GRID_DIM_Y);
    int i, j, id;
    for (j = 0; j < GRID_DIM_Y; j++) {
        for (i = 0; i < GRID_DIM_X; i++) {
            id = (j * GRID_DIM_Y) + i;
            ZP z = zone2d_create(id, i, j, i * PADDING, j * PADDING, 
                    PADDING, PADDING);
            *(gp->zps + id) = z;
            gp->nz++;
        }
    }
    gp->is_populated = (int *) malloc(sizeof(int) * gp->nz);
    gp->pzps = (ZP *) malloc(sizeof(void *) * gp->nz);
    gp->azps = NULL;
    gp->npz = 0;
}

void Graph_append_member(const GP gp, const VP v, const ZP z)
{
    v->next = z->members;
    z->members = v;
    if (!*(gp->is_populated + z->id)) {
        *(gp->pzps + gp->npz) = z;
        gp->npz++;
    }
    *(gp->is_populated + z->id) = 1;
}

void Graph_check_adjacent(const GP gp) 
{
    int i, j;
    for (i = 0; i < gp->npz - 1; i++) {
        for (j = i + 1; j < gp->npz; j++) {
            ZP zi = *(gp->pzps + i);
            ZP zj = *(gp->pzps + j);
            int diff;
            diff = zi->id - zj->id;
            
            int cond = diff == 1 || 
                       diff == -1 || 
                       diff == GRID_DIM_X || 
                       diff == -GRID_DIM_X ||
                       diff == GRID_DIM_X - 1 ||
                       diff == GRID_DIM_X + 1 ||
                       diff == -GRID_DIM_X - 1 ||
                       diff == -GRID_DIM_X + 1;
            if (cond) {
                ZprPtr newzpr = malloc(sizeof(Zpr));
                newzpr->fst = zi;
                newzpr->snd = zj;
                newzpr->next = gp->azps;
                gp->azps = newzpr;
            }
        }
    }
}

void Graph_free(GP gp)
{
    VS_free(gp->vps, gp->nv);
    free_bonds(gp->bps, gp->nb);
    free_zones(gp->zps, gp->nz);
    if (gp->connected) BondPairs_free(gp->connected);
    if (gp->crosses) BondPairs_free(gp->crosses);
    free_zprs(gp->azps);
    free(gp->is_populated);
    free(gp->pzps);
    free(gp->zps);
    free(gp);
}

