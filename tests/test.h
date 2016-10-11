
#ifndef TEST_H
#define TEST_H

#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include "../src/minimizer/util.h"
#include "../src/minimizer/graph.h"
#include "../src/minimizer/energy.h"
#include "../src/minimizer/gradient.h"
#include "../src/minimizer/constants.h"
#include "../src/minimizer/placement.h"
#include "../src/minimizer/tests.h"
#include "../src/minimizer/minimizer.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "minunit.h"
#include <time.h>

void msg(const char *s);
void msgpass();

#endif
