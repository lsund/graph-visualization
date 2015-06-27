/*****************************************************************************

* Author : Ludvig Sundström

* File Name : minimize.c

* Purpose :   

* Creation Date : 24-06-2015

* Last Modified : 

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#define STIFFNESS 200.0
#define FTOL 0.0001

//Distance matrix
static float *fdm;

static float *ms;

// Dimesion of the coordinate vector
static unsigned int dim;
static unsigned int blen;

static int *iter; 
static float *fret; 

float energy (xi, yi, xj, yj, wij, dij)
float xi, yi, xj, yj, wij, dij; 
{
  float dx = xi - xj;
  float dy = yi - yj;
  float dist = (float) sqrt(dx * dx + dy * dy);
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  return wij * (float) pow(dist - dij, 2);
}

float force (xi, yi, xj, yj, wij, dij, dir)
float xi, yi, xj, yj, wij, dij; 
char dir;
{
  float dx = xi - xj;
  float dy = yi - yj; 
  float dist = (float) sqrt(dx * dx + dy * dy);
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  if (dir == 'x')
    return -2 * wij * dx * (dist - dij) / dist;
  else 
    return -2 * wij * dy * (dist - dij) / dist;
} 

float calcFunction (float p[]) 
{
  unsigned int i, j;
  float rtn, d, wij, dij;
  rtn = 0;
  for (i = 0; i < dim - 1; i += 2) {
    for (j = i + 2; j < dim; j += 2) {
      d = fdm[(i / 2) * (dim / 2) + (j / 2)];
      wij = d * STIFFNESS;
      dij = d * blen;
      rtn += energy(p[i], p[i + 1], p[j], p[j + 1], wij, dij);
    }
  }
  return rtn;
}

void calcGradient (float p[], float df[]) 
{
  unsigned int i, j;
  float d, wij, dij;
  for (i = 0; i < dim; i += 2) {
    for (j = i + 2; j < dim; j += 2) {
      d = fdm[(i / 2) * (dim / 2) + (j / 2)];
      wij = d * STIFFNESS;
      dij = d * blen;
      df[i] += force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'x');
      df[i + 1] += force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'y');
      df[j] += -force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'x');
      df[j + 1] += -force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'y');
    }
  }
}

float (*func)(float []) = calcFunction;
void (*dfunc)(float [], float []) = calcGradient;

int minimize (flatpos, flatdmat, masses, len, bondlen) 
float *flatpos, *flatdmat, *masses;
unsigned int len, bondlen;
{
  void frprmn();
  if (len % 2 != 0) {
    printf("Error: uneven number of positions\n");
    return -1;
  }

  dim = len;
  fdm = flatdmat; 
  blen = bondlen;
  iter = malloc(sizeof(int));
  fret = malloc(sizeof(float));
  ms = masses;

  frprmn(flatpos, dim, FTOL, iter, fret, func, dfunc);

  free(fret);
  free(iter);

  return 0; 
}

