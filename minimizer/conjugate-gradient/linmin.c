/*****************************************************************************

* Author: Numerical recepies in C, modified by Ludvig Sundström

* File Name: linmin.c

* Description: Performs line minimization.

* Creation Date: 25-06-2015

*****************************************************************************/

#include <stdlib.h>

#define TOL 2.0e-4 

int ncom; 
float *pcom, *xicom, (*nrfunc)(float []);   

/*  Given an n-dimensional point p[1..n] and an n-dimensional direction
xi[1..n], moves and resets p to where the function func(p) takes on a
minimum along the direction xi from p, and replaces xi by the actual
vector displacement that p was moved. Also returns as fret the value
of func at the returned location p. This is actually all accomplished
by calling the routines mnbrak and brent.  
*/   
void linmin(float p[], float xi[], int n, float *fret, float (*func)())   
{   
  float brent(float ax, float bx, float cx,   
    float (*f)(float), float tol, float *xmin);   
  float f1dim(float x);   
  void mnbrak(float *ax, float *bx, float *cx, float *fa, float *fb,   
  float *fc, float (*func)(float));   
  int i;   
  float *vector();
  float xx, xmin, fx, fb, fa, bx, ax;   
  ncom = n; 
  pcom = vector(n);   
  xicom = vector(n);   
  nrfunc = func;   
  for (i = 0; i < n; i++) {   
    pcom[i] = p[i];   
    xicom[i] = xi[i];   
  }   
  ax = 0.0; 
  xx = 1.0;   
  mnbrak(&ax, &xx, &bx, &fa, &fx, &fb, f1dim);   
  *fret = brent(ax, xx, bx, f1dim, TOL, &xmin);   
  for (i=0; i<n; i++) { 
    xi[i] *= xmin;   
    p[i] += xi[i];   
  }   
  free(xicom);
  free(pcom);
}   


//Must accompany linmin.   
float f1dim(float x)   
{   
  float *vector();
  int i;   
  float f, *xt;   
  xt = vector(ncom);   
  for (i = 0; i <ncom; i++) {
    xt[i] = pcom[i] + x * xicom[i];   
  }
  f = (*nrfunc)(xt);   
  free(xt);
  return f;   
}  

