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

int datacounter = 0;

char *test_file(
        const char *descr, 
        char *failmsg, 
        const char *fname, 
        enum FileReadStatus e_fs,
        enum ParseStatus e_ps
    ) 
{
    datacounter++;
    Result result; 
    Pair pr;
    int cond_a, cond_b;
    msgdata(descr, datacounter);
    result = json_to_vb_pair(fname, &pr);
    cond_a = result.file_result.status == e_fs;
    cond_b = result.parse_result.status == e_ps;
    mu_assert(failmsg, cond_a == 1 && cond_b == 1);
    msg(PASSING, "");
    return 0;
}


char *utest_json_to_vb_pair() {

    char *validfailmsg = "valid data should not fail";
    char *len_error = "should fail with length error";
    char *name_error = "should fail with name error";
    char *type_error = "should fail with type error";
    char *range_error = "should fail with range error";
    
    char *errormsg;

    if ((errormsg = test_file(
        "valid data\n", 
        validfailmsg, 
        "data/test/valid11.json",
        FS_SUCCESS, 
        PS_SUCCESS
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "valid data, no bonds\n", 
        validfailmsg, 
        "data/test/valid11-nobonds.json",
        FS_SUCCESS, 
        PS_SUCCESS
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, missing field vertices\n", 
        len_error, 
        "data/test/invalid11-missing-field-0.json",
        FS_SUCCESS, 
        PS_VALUE_LENGTH_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, missing field bonds\n",
        len_error,
        "data/test/invalid11-missing-field-1.json",
        FS_SUCCESS,
        PS_VALUE_LENGTH_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field vertices\n",
        name_error,
        "data/test/invalid11-wrong-spell-key1.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field fixed\n",
        name_error,
        "data/test/invalid11-wrong-spell-key2.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field snd\n",
        name_error,
        "data/test/invalid11-wrong-spell-key3.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field fst\n",
        name_error,
        "data/test/invalid11-wrong-spell-key4.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field bonds\n",
        name_error,
        "data/test/invalid11-wrong-spell-key5.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field label\n",
        name_error,
        "data/test/invalid11-wrong-spell-key6.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field id\n",
        name_error,
        "data/test/invalid11-wrong-spell-key7.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, misspelled field len\n",
        name_error,
        "data/test/invalid11-wrong-spell-key8.json",
        FS_SUCCESS,
        PS_NAME_SPELL_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, double id\n",
        type_error,
        "data/test/invalid11-idtype1.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, string id\n",
        type_error,
        "data/test/invalid11-idtype2.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, position array with 4 coordinates\n",
        len_error,
        "data/test/invalid11-3cords.json",
        FS_SUCCESS,
        PS_VALUE_LENGTH_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, too large x cord\n",
        range_error,
        "data/test/invalid11-cord-value1.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, too small x cord\n",
        range_error,
        "data/test/invalid11-cord-value2.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, too large  y cord\n",
        range_error,
        "data/test/invalid11-cord-value3.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, too small y cord \n",
        range_error,
        "data/test/invalid11-cord-value4.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, integer coordinates\n",
        type_error,
        "data/test/invalid11-cord-type.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, fixed set to a string \n",
        type_error,
        "data/test/invalid11-fixed-type.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, integer label\n",
        type_error,
        "data/test/invalid11-label-type.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }

    if ((errormsg = test_file(
        "Invalid data, fst is an array\n",
        type_error,
        "data/test/invalid11-fst-type.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Invalid data, snd is a string\n",
        type_error,
        "data/test/invalid11-snd-type.json",
        FS_SUCCESS,
        PS_VALUE_TYPE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Empty file\n",
        "should not be able to parse no data",
        "data/test/nothing.json",
        FS_EMPTY,
        PS_NO_PARSE
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "No verticies\n",
        "should not be able to parse no data",
        "data/test/invalid-novertex.json",
        FS_SUCCESS,
        PS_NO_PARSE
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "too large vertex index\n",
        range_error,
        "data/test/invalid11-too-large-index.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "negative vertex index\n",
        range_error,
        "data/test/invalid11-negative-index.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "duplicate vertex index\n",
        range_error,
        "data/test/invalid11-duplicate-index.json",
        FS_SUCCESS,
        PS_VALUE_RANGE_ERROR
    ))) { return errormsg; }

    if ((errormsg = test_file(
        "invalid json 1\n",
        "should not be able to parse data",
        "data/test/invalid1.json",
        FS_SUCCESS,
        PS_NO_PARSE
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "invalid json 2\n",
        "should not be able to parse data",
        "data/test/invalid2.json",
        FS_SUCCESS,
        PS_NO_PARSE
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Data contains something else than verticies and bonds\n",
        len_error,
        "data/test/invalid11-too-manyfields.json",
        FS_SUCCESS,
        PS_VALUE_LENGTH_ERR
    ))) { return errormsg; }
    if ((errormsg = test_file(
        "Not existing file\n",
        "file should not be found",
        "asonetuhasoneuhulrcaog2g3423.json",
        FS_FILE_NOT_FOUND,
        PS_NO_PARSE
    ))) { return errormsg; }

    Pair pr;
    json_to_vb_pair("data/test/valid11.json", &pr);
    VertexSetPointer vs;
    vs = (VertexSetPointer) pr.fst; 
    BondSetPointer bs;
    bs = (BondSetPointer) pr.snd; 
    msgdata("The return values are sane\n", ++datacounter);
    mu_assert("returned value should not be null", pr.fst != NULL);
    mu_assert("returned value should not be null", pr.snd != NULL);
    mu_assert("should be 11 verticies", vs->n == 11);
    mu_assert("should be 5 bonds", bs->n == 5);
    msg(PASSING, "");

    return 0;
}


char *test_parse_json() {
    mu_run_utest(utest_json_to_vb_pair);

    return 0;
}
