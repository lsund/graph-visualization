/*****************************************************************************

* File Name: main_sample.c

* Author: Ludvig Sundström

* Description: A sample startpoint for a program using the minimizer

* Creation Date: 07-10-2015

*****************************************************************************/

#include "metafile.h"

int main(int argc, char *argv[]) 
{
    if (argc == 2) {
        // Just for demonstration
        const char *fname = argv[1];
        Minimizer_run(fname);
        return 0;
    }
    return 1;
}
