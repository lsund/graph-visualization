
#ifndef ENERGY_H
#define ENERGY_H

float Energy_calculate(const GraphPointer gp);

// FACADE FOR TESTING

float (*test_first_order_energy)(const VertexSet vs);
float (*test_second_order_energy)(const GraphPointer graph);
float (*test_second_order_attraction_energy)(const BondSet bs);
float (*test_second_order_repulsion_energy)(const GridPointer grid);
float (*test_third_order_energy)(const BondPairPointer con);
float (*test_fourth_order_energy)(const BondCrossPointer crs);

#endif
