
#ifndef ENERGY_H
#define ENERGY_H

double Energy_calculate(const GraphPointer gp);

// FACADE FOR TESTING

double (*test_first_order_energy)(const VertexSet vs);
double (*test_second_order_energy)(const GraphPointer graph);
double (*test_second_order_attraction_energy)(const BondSet bs);
double (*test_second_order_repulsion_energy)(const GridPointer grid);
double (*test_third_order_energy)(const BondPairPointer con);
double (*test_fourth_order_energy)(const BondCrossPointer crs);

#endif
