
#ifndef GLOBAL_MINIMIZER
#define GLOBAL_MINIMIZER

#include "energy.h"

void GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer)
    );

#endif
