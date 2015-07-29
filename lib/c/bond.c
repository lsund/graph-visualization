/*****************************************************************************

* File Name: bond.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>

#include "bond.h"

Bptr mk_bond(const Vptr fst, const Vptr snd, const float dist0, const float k)
{
    fst->mass += 1;
    snd->mass += 1;

    Bptr rtn = malloc(sizeof(B));
    rtn->fst = fst;
    rtn->snd = snd;
    rtn->dist0 = dist0;
    rtn->k = k;
    return rtn;
}

BpairPtr mk_bondpair(Bptr b1, Bptr b2, BpairPtr next)
{
    BpairPtr rtn = malloc(sizeof(Bpair));
    rtn->fst = b1;
    rtn->snd = b2;
    rtn->next = next;
    if (b1->fst->id == b2->fst->id) {
        rtn->common = b1->fst;
        rtn->other1 = b1->snd;
        rtn->other2 = b2->snd;
    } else if (b1->fst->id == b2->snd->id) {
        rtn->common = b1->fst;
        rtn->other1 = b1->snd;
        rtn->other2 = b2->fst;
    } else if (b1->snd->id == b2->fst->id) {
        rtn->common = b1->snd;
        rtn->other1 = b1->fst;
        rtn->other2 = b2->snd;
    } else {
        rtn->common = b1->snd;
        rtn->other1 = b1->fst;
        rtn->other2 = b2->fst;
    }
    return rtn;
}

int has_common_vertex(Bptr b1, Bptr b2) 
{
    return  b1->fst->id == b2->fst->id ||
            b1->fst->id == b2->snd->id || 
            b1->snd->id == b2->fst->id ||
            b1->snd->id == b2->snd->id;
}

void free_bonds(Bptr *bs, int nb) 
{
    int i;
    for (i = 0; i < nb; i++) {
        free(*(bs + i));
    }
    free(bs);
    bs = NULL;
}

void free_bpairs(BpairPtr bpairs)
{
    BpairPtr cur = bpairs;
    while(cur != NULL) {
        BpairPtr tmp = cur;
        cur = cur->next;
        free(tmp);
    }
    bpairs = NULL;
}

void print_bond(B b) 
{
    printf("bond {fst: %d, snd: %d, len: %f, stiffness: %f}\n", b.fst->id, 
            b.snd->id, b.dist0, b.k);
}


