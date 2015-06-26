/*****************************************************************************

* Author : Ludvig Sundström

* File Name : minimize.c

* Purpose :   

* Creation Date : 24-06-2015

* Last Modified : 

*****************************************************************************/

#include <stdlib.h>
#include <stdio.h>
#include <stddef.h>
#include <math.h>

#define SPRING_LENGTH 200.0
#define STIFFNESS (1 / 20.0)

//Distance matrix
static float **dmat;

// Dimesion of the coordinate vector
static unsigned int len;

static int *iter; 
static float *fret; 

float *convert(float *arr, unsigned int len) {
  float *vector();
  unsigned int j;
  float *rtn = vector(1, len);
  for (j = 1; j <= len; j++) {
    *(rtn + j) = *(arr - 1 + j);
  }
  return rtn;
}

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

float calcFunction (float p[]) {
  unsigned int i, j;
  float rtn = 0;
  for (i = 1; i < len; i += 2) {
    for (j = i + 2; j <= len; j += 2) {
      float d = dmat[i / 2 + 1][j / 2 + 1];
      float wij = d * STIFFNESS;
      float dij = d * SPRING_LENGTH;
      rtn += energy(p[i], p[i + 1], p[j], p[j + 1], wij, dij);
    }
  }
  return rtn;
}

void calcGradient (float p[], float df[]) 
{
  unsigned int i, j;
  for (i = 1; i < len; i += 2) {
    for (j = i + 2; j <= len; j += 2) {
      float d = dmat[i / 2 + 1][j / 2 + 1];
      float wij = d * STIFFNESS;
      float dij = d * SPRING_LENGTH;
      df[i] += force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'x');
      df[i + 1] += force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'y');
      df[j] += -force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'x');
      df[j + 1] += -force(p[i], p[i + 1], p[j], p[j + 1], wij, dij, 'y');
    }
  }
}

float (*func)(float []) = calcFunction;
void (*dfunc)(float [], float []) = calcGradient;

void initialize(float *fdm, unsigned int npos) {
  unsigned int i, j, count;
  dmat = malloc(sizeof(void *) * (npos + 1));
  for (i = 1; i <= npos; i++) {
    *(dmat + i) = malloc(sizeof(float) * (npos + 1));
  }
  count = 0;
  for (i = 1; i <= npos; i++) {
    for (j = 1; j <= npos; j++) {
      *(*(dmat + i) + j) = fdm[count];  
      count++;
    }
  }
  iter = malloc(sizeof(int));
  fret = malloc(sizeof(float));
}

int minimize (float *flatpos, float *flatdmat, unsigned int posLen) 
{
  void frprmn();
  unsigned int i;
  unsigned int nPositions = posLen / 2; 
  if (posLen % 2 != 0) {
    printf("Error: uneven number of positions\n");
    return -1;
  }
  len = posLen;

  initialize(flatdmat, nPositions);
  float *mflatpos = convert(flatpos, posLen);

  frprmn(mflatpos, posLen, 0.0001, iter, fret, func, dfunc);

  printf("\n");
  printf("Min:");
  printf("%f\n", *fret);
  printf("iterations: %d\n", *iter);
  
  for (i = 1; i <= nPositions; i++) {
    free(*(dmat + i)); 
  }
  free(dmat);
  free(fret);
  free(iter);

  for (i = 0; i < len; i++) {
    *(flatpos + i) = *(mflatpos + i + 1);
  }

  return 0; 

}

