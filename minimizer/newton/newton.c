/*****************************************************************************

* Author : Ludvig Sundström

* File Name : newton.c

* Purpose : 

* Creation Date : 23-06-2015

* Last Modified : 

*****************************************************************************/

#include <math.h>
#include <stdio.h>
#define MAX_ITER 20

// Using the Newton-Raphson method, find the root of a function known to lie in
// the interval [x1, x2]. The root rtnewt will be refined until its accuracy is
// known within xacc func is a user-supplied routine that returns both the
// function value and the first derivative of the function at the point x;
float newton(void (*funcd)(float, float *, float *), float x1, float x2, 
  float xacc)
{
  int i;
  float df, dx, f, rtn;
  rtn = 0.5;
  /*rtn = 0.5 * (x1 + x2);*/
  for (i = 0; i < MAX_ITER; i++) {
    (*funcd)(rtn, &f, &df);
    dx = f / df;
    rtn -= dx;
    if ((x1 - rtn) * (rtn - x2) < 0.0) {
      printf("Jumped out of brackets\n"); 
      return -99;
    }
    if ((fabs(dx) < xacc)) {
      return rtn;
    }
  }
  printf("Maximum number of iterations");
  return -99;

}

void f (float x, float *f, float *df) {
  *f = x * x - 1; 
  *df = 2 * x;
}

void (*fp)(float, float *, float *) = f;

int main(int argc, char* argv[]) {

  printf("%f\n", newton(fp, -2, 2, 0.1));

  return 0;
}

