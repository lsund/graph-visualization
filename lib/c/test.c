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

#include "util.h"
#include "inits.h"
#include "funcs.h"
#include "conjugate_gradient.h"
#include "constants.h"
#include "minunit.h"

#include <sys/types.h> 
#include <sys/wait.h> 

static void msg(const char *s) 
{
    fprintf(stdout, ">>MinUnit>> %s", s); 
}
static void msgpass() 
{
    fprintf(stdout, "passed\n"); 
}

int minimize(const char *fname);

char *test_minimize() {

    const char *valid = "data/test/8.json";
    const char *invalid0 = "data/test/invalid/8-0.json";
    const char *invalid1 = "data/test/invalid/8-1.json";
    const char *invalid2 = "data/test/invalid/8-2.json";
    int status;
    pid_t p;

    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(valid);
        exit(0);
    } else {
        msg("Valid data...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should not crash",
                    WEXITSTATUS(status) == 0);
        } else {
            rt_error("1.Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid0);
        exit(0);
    } else {
        msg("Invalid data: first bracket...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("2.Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid1);
        exit(0);
    } else {
        msg("Invalid data: wrong spelled key...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("3.Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid2);
        exit(0);
    } else {
        msg("Invalid data: only vertices...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("4. Child did not terminate with exit");
        }
    }
    msgpass();
    return 0;
}

int tests_run = 0;

static char *all_tests() {
    mu_run_test(test_minimize);
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
 
