/*****************************************************************************

* File Name: test_util.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-08-2015

*****************************************************************************/


#include "test.h"

char *test_util() 
{
    
    double min = 0; double max = 100; 

    double v[3] = {0.0, 100.0, 50.0};

    Util_normalize(v, 3, 1, min, max);

    double v2[3] = {0.0, 100.0, 50.0};

    Util_normalize(v2, 3, 2, min, max);

    double v3[3] = {33, 66, 99};

    Util_normalize(v3, 3, 1, min, max);

    msg(STATISTICS, "Testing normalization...");

    mu_assert("normalized value incorrect", Util_equal(v[0], 0));
    mu_assert("normalized value incorrect", Util_equal(v[1], 1));
    mu_assert("normalized value incorrect", Util_equal(v[2], 0.5));

    mu_assert("normalized value incorrect", Util_equal(v2[0], 0));
    mu_assert("normalized value incorrect", Util_equal(v2[1], 2));
    mu_assert("normalized value incorrect", Util_equal(v2[2], 1));

    mu_assert("normalized value incorrect", Util_equal(v3[0], 0.33));
    mu_assert("normalized value incorrect", Util_equal(v3[1], 0.66));
    mu_assert("normalized value incorrect", Util_equal(v3[2], 0.99));
    msg(PASSING, "");

    return 0;
}

