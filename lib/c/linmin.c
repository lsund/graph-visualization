/*****************************************************************************

 * Author: Numerical recepies in C, modified by Ludvig Sundström

 * File Name: linmin.c

 * Description: 
 * Gptriven an n-dimensional point p[1..n] and an n-dimensional direction
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

void (*nrfunc)(); 

float brent(Gptr g, float ax, float bx, float cx, float (*f)(float, Gptr),
        float tol, float *xmin);   

void mnbrak(Gptr g, float *ax, float *bx, float *cx, float *fa, float *fb,
        float *fc, float (*func)(float, Gptr));

float f1dim(float x, Gptr g);   

void linmin(Gptr g, float *fret, void (*func)(Gptr))   
{   
    int i, nv;
    float xx, xmin, fx, fb, fa, bx, ax;   

    nv = g->nv;

    g->pc = (Vector2dPtr) malloc(sizeof(Vector2d) * nv);
    g->xc = (Vector2dPtr) malloc(sizeof(Vector2d) * nv);
    
    nrfunc = func;   
    for (i = 0; i < nv; i++) {
        Vptr v;
        v = *(g->vs + i);
        *(g->pc + i) = v->pos;
        *(g->xc + i) = v->vel;
    }
    ax = 0.0; 
    xx = 1.0;   
    mnbrak(g, &ax, &xx, &bx, &fa, &fx, &fb, f1dim);   
    *fret = brent(g, ax, xx, bx, f1dim, TOL, &xmin);   
    for (i = 0; i < nv; i++) { 
        Vptr vptr = *(g->vs + i);
        vptr->vel.x *= xmin;
        vptr->vel.y *= xmin;
    }   
    free(g->pc);
    free(g->xc);
}   

float f1dim(float x, Gptr g)   
{   
    
    move_vertices(g->vs, g->nv, g->pc, g->xc, x);
    vertices_assign_zones(g);

    (*nrfunc)(g);

    float f;
    f = g->energy;

    return f;
} 

