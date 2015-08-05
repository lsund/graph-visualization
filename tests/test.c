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
#include "test.h"
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
char *test_vertex();
char *test_bond();
char *test_bondpair();
char *test_bondcross();
char *test_graph();
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
    mu_run_test(test_vertex);
    mu_run_test(test_bond);
    mu_run_test(test_bondpair);
    mu_run_test(test_bondcross);
    mu_run_test(test_graph);
    return 0;
}

int main(int argc, char **argv) {
            
    if (TEST) {
        char *result = all_tests();
        printf("Tests run: %d\n", tests_run);
        if (result != 0) {
            printf("%s\n", result);
        }
        else {
            printf("ALL TESTS passed\n");
            int msec;
            clock_t start, diff;
            start = clock();
            Minimizer_run("data/3.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("3 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
            start = clock();
            Minimizer_run("data/23.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("23 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
            Minimizer_run("data/52.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("52 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
        }
        return result != 0;
    } else {
        Minimizer_run("data/52.json");
        return 0;
    }
}

