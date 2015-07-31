
#ifndef FORCE_H
#define FORCE_H

void Force_global(const GP gp);
void Force_local(const GP gp);

// FACADE FOR TESTING

void (*test_first_order_force)(const GP gp);
void (*test_second_order_force)(const GP gp);
void (*test_third_order_force)(const GP gp);
void (*test_fourth_order_force)(const GP gp);
void (*test_second_order_attraction_force)(const GP gp);
void (*test_second_order_repulsion_force)(const GP gp);

#endif
