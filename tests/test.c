/*****************************************************************************

* File Name: test.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 16-07-2015

*****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>

#include "minunit.h"

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"

#ifndef TEST
#define TEST 0
#endif

char *test_minimize();
char *test_objective();
char *test_gradient();
int minimize(const char *fname);

void msg(const char *s) 
{
    fprintf(stdout, ANSI_COLOR_YELLOW ">>MinUnit>> %s" ANSI_COLOR_RESET, s); 
}
void msgpass() 
{
    fprintf(stdout, ANSI_COLOR_GREEN "passed" ANSI_COLOR_RESET "\n"); 
}

int tests_run = 0;

static char *all_tests() {
    mu_run_test(test_minimize);
    mu_run_test(test_objective);
    mu_run_test(test_gradient);
    return 0;
}

int main(int argc, char **argv) {
    
    if (TEST) {
        char *result = all_tests();
        if (result != 0) {
            printf("%s\n", result);
        }
        else {
            printf("ALL TESTS PASSED\n");
        }
        printf("Tests run: %d\n", tests_run);
        return result != 0;
    } else {
        minimize("data/test/4-1.json");
        return 0;
    }
}

