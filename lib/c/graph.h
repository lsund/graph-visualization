
#ifndef GRAPH_H 
#define GRAPH_H

/// Fixed && not Fixed
//

#include "bondpair.h"
#include "zone2d.h"
#include "vertex_set.h"
#include "vertex_pair.h"
#include "bond_set.h"

typedef struct G G, *GP;

struct G 
{
    int nv, nb, nz, npz, max_vw, max_vh;
    float energy;
    int *is_populated;
    VP *vps;
    BP *bps;
    ZP *zps;
    ZP *pzps;
    B2P connected, crosses; 
    ZprPtr azps;
    Vec2DP pc, xc; 
    void (*calc_e)(const GP gp);
    void (*calc_f)(const GP gp);
};

GP Graph_create(const char *fname);

void Graph_create_crosses(const GP gp);

void Graph_create_connected(const GP gp);

void Graph_append_member(const GP gp, const VP v, const ZP z);

void Graph_check_adjacent(const GP gp);

void Graph_create_zones(const GP gp);

void Graph_reinitialize(const GP gp);

void Graph_free(const GP gp);

///// Testing

GP graph_create(VP *vs, BP *bs, int nv, int nb);

#endif
