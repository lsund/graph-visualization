
#ifndef ENERGY_H
#define ENERGY_H

#include "graph.h"

typedef struct energy Energy, *EnergyPointer;

struct energy {
    double *parts;
    double sum;
};

EnergyPointer Energy_create(const int nv);

void Energy_calculate(const GraphPointer graph);

// FACADE FOR TESTING

void (*test_first_order_energy)(const GraphPointer graph);
void (*test_second_order_energy)(const GraphPointer graph);
void (*test_second_order_attraction_energy)(const GraphPointer graph);
void (*test_second_order_repulsion_energy)(const GraphPointer graph);
void (*test_third_order_energy)(const GraphPointer graph);
void (*test_fourth_order_energy)(const GraphPointer graph);

#endif
