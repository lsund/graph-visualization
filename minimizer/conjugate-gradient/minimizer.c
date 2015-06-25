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
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  return wij * (float) pow(dist - dij, 2);
}

float forceX (struct point pi, struct point pj, float wij, float dij) {
  float dx = pi.x - pj.x;
  float dy = pi.y - pj.y;
  float dist = (float) sqrt(dx * dx + dy * dy);
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  return -2 * wij * dx * (dist - dij) / dist;
} 
float forceY (struct point pi, struct point pj, float wij, float dij) {
  float dx = pi.x - pj.x;
  float dy = pi.y - pj.y;
  float dist = (float) sqrt(dx * dx + dy * dy);
  if (fabs(dist) <  0.1) {
    dist = 1;
  } 
  return -2 * wij * dy * (dist - dij) / dist;
} 

void calcVectorGradient (float p[], float df[]) {
  int nPositions = len / 2; 
  struct point *positions = malloc(sizeof(struct point) * nPositions + 1);
  int i, j;
  for (i = 1; i <= len; i += 2) {
    struct point cp;
    cp.x = p[i];
    cp.y = p[i + 1];
    *(positions + (i / 2) + 1) = cp;
  }
  for (i = 1; i <= nPositions; i++) {
    for (j = i + 1; j <= nPositions; j++) {
      
      struct point cpj, cpi;
      printf("cpi: %d, cpj: %d\n", i, j);
      cpi = positions[i];
      cpj = positions[j];
      float d = dmat[i - 1][j - 1];
      float wij = d * STIFFNESS;
      float dij = d * SPRING_LENGTH;

      df[(i - 1) * 2 + 1] += forceX(cpi, cpj, wij, dij);
      df[(i - 1) * 2 + 2] += forceY(cpi, cpj, wij, dij);
      df[(j - 1) * 2 + 1] += -forceX(cpi, cpj, wij, dij);
      df[(j - 1) * 2 + 2] += -forceY(cpi, cpj, wij, dij);

    }
  }
}

float calcEnergy (float p[]) {
  int nPositions = len / 2; 
  struct point *positions = malloc(sizeof(struct point) * nPositions);
  int i, j;
  for (i = 1; i <= len; i += 2) {
    struct point cp;
    cp.x = p[i];
    cp.y = p[i + 1];
    *(positions + (i - 1) / 2) = cp;
  }
  float energy = 0;
  for (i = 0; i < nPositions - 1; i++) {
    for (j = i + 1; j < nPositions; j++) {
      struct point cpi, cpj;
      cpi = positions[i];
      cpj = positions[j];
      int d = dmat[i][j];
      float wij = d * STIFFNESS;
      float dij = d * SPRING_LENGTH;
      energy += springEnergy(cpi, cpj, wij, dij);
    }
  }
  free(positions);
  return energy;
}

float (*func)(float []) = calcEnergy;
void (*dfunc)(float [], float []) = calcVectorGradient;

float *convert(float *arr, int len) {
  float *vector();
  int j;
  float *rtn = vector(1, len);
  for (j = 1; j <= len; j++) {
    *(rtn + j) = *(arr - 1 + j);
  }
  return rtn;
}

void printvec(float *vec, int len) {
  int j;
  for (j = 1; j <= len; j++) {
    printf("%f", *(vec + j));
    if (j != len) printf(", ");
  }
  printf("\n");
}


int minimize (float *flatpos, float *flatdmat, int posLen) {
  void frprmn();
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

  int *iter = malloc(sizeof(int));
  float *fret = malloc(sizeof(float));
  
  float *mflatpos = convert(flatpos, posLen);

  frprmn(mflatpos, posLen, 0.000001, iter, fret, func, dfunc);

  printf("\n");
  printf("Min:");
  printf("%f\n", *fret);
  printf("iterations: %d\n", *iter);

  free(dmat);

  for (i = 0; i < posLen; i++) {
    *(flatpos + i) = *(mflatpos + i + 1);
  }

  return 0; 

}

  /*for (i = 0; i < len; i++) {*/
    /*printf("%f, ", flatpos[i]);*/
  /*}*/
  /*printf("\n");*/
  /*calcVectorGradient(flatpos, gradient);*/
  /*for (i = 0; i < len; i++) {*/
    /*printf("%f, ", gradient[i]);*/
  /*}*/
  /*printf("\n");*/
  /*for (i = 0; i < len; i++) {*/
    /*printf("%f, ", flatpos[i]);*/
  /*}*/
  /*printf("\n");*/

  /*printf("After: \n");*/
  /*printf("Energy: %f\n", calcEnergy(flatpos));*/
  /*printf("Positions:\n");*/
  /*for (i = 0; i <= len; i++) {*/
    /*printf("%f, ", flatpos[i]);*/
  /*}*/

/*printf("dmat: %f\n", dmat[i][j]);*/

    /*printf(" fabs(*fret -fp): %f\n", fabs(*fret - fp));*/
    /*printf(" ftol %f\n", ftol);*/
    /*printf(" 2 * fabs(*fret -fp): %f\n", 2 * fabs(*fret - fp));*/
    /*printf(" ftol *(fabs(*fret)+fabs(fp)+EPS) %f\n", */
        /*ftol * (fabs(*fret) + fabs(fp) + EPS));*/
    /*printf("*fret: %f\n", *fret);*/
    /*printf("fp: %f\n", fp);*/
    /*printf("______________________________________\n");*/

/*printf("Adding %f X to df[%d]\n", */
    /*forceX(cpi, cpj, d * STIFFNESS, d * SPRING_LENGTH), i * 2);*/
/*printf("Adding %f Y to df[%d]\n", */
    /*forceY(cpi, cpj, d * STIFFNESS, d * SPRING_LENGTH), i * 2 + 1);*/

/*printf("Adding %f X to df[%d]\n", */
    /*-forceX(cpi, cpj, d * STIFFNESS, d * SPRING_LENGTH), j * 2);*/
/*printf("Adding %f Y to df[%d]\n", */
    /*-forceY(cpi, cpj, d * STIFFNESS, d * SPRING_LENGTH), j * 2 + 1);*/
  /*printf("-----------------\n");*/

