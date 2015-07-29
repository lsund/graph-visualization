
#ifndef CONJUGATE_GRADIENT_H
#define CONJUGATE_GRADIENT_H

void frprmn(Gptr graph, float ftol, int *iter, float *fret, 
        void (*func)(Gptr), void (*dfunc)(Gptr));
#endif
