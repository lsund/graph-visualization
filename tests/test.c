/*****************************************************************************

* File Name: test.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 05-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>

#include "minunit.h"
#include "../lib/c/graph.h"

int tests_run = 0;

char *test_objective();
/*char *test_gradient();*/

static char *all_tests() {
    mu_run_test(test_objective);
    /*mu_run_test(test_gradient);*/
    return 0;
}

int main(int argc, char **argv) {
    char *result = all_tests();
    if (result != 0) {
        printf("%s\n", result);
    }
    else {
        printf("ALL TESTS PASSED\n");
    }
    printf("Tests run: %d\n", tests_run);

    return result != 0;
}
 

