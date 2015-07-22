/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 17-07-2015

*****************************************************************************/

#include <stdlib.h>
#include "../lib/c/util.h"
#include "../lib/c/inits.h"
#include "../lib/c/funcs.h"
#include "../lib/c/conjugate_gradient.h"
#include "../lib/c/constants.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "test.h"
#include "minunit.h"

int minimize(const char *fname);

char *test_minimize() {

    const char *valid0 = "data/test/10-0.json";
    const char *valid1 = "data/test/10-1.json";
    const char *invalid0 = "data/test/invalid/10-0.json";
    const char *invalid1 = "data/test/invalid/10-1.json";
    const char *invalid2 = "data/test/invalid/10-2.json";
    const char *invalid3 = "data/test/invalid/10-3.json";
    const char *invalid4 = "data/test/invalid/10-4.json";
    const char *invalid5 = "data/test/invalid/10-5.json";

    int status;
    pid_t p;

    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(valid0);
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
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid3);
        exit(0);
    } else {
        msg("Invalid data: wrong spelled key bonds...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("5. Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid4);
        exit(0);
    } else {
        msg("Invalid data: No bonds or vertcies...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("6. Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(invalid5);
        exit(0);
    } else {
        msg("Invalid data: Missing key radius...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);
        } else {
            rt_error("6. Child did not terminate with exit");
        }
        msgpass();
    }
    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        minimize(valid1);
        exit(0);
    } else {
        msg("Valid data: vertices but no bonds...");
        wait(&status);
        if (WIFEXITED(status)) {
            mu_assert("ERROR, should not crash", WEXITSTATUS(status) == 0);
        } else {
            rt_error("7. Child did not terminate with exit");
        }
        msgpass();
    }

    return 0;
}
