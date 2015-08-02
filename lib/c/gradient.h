
#ifndef GRADIENT_H
#define GRADIENT_H

void Gradient_calculate(const GraphPointer gp);

// FACADE FOR TESTING

void (*test_first_order_gradient)(const GraphPointer gp);
void (*test_second_order_gradient)(const GraphPointer gp);
void (*test_third_order_gradient)(const GraphPointer gp);
void (*test_fourth_order_gradient)(const GraphPointer gp);
void (*test_second_order_attraction_gradient)(const GraphPointer gp);
void (*test_second_order_repulsion_gradient)(const GraphPointer gp);

#endif
