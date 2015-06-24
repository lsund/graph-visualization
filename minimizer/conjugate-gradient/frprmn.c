#include <math.h>
#include <stddef.h>
#include <stdlib.h>
#include <stdio.h>

#define ITMAX 200
#define EPS 1.0e-10
#define FREEALL free_vector(xi,1,n);free_vector(h,1,n);free_vector(g,1,n);

void frprmn(p,n,ftol,iter,fret,func,dfunc)
float p[],ftol,*fret,(*func)();
void (*dfunc)();
int n,*iter;
{
  int j,its;
  float gg,gam,fp,dgg;
  float *g,*h,*xi,*vector();
  void linmin(),nrerror(),free_vector();

  g=vector(1,n);
  h=vector(1,n);
  xi=vector(1,n);
  fp=(*func)(p);
  (*dfunc)(p,xi);
  for (j=1;j<=n;j++) {
    g[j] = -xi[j];
    xi[j]=h[j]=g[j];
  }
  for (its=1;its<=ITMAX;its++) {
    *iter=its;
    linmin(p,xi,n,fret,func);
    if (2.0*fabs(*fret-fp) <= ftol*(fabs(*fret)+fabs(fp)+EPS)) {
      FREEALL
      return;
    }
    fp=(*func)(p);
    (*dfunc)(p,xi);
    dgg=gg=0.0;
    for (j=1;j<=n;j++) {
      gg += g[j]*g[j];
      /*		  dgg += xi[j]*xi[j];	*/
      dgg += (xi[j]+g[j])*xi[j];
    }
    if (gg == 0.0) {
      FREEALL
      return;
    }
    gam=dgg/gg;
    for (j=1;j<=n;j++) {
      g[j] = -xi[j];
      xi[j]=h[j]=g[j]+gam*h[j];
    }
  }
  nrerror("Too many iterations in FRPRMN");
}

//returns the function value at point x
float f (float x[]) {
  return x[0] * x[0] * x[0] - 3;
}
float (*func)(float []) = f;

//returns the gradient 
void df (float x[], float g[]) {
  g[0] = 3 * x[0] * x[0];
}
void (*dfunc)(float [], float []) = df;

int cAdd (int x, int y) {
  return x + y;
}

/*int main (int argc, char *argv[]) {*/
  
  /*FILE *fp = fopen("test.txt", "r");*/
  
  /*char c;*/
  /*while ((c = fgetc(fp)) != EOF) {*/
    /*printf("%c", c);*/
  /*} */

  /*fclose(fp);*/

  /*float p[1];*/
  /*p[0] = 0.5;*/

  /*int *iter = malloc(sizeof(int));*/
  /*float *fret = malloc(sizeof(float));*/

  /*frprmn(p, 1, 0.1, iter, fret, func, dfunc);*/

  /*printf("Iterations: %d, minimum: %f", *iter, *fret);*/
      
  /*return 0;*/
/*}*/

#undef ITMAX
#undef EPS
#undef FREEALL

