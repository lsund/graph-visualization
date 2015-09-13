#ifndef LOCAL_MINIMIZER_H
#define LOCAL_MINIMIZER_H

#include "graph.h"

// Iteratively find a local minimum of the function pointed to by e_fun,
// provided its gradient g_fun and a tolerance of ftol. Use those values to
// modify the specified graph, for a good representation.
void LocalMinimizer_run(
        const GraphPointer graph, 
        void (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        const double ftol
    );

#endif
