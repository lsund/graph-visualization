
#ifndef BRACKET_MINIMUM_H
#define BRACKET_MINIMUM_H

void bracket_minimum(
        GraphPointer gp, 
        float *ax, 
        float *bx, 
        float *cx, 
        float *fa, 
        float *fb, 
        float *fc, 
        float (*func)(float, GraphPointer)
    );

#endif
