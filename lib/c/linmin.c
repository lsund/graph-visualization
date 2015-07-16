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
#include "util.h"

int ncom; 
float *pcom, *xicom, (*nrfunc)();

int numv, numb;

float brent(Gptr graph, float ax, float bx, float cx, float (*f)(float, Gptr),
        float tol, float *xmin);   

void mnbrak(Gptr graph, float *ax, float *bx, float *cx, float *fa, float *fb,
        float *fc, float (*func)(float, Gptr));

float f1dim(float x, Gptr graph);   

void linmin(Gptr graph, int n, float *fret, float (*func)(Gptr))   
{   
    int i;   
    float xx, xmin, fx, fb, fa, bx, ax;   

    numv = graph->nv;
    numb = graph->nb;
    ncom = n; 
    pcom = vector(n);   
    xicom = vector(n);   
    
    nrfunc = func;   
    for (i = 0; i < ncom; i += 2) {
        Vptr vptr = *(graph->vs + i / 2);
        pcom[i] = vptr->pos.x;
        pcom[i + 1] = vptr->pos.y;
        xicom[i] = vptr->vel.x;
        xicom[i + 1] = vptr->vel.y;
    }
    ax = 0.0; 
    xx = 1.0;   
    mnbrak(graph, &ax, &xx, &bx, &fa, &fx, &fb, f1dim);   
    *fret = brent(graph, ax, xx, bx, f1dim, TOL, &xmin);   
    for (i = 0; i < n; i += 2) { 
        Vptr vptr = *(graph->vs + i / 2);
        vptr->vel.x *= xmin;
        vptr->vel.y *= xmin;
    }   
    free(xicom);
    free(pcom);
}   

float f1dim(float x, Gptr graph)   
{   
    int i;   
    float f;
    for (i = 0; i < ncom; i += 2) {
        struct vertex *vptr = *(graph->vs + i / 2);
        vptr->pos.x = pcom[i] + x * xicom[i];
        vptr->pos.y = pcom[i + 1] + x * xicom[i + 1];
    }
    f = (*nrfunc)(graph);
    return f;
} 

