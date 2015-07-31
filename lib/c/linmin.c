/*****************************************************************************

 * Author: Numerical recepies in C, modified by Ludvig Sundström

 * File Name: linmin.c

 * Description: 
 * GPiven an n-dimensional point p[1..n] and an n-dimensional direction
 * xi[1..n], moves and resets p to where the function func(p) takes on a
 * minimum along the direction xi from p, and replaces xi by the actual vector
 * displacement that p was moved. Also returns as fret the value of func at the
 * returned location p. This is actually all accomplished by calling the
 * routines mnbrak and brent.  

 * Creation Date: 25-06-2015

 *****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "constants.h"
#include "graph.h"
#include "vertex.h"
#include "zone2d.h"
#include "util.h"

float brent(GP gp, float ax, float bx, float cx, float (*f)(float, GP),
        float tol, float *xmin);   

void mnbrak(GP gp, float *ax, float *bx, float *cx, float *fa, float *fb,
        float *fc, float (*func)(float, GP));

float step(float x, GP gp);   

void linmin(GP gp, float *fret)   
{   
    int i, nv;
    float xx, xmin, fx, fb, fa, bx, ax;   

    nv = gp->nv;

    gp->pc = (Vec2DP) malloc(sizeof(Vec2D) * nv);
    gp->xc = (Vec2DP) malloc(sizeof(Vec2D) * nv);
    
    for (i = 0; i < nv; i++) {
        VP vp;
        vp = *(gp->vps + i);
        *(gp->pc + i) = vp->pos;
        *(gp->xc + i) = vp->vel;
    }
    ax = 0.0; 
    xx = 1.0;   
    mnbrak(gp, &ax, &xx, &bx, &fa, &fx, &fb, step);   
    *fret = brent(gp, ax, xx, bx, step, TOL, &xmin);   
    for (i = 0; i < nv; i++) { 
        VP vp = *(gp->vps + i);
        vp->vel.x *= xmin;
        vp->vel.y *= xmin;
    }   
    free(gp->pc);
    free(gp->xc);
}   

float step(float x, GP gp)   
{   
    VS_move(gp->vps, gp->nv, gp->pc, gp->xc, x);

    Graph_reinitialize(gp);
    (*gp->calc_e)(gp);

    float f;
    f = gp->energy;

    return f;
}

