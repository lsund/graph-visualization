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

char *utest_json_to_vb_pair() {

    const char *valid0 = "data/test/valid10.json";
    const char *valid1 = "data/test/valid10-nobonds.json";

    const char *invalid00 = "data/test/invalid10-missing-field-0.json";
    const char *invalid01 = "data/test/invalid10-missing-field-1.json";
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
    
    Pair pr;
    Result result;
    int fs, ps;
   
    msg(DATA, "valid data...\n");
    result = json_to_vb_pair(valid0, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_SUCCESS;
    mu_assert("valid data should not fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "valid data, no bonds...\n");
    result = json_to_vb_pair(valid1, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_SUCCESS;
    mu_assert("valid data should not fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, missing field verticies...\n");
    result = json_to_vb_pair(invalid00, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_VALUE_LENGTH_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, missing field bonds...\n");
    result = json_to_vb_pair(invalid01, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_VALUE_LENGTH_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field vertices...\n");
    result = json_to_vb_pair(invalid1, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field fixed...\n");
    result = json_to_vb_pair(invalid2, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field snd...\n");
    result = json_to_vb_pair(invalid3, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field fst...\n");
    result = json_to_vb_pair(invalid4, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field bonds...\n");
    result = json_to_vb_pair(invalid5, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field label...\n");
    result = json_to_vb_pair(invalid6, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field id...\n");
    result = json_to_vb_pair(invalid7, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    msg(DATA, "Invalid data, misspelled field len...\n");
    result = json_to_vb_pair(invalid8, &pr);
    fs = result.file_result.status == FS_SUCCESS;
    ps = result.parse_result.status == PS_NAME_SPELL_ERR;
    mu_assert("invalid data should fail", fs == 1 && ps == 1);
    msg(PASSING, "");

    return 0;
}



char *test_parse_json() {
    mu_run_test(utest_json_to_vb_pair);

    return 0;
}
