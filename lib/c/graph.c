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

void create_graph(const Gptr g, const char *fname) 
{

    create_zones(g);

    Vptr *vs; Bptr *bs;
    int nv, nb;
    vs = NULL; bs = NULL;

    process_json(fname, &vs, &bs, &nv, &nb);
    if ((float)nb > (float)nv * logf((float)nv)) {
        printf("Warning: B greater than V * log(V)\n");
    }

    g->vs = vs; g->bs = bs;
    g->nv = nv; g->nb = nb;

    create_connected(g);

}

void create_crosses(const Gptr g)
{
    int i, j;
    BpairPtr crosses; 
    Bptr fst, snd;
    crosses = NULL; 
    fst = snd = NULL;
    for (i = 0; i < g->nb - 1; i++) {
        for (j = i + 1; j < g->nb; j++) {
            int crossing;
            float xi, yi;
            fst = *(g->bs + i);  
            snd = *(g->bs + j);  
            crossing = intersection(fst->fst->pos.x, fst->fst->pos.y, 
                                    fst->snd->pos.x, fst->snd->pos.y,
                                    snd->fst->pos.x, snd->fst->pos.y,
                                    snd->snd->pos.x, snd->snd->pos.y, 
                                    &xi,             &yi);
            if (crossing) {
                BpairPtr newpair;
                newpair = mk_bondpair(fst, snd, crosses);
                crosses = newpair;
            }
        }
    }
    g->crosses = crosses;
}

void create_connected(const Gptr g)
{
    int i, j;
    BpairPtr connected;
    Bptr fst, snd;
    connected = NULL; 
    fst = snd = NULL;
    for (i = 0; i < g->nb - 1; i++) {
        for (j = i + 1; j < g->nb; j++) {
            fst = *(g->bs + i);  
            snd = *(g->bs + j);  
            int match = has_common_vertex(fst, snd);
            if (match) {
                BpairPtr newpair;
                newpair = mk_bondpair(fst, snd, connected);
                connected = newpair;
            }
        }
    }
    g->connected = connected;
}    

void create_zones(const Gptr g)
{
    g->nz = 0;
    g->zs = (Zptr *) malloc(sizeof(Z) * GRID_DIM_X * GRID_DIM_Y);
    int i, j, id;
    for (j = 0; j < GRID_DIM_Y; j++) {
        for (i = 0; i < GRID_DIM_X; i++) {
            id = (j * GRID_DIM_Y) + i;
            Zptr z = mk_zone2d(id, i, j, i * PADDING, j * PADDING, 
                    PADDING, PADDING);
            *(g->zs + id) = z;
            g->nz++;
        }
    }
    g->is_populated = (int *) malloc(sizeof(int) * g->nz);
    g->pzs = (Zptr *) malloc(sizeof(void *) * g->nz);
    g->azs = NULL;
    g->npz = 0;
}

void append_member(const Gptr g, const Vptr v, const Zptr z)
{
    v->next = z->members;
    z->members = v;
    if (!*(g->is_populated + z->id)) {
        *(g->pzs + g->npz) = z;
        g->npz++;
    }
    *(g->is_populated + z->id) = 1;
}


void check_adjacent(const Gptr g) 
{
    int i, j;
    for (i = 0; i < g->npz - 1; i++) {
        for (j = i + 1; j < g->npz; j++) {
            Zptr zi = *(g->pzs + i);
            Zptr zj = *(g->pzs + j);
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
                ZpairPtr newzpr = malloc(sizeof(Zpair));
                newzpr->fst = zi;
                newzpr->snd = zj;
                newzpr->next = g->azs;
                g->azs = newzpr;
            }
        }
    }
}

/** 
 * Given a vertex v in a graph g, assign it a zone.
 */
static void vertex_assign_zone(const Gptr g, const Vptr v)
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
    Zptr z = *(g->zs + (j * GRID_DIM_X) + i);
    append_member(g, v, z);
}

void vertices_assign_zones(const Gptr g)
{
    int i;
    g->npz = 0;
    for (i = 0; i < g->nz; i++) {
        *(g->is_populated + i) = 0;
        Zptr z = *(g->zs + i);
        z->members = NULL;
    }

    if (g->azs) free_zpairs(g->azs);
    g->azs = NULL;

    for (i = 0; i < g->nv; i++) {
        (*(g->vs + i))->next = NULL;
        vertex_assign_zone(g, *(g->vs + i));
    }
    check_adjacent(g);
}

void free_graph(Gptr g)
{
    free_vertices(g->vs, g->nv);
    free_bonds(g->bs, g->nb);
    free_zones(g->zs, g->nz);
    free_bpairs(g->connected);
    free_zpairs(g->azs);
    free(g->is_populated);
    free(g->pzs);
    free(g->zs);
    free(g);
}

