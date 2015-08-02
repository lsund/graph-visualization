
#ifndef ENERGY_H
#define ENERGY_H

float Energy_calculate(const GraphPointer gp);

// FACADE FOR TESTING

float (*test_first_order_energy)(const GraphPointer gp);
float (*test_second_order_energy)(const GraphPointer gp);
float (*test_second_order_attraction_energy)(const GraphPointer gp);
float (*test_second_order_repulsion_energy)(const GraphPointer gp);
float (*test_third_order_energy)(const GraphPointer gp);
float (*test_fourth_order_energy)(const GraphPointer gp);

#endif
