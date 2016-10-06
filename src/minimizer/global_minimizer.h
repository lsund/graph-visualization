
#ifndef GLOBAL_MINIMIZER
#define GLOBAL_MINIMIZER

#include "energy.h"
#include "graph.h"

typedef enum { RANDOM, HIGH_ENERGY, LOW_CONNECTIVITY } PickingStrategy;

#define DEFAULT_STRAT RANDOM

float GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer),
        void (*g_fun)(GraphPointer)
    );

#endif
