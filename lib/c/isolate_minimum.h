#ifndef ISOLATE_MINIMUM_H
#define ISOLATE_MINIMUM_H

float isolate_minimum(GraphPointer gp, float ax, float bx, float cx, 
        float (*f)(float, GraphPointer), float tol, float *xmin);   

#endif

