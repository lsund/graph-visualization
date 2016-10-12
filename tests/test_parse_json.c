/*****************************************************************************

 * File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 17-07-2015

*****************************************************************************/
#include <string.h>
#include <stdio.h>
#include "test.h"
#include <unistd.h>
#define CROSS_DUP(fd) dup(fd)
#define CROSS_DUP2(fd, newfd) dup2(fd, newfd)
char * const nulFileName = "/dev/null";

char *tryread(int shouldfail, const char *fname, const char *message) {
    int status;
    pid_t p;

    p = fork();
    if (p < 0) {
        Util_runtime_error("Could not create child");
    } else if (p == 0) {
		int stdoutBackupFd;
		FILE *nullOut;
		stdoutBackupFd = CROSS_DUP(STDERR_FILENO);
		fflush(stderr);
		nullOut = fopen(nulFileName, "w");
		CROSS_DUP2(fileno(nullOut), STDERR_FILENO);
        json_to_vb_pair(fname);
		fflush(stderr);
		fclose(nullOut);
		CROSS_DUP2(stdoutBackupFd, STDERR_FILENO);
		close(stdoutBackupFd);

        exit(0);
    } else {
        msg(DATA, message);
        wait(&status);
        if (WIFEXITED(status)) {
            if (shouldfail) {
                mu_assert("program should fail and terminate", WEXITSTATUS(status) == 1);
            } else {
                mu_assert("program should not fail and terminate", WEXITSTATUS(status) == 0);
            }
        } else {
            mu_assert("Child did not terminate with exit", 0);
        }
        msg(PASSING, "");
    }

    return 0;
}

char *utest_json_to_vb_pair() {

    const char *valid0 = "data/test/valid10.json";
    const char *valid1 = "data/test/valid10-nobonds.json";

    const char *invalid00 = "data/test/invalid10-missing-field-0.json";
    const char *invalid01 = "data/test/invalid10-missing-field-0.json";
    const char *invalid1 = "data/test/invalid10-wrong-spell-key1.json";
    const char *invalid2 = "data/test/invalid10-wrong-spell-key2.json";
    const char *invalid3 = "data/test/invalid10-wrong-spell-key3.json";
    const char *invalid4 = "data/test/invalid10-wrong-spell-key4.json";
    const char *invalid5 = "data/test/invalid10-wrong-spell-key5.json";
    const char *invalid6 = "data/test/invalid10-wrong-spell-key6.json";
    const char *invalid7 = "data/test/invalid10-wrong-spell-key7.json";
    const char *invalid8 = "data/test/invalid10-wrong-spell-key8.json";
    /*const char *invalid2 = "data/test/invalid/10-2.json";*/
    /*const char *invalid3 = "data/test/invalid/10-3.json";*/
    /*const char *invalid4 = "data/test/invalid/10-4.json";*/

    char *ret = 0;
    ret = tryread(0, valid0, "valid data...\n");
    if (ret != 0) { return ret; }
    ret = tryread(0, valid1, "valid data but no bonds...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid00, "invalid data, missing field verticies...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid01, "invalid data, missing field bonds...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid1, "invalid data, misspelled field verticies...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid2, "invalid data, misspelled field fixed...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid3, "invalid data, misspelled field snd...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid4, "invalid data, misspelled field fst...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid5, "invalid data, misspelled field bonds...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid6, "invalid data, misspelled field label...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid7, "invalid data, misspelled field id...\n");
    if (ret != 0) { return ret; }
    ret = tryread(1, invalid8, "invalid data, misspelled field len...\n");
    if (ret != 0) { return ret; }

    /*p = fork();*/
    /*if (p < 0) {*/
        /*Util_runtime_error("Could not create child");*/
    /*} else if (p == 0) {*/
        /*Graph_create(valid1);*/
        /*exit(0);*/
    /*} else {*/
        /*msg(STATISTICS, "Valid data: vertices but no bonds...");*/
        /*wait(&status);*/
        /*if (WIFEXITED(status)) {*/
            /*mu_assert("ERROR, should not crash", WEXITSTATUS(status) == 0);*/
        /*} else {*/
            /*mu_assert("Child did not terminate with exit", 0);*/
        /*}*/
        /*msg(PASSING, "");*/
    /*}*/
    /*p = fork();*/
    /*if (p < 0) {*/
        /*Util_runtime_error("Could not create child");*/
    /*} else if (p == 0) {*/
        /*Graph_create(invalid0);*/
        /*exit(0);*/
    /*} else {*/
        /*msg(STATISTICS, "Invalid data: One missing field...");*/
        /*wait(&status);*/
        /*if (WIFEXITED(status)) {*/
            /*mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);*/
        /*} else {*/
            /*Util_runtime_error("Child did not terminate with exit");*/
        /*}*/
        /*msg(PASSING, "");*/
    /*}*/
    /*p = fork();*/
    /*if (p < 0) {*/
        /*Util_runtime_error("Could not create child");*/
    /*} else if (p == 0) {*/
        /*Graph_create(invalid1);*/
        /*exit(0);*/
    /*} else {*/
        /*msg(STATISTICS, "Invalid data: wrong spelled vertex key...");*/
        /*wait(&status);*/
        /*if (WIFEXITED(status)) {*/
            /*mu_assert("ERROR, should crash", WEXITSTATUS(status) == 1);*/
        /*} else {*/
            /*Util_runtime_error("Child did not terminate with exit");*/
        /*}*/
        /*msg(PASSING, "");*/
    /*}*/
    return 0;
}



char *test_parse_json() {
    mu_run_test(utest_json_to_vb_pair);

    return 0;
}
