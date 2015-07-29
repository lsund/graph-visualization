/*****************************************************************************
 * Author: Numerical Recipies in C, Ludvig Sundström
 *
 * File Name: brent.c
 *
 * Description: 
 * Given a function func, and given a bracketing triplet of abcissas ax, bx, cx
 * (such that bx is between ax and cx, and func(bx) is less than both f(ax) and
 * f(cx)), this routine isolates the minimum to a ffractional precition of
 * about tol using Brent's method.The abcissa of the minimum is returned as
 * xmin, and the minimum function value is returned as brent, the returned
 * function value.
 *
 * Creation Date : 25-06-2015
 *
 *****************************************************************************/

#include <math.h>

#include "graph.h"
#include "util.h"
#include "constants.h"

float brent(Gptr graph, float ax, float bx, float cx, 
        float (*func)(float, Gptr graph), float tol, float *xmin)
{
    int iter;
    float a,b,d,etemp,fu,fv,fw,fx,p,q,r,tol1,tol2,u,v,w,x,xm;
    float e=0.0;
    void rt_error(); 

    a=(ax < cx ? ax : cx);
    b=(ax > cx ? ax : cx);
    x = w = v = bx;
    fw = fv = fx = (*func)(x, graph);
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
        fu = (*func)(u, graph);
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

#undef ITMAX
#undef CGOLD
#undef ZEPS
#undef SHFT
