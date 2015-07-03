/*****************************************************************************

* Author: Ludvig Sundström

* File Name: getSizes.c

* Description: 

* Creation Date: 02-07-2015

*****************************************************************************/

#include <stdio.h>
#include <math.h>
#include <sys/stat.h>
#include "c_src/json.h"

void norm(float *arr, int length) {
  int i;
  double sum;
  sum = 0.0; 
  for (i = 0; i < length; i++) {
    sum += pow(arr[i], 2);
  }
  double len = sqrt(sum);
  for (i = 0; i < length; i++) {
    arr[i] /= len;
  }
}

void sort(float *rtn, float *sizes, int length) {
  int iter; 
  int index = 1;
  for (index = 1; index <= length; index++) {
    for (iter = 0; iter < length; iter++) {
      if (sizes[iter * 2] == index) {
        rtn[index - 1] = sizes[iter * 2 + 1];
        break;
      }
    }
  }
  free(sizes);
}

static int get_intval(json_value* value, int depth) 
{
  return value->u.integer;
}

static void fill_arr(float *sizes, json_value* value, int ntotal, int depth)
{
  if (value == NULL) {
    return;
  }
  int i, n, v, length;

  length = value->u.array.length;  

  for (i = 0; i < length; i++) {
    json_value *obj= value->u.array.values[i];
    n = get_intval(obj->u.object.values[0].value, depth+1);
    v = get_intval(obj->u.object.values[1].value, depth+1);
    sizes[i * 2] = n;
    sizes[i * 2 + 1] = v;
  }

}

int get_sizes(float *fss, char *filename, int nv) {

  FILE *fp;
  struct stat filestatus;
  int file_size;
  char* file_contents;
  json_char* json;
  json_value* value;

  if (stat(filename, &filestatus) != 0) {
    fprintf(stderr, "File %s not found\n", filename);
    return 1;
  }

  file_size = filestatus.st_size;
  file_contents = (char*)malloc(filestatus.st_size);
  if ( file_contents == NULL) {
    fprintf(stderr, "Memory error: unable to allocate %d bytes\n", file_size);
    return 1;
  }

  fp = fopen(filename, "rt");
  if (fp == NULL) {
    fprintf(stderr, "Unable to open %s\n", filename);
    fclose(fp);
    free(file_contents);
    return 1;
  }

  if (fread(file_contents, file_size, 1, fp) != 1 ) {
    fprintf(stderr, "Unable t read content of %s\n", filename);
    fclose(fp);
    free(file_contents);
    return 1;
  }
  fclose(fp);

  json = (json_char*)file_contents;
  value = json_parse(json,file_size);
  if (value == NULL) {
    fprintf(stderr, "Unable to parse data\n");
    free(file_contents);
    exit(1);
  }
  
  float *sizes = malloc(sizeof(float) * nv * 2); 

  fill_arr(sizes, value, nv, 0);

  sort(fss, sizes, nv);
  norm(fss, nv);

  json_value_free(value);

  free(file_contents);

  return 0;

}

