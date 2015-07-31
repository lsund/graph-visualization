
#ifndef ENERGY_H
#define ENERGY_H

void Energy_local(const GP gp);
void Energy_global(const GP gp);

// FACADE FOR TESTING

float (*test_first_order_energy)(const GP gp);
float (*test_second_order_energy)(const GP gp);
float (*test_second_order_attraction_energy)(const GP gp);
float (*test_second_order_repulsion_energy)(const GP gp);
float (*test_third_order_energy)(const GP gp);
float (*test_fourth_order_energy)(const GP gp);

#endif
