
#ifndef TEST_H
#define TEST_H

#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include "../lib/minimizer/util.h"
#include "../lib/minimizer/graph.h"
#include "../lib/minimizer/energy.h"
#include "../lib/minimizer/gradient.h"
#include "../lib/minimizer/constants.h"
#include "../lib/minimizer/placement.h"
#include "../lib/minimizer/tests.h"
#include "../lib/minimizer/minimizer.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "minunit.h"
#include <time.h>

void msg(const char *s);
void msgpass();

#endif
