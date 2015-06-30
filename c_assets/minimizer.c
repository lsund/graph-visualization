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

#define STIFFNESS (float) 5.0
#define FTOL 0.0001
#define ROW_MAX_LEN 1000
#define SPAN_X 800
#define SPAN_Y 800

static float *fdm;

static float *ms;

static int dim;
static int nv;
static int blen;

void initDMT(char *filename) 
{

  FILE *fp;

  char *buf = malloc(sizeof(char) * ROW_MAX_LEN);

  if (buf == NULL) {
    rt_error("error in getDMT while allocating memory");
  }

  fp = fopen(filename, "r"); 

  if (fp == NULL) {
    rt_error("error while opening file for reading");
  }

  int i, j, ij;
  char *pend, *p;

  i = 0;
  while (fgets(buf, ROW_MAX_LEN, fp)) {
    p = buf;
    for (j = 0; j < nv; j++) {
      ij = j + (i * nv);
      fdm[ij] = strtof(p, &pend);
      if (fabs(fdm[ij]) < 0.01) {
        fdm[ij] = 0.01;
      }
      p = pend + 1;
    }
    i++;
  }

  fclose(fp);
  free(buf);
}

void initFPS(float *ps) 
{
  int i, n, vdim;
  float gapx, gapy, offsetx, offsety;
  n = nv; 
  while (fabs(sqrt(n) - (int) sqrt(n)) > 0.01) {
    n++;
  }
  vdim = sqrt(n);
  gapx = SPAN_X / vdim;
  gapy = SPAN_Y / vdim;
  offsetx = gapx / 2;
  offsety = gapy / 2;
  int rows = 0;
  int cols = -1;
  for (i = 0; i < dim; i += 2) {
    if (i % (vdim * 2) == 0) {
      rows++;
      cols = 0;
    }
    ps[i] = cols * gapx + offsetx; 
    ps[i + 1] = rows * gapy + offsety; 
    cols++;
  }
  
}

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
      d = fdm[(i / 2) * nv + (j / 2)];
      wij = STIFFNESS;
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
      d = fdm[(i / 2) * nv + (j / 2)];
      wij = STIFFNESS;
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

int minimize (char *dmtFilename, float *flatpos, 
    float *masses, int len, int bondlen) 
{
  int *iter;
  float *fret;

  dim = len;
  nv = len / 2;

  iter = malloc(sizeof(int));
  fret = malloc(sizeof(float));
  fdm = malloc(sizeof(float) * (nv * nv));

  if (iter == NULL || fret == NULL || fdm == NULL) {
    rt_error("Error in minimize when allocating memory");
  }

  initDMT(dmtFilename);
  initFPS(flatpos);

  blen = bondlen;
  ms = masses;
  initFPS(flatpos);
  frprmn(flatpos, dim, FTOL, iter, fret, func, dfunc);

  free(fdm);
  free(fret);
  free(iter);

  return 0;
}

