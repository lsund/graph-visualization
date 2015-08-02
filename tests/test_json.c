/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 17-07-2015

*****************************************************************************/

#include "test.h"

int minimize(const char *fname);

char *test_minimize() {

    const char *valid0 = "data/test/10-0.json";
    const char *valid1 = "data/test/10-1.json";
    const char *invalid0 = "data/test/invalid/10-0.json";
    const char *invalid1 = "data/test/invalid/10-1.json";
    const char *invalid2 = "data/test/invalid/10-2.json";
    const char *invalid3 = "data/test/invalid/10-3.json";
    const char *invalid4 = "data/test/invalid/10-4.json";

    int status;
    pid_t p;

    p = fork();
    if (p < 0) {
        rt_error("Could not create child");
    } else if (p == 0) {
        Minimizer_run(valid0);
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
        Minimizer_run(invalid0);
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
        Minimizer_run(invalid1);
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
        Minimizer_run(invalid2);
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
        Minimizer_run(invalid3);
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
        Minimizer_run(invalid4);
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
        Minimizer_run(valid1);
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
