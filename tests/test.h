
#ifndef TEST_H
#define TEST_H

#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include <time.h>

#include "../src/minimizer/parse_json.h"
#include "../src/minimizer/util.h"
#include "../src/minimizer/graph.h"
#include "../src/minimizer/energy.h"
#include "../src/minimizer/gradient.h"
#include "../src/minimizer/constants.h"
#include "../src/minimizer/placement.h"
#include "../src/minimizer/tests_exports.h"
#include "../src/minimizer/minimizer.h"
#include "minunit.h"

enum MessageOption { 
    TESTING,
    ASSERTING,
    STATISTICS,
    DATA,
    PASSING,
    LINEBREAK,
    ERROR,
    TESTSPASSED 
};

void msg(enum MessageOption, const char *s);
void msgpass();

#endif
