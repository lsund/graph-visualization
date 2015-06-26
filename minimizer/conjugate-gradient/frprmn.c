/*****************************************************************************

* Author : Numerical recepies in C, modiefied by Ludvig Sundström

* File Name : frprmn.c

* Purpose : Performs Fletcher-Reeves-Polak-Ribiere minimization

* Creation Date : 25-06-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define ITMAX 200
#define EPS 1.0e-10
#define FREEALL free(xi);free(h);free(g);

/** 
 * Given a starting point p, performs minimization on a function func using its
 * gradient calculated by dfunc. The convergence tolerance of func is ftol.
 * Returned quatities are p - the location of the minimum, iter - the number of
 * iterations performed and fret - the minimum value of value. 
 * Calls routine linmin to perform line minimizations.
 */
void frprmn(p, n, ftol, iter, fret, func, dfunc)
float p[], ftol, *fret, (*func)();
void (*dfunc)();
int n, *iter;
{
  int j, its;
  float gg, gam, fp, dgg;
  float *g, *h, *xi, *vector();
  void linmin(), rt_error();

  g = vector(n);
  h = vector(n);
  xi = vector(n);
  fp = (*func)(p);
  (*dfunc)(p, xi);
  for (j = 0; j < n; j++) {
    g[j] = -xi[j];
    xi[j] = h[j] = g[j];
  }
  for (its = 0; its < ITMAX; its++) {
    *iter = its;
    linmin(p, xi, n, fret, func);
    if (2.0 * fabs(*fret - fp) <= ftol * (fabs(*fret) + fabs(fp) + EPS)) {
      FREEALL
      return;
    }
    fp = (*func)(p);
    (*dfunc)(p, xi);
    dgg = gg = 0.0;
    for (j = 0; j < n; j++) {
      gg += g[j] * g[j];
      dgg += (xi[j] + g[j]) * xi[j];
    }
    if (gg == 0.0) {
      FREEALL
      return;
    }
    gam = dgg / gg;
    for (j = 0; j < n; j++) {
      g[j] = -xi[j];
      xi[j] = h[j] = g[j] + gam * h[j];
    }
  }
  rt_error("Too many iterations in frprmn()");
}

#undef ITMAX
#undef EPS
#undef FREEALL

