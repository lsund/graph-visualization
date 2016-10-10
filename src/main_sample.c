/*****************************************************************************

* File Name: main_sample.c

* Author: Ludvig Sundström

* Description: A sample startpoint for a program using the minimizer

* Creation Date: 07-10-2015

*****************************************************************************/

#include <stdio.h>

#include "minimizer/minimizer.h"
#include "minimizer/util.h"

int main(int argc, char *argv[]) 
{
    int nvertices = 10;
    const char *fname = "data/test.json";
    float *ret = Util_allocate(nvertices * 2, sizeof(float));
    Minimizer_run(fname, ret);
    int i;
    for (i = 0; i < nvertices * 2; i += 2) {
        printf("Vertex %d, (%f, %f)\n", i / 2, ret[i], ret[i + 1]);
    }
    return 0;
}
