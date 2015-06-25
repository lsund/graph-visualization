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

#define STIFFNESS 5


//Distance matrix
float **dmat;

// Dimesion of the coordinate vector
int len;

struct point {
  float x;
  float y;
};

float springEnergy (struct point pi, struct point pj, float wij, float dij) {
  float dx = pi.x - pj.x;
  float dy = pi.y - pj.y;
  float dist = (float) sqrt(dx * dx + dy * dy);
  return wij * (float) pow(dist - dij, 2);
}


float systemEnergy (float *flatpos) {
  int nPositions = len / 2; 
  struct point *positions = malloc(sizeof(struct point) * nPositions);
  int i, j;
  for (i = 0; i < len; i += 2) {
    struct point cp;
    cp.x = *(flatpos + i);
    cp.y = *(flatpos + i + 1);
    *(positions + i / 2) = cp;
  }

  float energy = 0;
  for (i = 0; i < nPositions - 1; i++) {
    for (j = i + 1; j < nPositions; j++) {
      struct point cpi, cpj;
      cpi = positions[i];
      cpj = positions[j];
      energy += springEnergy(cpi, cpj, STIFFNESS, dmat[i][j]);
    }
  }
  free(positions);
  return energy;
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


int minimize (float *flatpos, float *flatdmat, int posLen) {

  int i, j, count;
  int nPositions = posLen / 2; 
  

  //Initialize dmat
  dmat = malloc(sizeof(void *) * nPositions);
  for (i = 0; i < nPositions; i++) {
    *(dmat + i) = malloc(sizeof(float) * nPositions);
  }
  count = 0;
  for (i = 0; i < nPositions; i++) {
    for (j = 0; j < nPositions; j++) {
      *(*(dmat + i) + j) = flatdmat[count];  
      count++;
    }
  }

  len = posLen;
  float e = systemEnergy(flatpos);
  
  printf("%f\n", e);

  free(dmat);

  /*void frprmn();*/

  /*float p[1];*/
  /*p[0] = 0.5;*/

  /*int *iter = malloc(sizeof(int));*/
  /*float *fret = malloc(sizeof(float));*/

  /*frprmn(p, length, 0.1, iter, fret, func, dfunc);*/

  return 0; 

}



