
#ifndef TEST_H
#define TEST_H

#include <stdlib.h>
#include "../lib/c/util.h"
#include "../lib/c/graph.h"
#include "../lib/c/energy.h"
#include "../lib/c/gradient.h"
#include "../lib/c/constants.h"
#include "../lib/c/minimizer.h"
#include <unistd.h>
#include <sys/types.h> 
#include <sys/wait.h> 
#include "minunit.h"

void msg(const char *s);
void msgpass();

#endif
