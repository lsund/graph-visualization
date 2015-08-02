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

void bracket_minimum(
        GraphPointer gp, 
        float *ax, 
        float *bx, 
        float *cx, 
        float *fa, 
        float *fb, 
        float *fc, 
        float (*func)(float, GraphPointer)
    )
{
    float ulim, u, r, q, fu, dum;

    *fa=(*func)(*ax, gp);
    *fb=(*func)(*bx, gp);
    if (*fb > *fa) {
        SHFT(dum,*ax,*bx,dum);
        SHFT(dum,*fb,*fa,dum);
    }
    *cx=(*bx)+GOLD*(*bx-*ax);
    *fc=(*func)(*cx, gp);
    while (*fb > *fc) {
        r = (*bx - *ax) * (*fb - *fc);
        q = (*bx - *cx) * (*fb - *fa);
        u = (*bx) - ((*bx-*cx)*q-(*bx-*ax)*r) /
            (2.0 * SIGN(MAX(fabs(q - r), TINY), q - r));
        ulim = (*bx)+GLIMIT*(*cx-*bx);
        if ((*bx-u)*(u-*cx) > 0.0) {
            fu=(*func)(u, gp);
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
            fu=(*func)(u, gp);
        } else if ((*cx-u)*(u-ulim) > 0.0) {
            fu=(*func)(u, gp);
            if (fu < *fc) {
                SHFT(*bx,*cx,u,*cx+GOLD*(*cx-*bx));
                SHFT(*fb,*fc,fu,(*func)(u, gp));
            }
        } else if ((u-ulim)*(ulim-*cx) >= 0.0) {
            u=ulim;
            fu=(*func)(u, gp);
        } else {
            u = (*cx)+GOLD*(*cx-*bx);
            fu=(*func)(u, gp);
        }
        SHFT(*ax,*bx,*cx,u)
        SHFT(*fa,*fb,*fc,fu)
    }
}

