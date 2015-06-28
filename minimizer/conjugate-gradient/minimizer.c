/*****************************************************************************

* Author: Ludvig Sundström

* File Name: minimizer.c

* Description: Defines an energy function and its derivatives aswell as working
* as minimize() which is the exported function by emscripten.

* Creation Date: 24-06-2015

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#include "util.h"
#include "frprmn.h"

#define STIFFNESS (float) 200.0
#define FTOL 0.0001

static float *fdm;

static float *ms;

static int dim;
static int blen;

float energy (float xi, float yi, float xj, float yj, float wij, float dij)
{
  float dx = xi - xj;
  float dy = yi - yj;
  float dist = (float) sqrt(dx * dx + dy * dy);
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  return wij * (float) pow(dist - dij, 2);
}

float force (float xi, float yi, float xj, float yj, 
  float wij, float dij, char dir)
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
  int i, j;
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
  int i, j;
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

int minimize (float *flatpos, float *flatdmat, float *masses, 
  int len, int bondlen) 
{
  int *iter;
  float *fret;
  
  iter = malloc(sizeof(int));
  fret = malloc(sizeof(float));

  if (iter == NULL || fret == NULL) {
    free(iter);
    free(fret);
    rt_error("Error when allocating memory");
  } else {

    dim = len;
    fdm = flatdmat; 
    blen = bondlen;
    ms = masses;
    frprmn(flatpos, dim, FTOL, iter, fret, func, dfunc);
    free(fret);
    free(iter);
    
    return 0; 
  }
}

