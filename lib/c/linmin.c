/*****************************************************************************

 * Author: Numerical recepies in C, modified by Ludvig Sundström

 * File Name: linmin.c

 * Description: 
 * GraphPointeriven an n-dimensional point p[1..n] and an n-dimensional
 * direction xi[1..n], moves and resets p to where the function step(p) takes
 * on a minimum along the direction xi from p, and replaces xi by the actual
 * vector displacement that p was moved. Also returns as fret the value of func
 * at the returned location p. This is actually all accomplished by calling the
 * routines mnbrak and brent.  

 * Creation Date: 25-06-2015

 *****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "constants.h"
#include "graph.h"
#include "vertex.h"
#include "util.h"

#define PARABOLIC_EXTRAPOLATION(ax, bx, cx, q, r) \
    ({ (*bx) - ((*bx - *cx) * q - (*bx - *ax) *r ) / \
     (2.0 * SIGN(MAX(fabs(q - r), TINY), q - r));})

static float step(float x, GraphPointer graph, float (*e_fun)(GraphPointer))   
{   
    VertexSet_move(graph->vs, x);

    Graph_reset_dynamics(graph);

    return e_fun(graph);
}

float isolate_minimum(
        GraphPointer graph, 
        float ax, 
        float bx, 
        float cx, 
        float tol, 
        float *xmin,
        float (*e_fun)(GraphPointer)
    )
{
    int iter;
    float a,b,d,etemp,fu,fv,fw,fx,p,q,r,tol1,tol2,u,v,w,x,xm;
    float e=0.0;
    void rt_error(); 

    a=(ax < cx ? ax : cx);
    b=(ax > cx ? ax : cx);
    x = w = v = bx;
    fw = fv = fx = step(x, graph, e_fun);
    for (iter = 1;iter <= ITMAX; iter++) {
        xm = 0.5 * (a + b);
        tol2 = 2.0 * (tol1 = tol * fabs(x) + ZEPS);
        if (fabs(x-xm) <= (tol2-0.5*(b-a))) {
            *xmin=x;
            return fx;
        }
        if (fabs(e) > tol1) {
            r = (x - w) * (fx - fv);
            q =(x - v) * (fx - fw);
            p = (x - v) * q - (x - w) * r;
            q = 2.0 * (q - r);
            if (q > 0.0) p = -p;
            q=fabs(q);
            etemp=e;
            e=d;
            if (fabs(p) >= fabs(0.5*q*etemp) || p <= q*(a-x) || p >= q*(b-x))
                d=CGOLD*(e=(x >= xm ? a-x : b-x));
            else {
                d=p/q;
                u=x+d;
                if (u-a < tol2 || b-u < tol2)
                    d=SIGN(tol1,xm-x);
            }
        } else {
            d=CGOLD*(e=(x >= xm ? a-x : b-x));
        }
        u=(fabs(d) >= tol1 ? x+d : x+SIGN(tol1,d));
        fu = step(u, graph, e_fun);
        if (fu <= fx) {
            if (u >= x) a=x; else b=x;
            SHFT(v,w,x,u)
                SHFT(fv,fw,fx,fu)
        } else {
            if (u < x) a=u; else b=u;
            if (fu <= fw || w == x) {
                v=w;
                w=u;
                fv=fw;
                fw=fu;
            } else if (fu <= fv || v == x || v == w) {
                v=u;
                fv=fu;
            }
        }
    }
    rt_error("Too many iterations in brent");
    *xmin=x;
    return fx;
}

void bracket_minimum(
        GraphPointer gp, 
        float *ax, 
        float *bx, 
        float *cx, 
        float *fa, 
        float *fb, 
        float *fc, 
        float (*e_fun)(GraphPointer)
    )
{
    
    *fa = step(*ax, gp, e_fun);
    *fb = step(*bx, gp, e_fun);
    
    if (*fb > *fa) {
        float dum;
        SHFT(dum,*ax,*bx,dum);
        SHFT(dum,*fb,*fa,dum);
    }

    *cx = *bx + GOLD * (*bx - *ax);
    *fc = step(*cx, gp, e_fun);

    while (*fb > *fc) {
        
        float r, q;
        r = (*bx - *ax) * (*fb - *fc);
        q = (*bx - *cx) * (*fb - *fa);
        
        float u, ulim;
        u = PARABOLIC_EXTRAPOLATION(ax, bx, cx, q, r);
        ulim = (*bx)+GLIMIT*(*cx-*bx);

        float fu;
        if ((*bx-u)*(u-*cx) > 0.0) {
            fu=(*step)(u, gp, e_fun);
            if (fu < *fc) {
                *ax=(*bx);
                *bx=u;
                *fa=(*fb);
                *fb=fu;
                return;
            } else if (fu > *fb) {
                *cx=u;
                *fc=fu;
                return;
            }
            u=(*cx)+GOLD*(*cx-*bx);
            fu=(*step)(u, gp, e_fun);
        } else if ((*cx-u)*(u-ulim) > 0.0) {
            fu=(*step)(u, gp, e_fun);
            if (fu < *fc) {
                SHFT(*bx,*cx,u,*cx+GOLD*(*cx-*bx));
                SHFT(*fb,*fc,fu,(*step)(u, gp, e_fun));
            }
        } else if ((u-ulim)*(ulim-*cx) >= 0.0) {
            u=ulim;
            fu=(*step)(u, gp, e_fun);
        } else {
            u = (*cx)+GOLD*(*cx-*bx);
            fu=(*step)(u, gp, e_fun);
        }
        SHFT(*ax,*bx,*cx,u)
        SHFT(*fa,*fb,*fc,fu)
    }
}


void linmin(GraphPointer graph, float (*e_fun)(GraphPointer), float *fret)   
{   

    VertexSet vs;
    vs = graph->vs;

    VertexSet_set_statics(vs);    

    float ax, xx;
    ax = 0.0; 
    xx = 1.0;   
    
    float bx, fa, fx, fb;
    bracket_minimum(graph, &ax, &xx, &bx, &fa, &fx, &fb, e_fun);   

    float xmin;
    *fret = isolate_minimum(graph, ax, xx, bx, TOL, &xmin, e_fun);   
    
    VertexSet_apply_forces_scalar(graph->vs, xmin);
}   

