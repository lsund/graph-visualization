/*****************************************************************************

 * Author: Numerical recepies in C, modified by Ludvig Sundström

 * File Name: linmin.c

 * Description: 
 * GraphPointeriven an n-dimensional point p[1..n] and an n-dimensional direction
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
#include "util.h"
#include "isolate_minimum.h"
#include "bracket_minimum.h"

float step(float x, GraphPointer gp)   
{   
    VertexSet_move(gp->vs, gp->vs.n, x);

    Graph_reset_dynamics(gp);
    (*gp->calc_e)(gp);

    float f;
    f = gp->e;

    return f;
}

void linmin(GraphPointer gp, float *fret)   
{   
    int nv;
    nv = gp->vs.n;

    VertexSet vs;
    vs = gp->vs;

    VertexSet_set_statics(vs, nv);    

    float ax, xx;
    ax = 0.0; 
    xx = 1.0;   
    
    float bx, fa, fx, fb;
    bracket_minimum(gp, &ax, &xx, &bx, &fa, &fx, &fb, step);   

    float xmin;
    *fret = isolate_minimum(gp, ax, xx, bx, step, TOL, &xmin);   
    
    VertexSet_apply_forces_scalar(gp->vs, gp->vs.n, xmin);
}   

