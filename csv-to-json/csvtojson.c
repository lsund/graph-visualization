/*****************************************************************************

* Author: Ludvig Sundström

* File Name: cvstojson.c

* Description: 

* Creation Date: 28-06-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>


int main (int argc, char *argv[]) {

  FILE *fpr, *fpw;

  char c;
  int nc, nr;
  nc = 0;
  nr = 0;
  
  char *buf = malloc(sizeof(char) * 4500000);
  if (buf == NULL) {
    printf("error while allocating memory\n");
    exit(1);
  }

  fpr = fopen("../../../data/dimt.csv", "r"); 
  fpw = fopen("../../../data/dimt.json", "a"); 

  if (fpr == NULL) {
    printf("error while opening file for reading\n");
    exit(1);
  }
  if (fpw == NULL) {
    printf("error while opening file for writing\n");
    exit(1);
  }

  fwrite("{", 1, 1, fpw);
  while ((c = fgetc(fpr)) != EOF) {

    *(buf + nc) = c;

    if (c == '\n') {
      nr++;
      fwrite("[", 1, 1, fpw);
      fwrite(buf, 1, nc, fpw);
      if (nr == 6040) {
        fwrite("]", 1, 1, fpw);
      } else {
        fwrite("],\n", 1, 3, fpw);
      }
      nc = 0;
    }
    nc++;
  }
  fwrite("}", 1, 1, fpw);

  fclose(fpr);
  fclose(fpw);
  free(buf);

  return 0;

}
