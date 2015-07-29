/*****************************************************************************
 * Author: Numerical Recipies in C, Ludvig Sundström
 *
 * File Name: mnbrak.c
 *
 * Description: 
 * Given a function func, and given distinct initial points ax, bx, this
 * routine searches in the downhill direction (defined by the function as
 * evaluated at the initial points) and returns new points ax, bx, cx that
 * bracket a minimum of the function. Also returned are the function values at
 * the three points fa, fb, fc
 *
 * Creation Date : 09-07-2015
 *
 *****************************************************************************/

#include <stdio.h>
#include <math.h>

#include "graph.h"
#include "util.h"
#include "constants.h"

void mnbrak(Gptr graph, float *ax, float *bx, float *cx, float *fa, float *fb,
        float *fc, float (*func)(float, Gptr))
{
    float ulim, u, r, q, fu, dum;

    *fa=(*func)(*ax, graph);
    *fb=(*func)(*bx, graph);
    if (*fb > *fa) {
        SHFT(dum,*ax,*bx,dum);
        SHFT(dum,*fb,*fa,dum);
    }
    *cx=(*bx)+GOLD*(*bx-*ax);
    *fc=(*func)(*cx, graph);
    while (*fb > *fc) {
        r = (*bx - *ax) * (*fb - *fc);
        q = (*bx - *cx) * (*fb - *fa);
        u = (*bx) - ((*bx-*cx)*q-(*bx-*ax)*r) /
            (2.0 * SIGN(MAX(fabs(q - r), TINY), q - r));
        ulim = (*bx)+GLIMIT*(*cx-*bx);
        if ((*bx-u)*(u-*cx) > 0.0) {
            fu=(*func)(u, graph);
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
            fu=(*func)(u, graph);
        } else if ((*cx-u)*(u-ulim) > 0.0) {
            fu=(*func)(u, graph);
            if (fu < *fc) {
                SHFT(*bx,*cx,u,*cx+GOLD*(*cx-*bx));
                SHFT(*fb,*fc,fu,(*func)(u, graph));
            }
        } else if ((u-ulim)*(ulim-*cx) >= 0.0) {
            u=ulim;
            fu=(*func)(u, graph);
        } else {
            u = (*cx)+GOLD*(*cx-*bx);
            fu=(*func)(u, graph);
        }
        SHFT(*ax,*bx,*cx,u)
        SHFT(*fa,*fb,*fc,fu)
    }
}

