#ifndef LOCAL_MINIMIZER_H
#define LOCAL_MINIMIZER_H

void LocalMinimizer_run(
        const GraphPointer graph, 
        void (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        const double ftol
    );

#endif
