
#ifndef GRADIENT_H
#define GRADIENT_H

#include "graph.h"

void Gradient_calculate(const GraphPointer graph);

// FACADE FOR TESTING

void (*test_first_order_gradient)(const GraphPointer graph);
void (*test_second_order_gradient)(const GraphPointer graph);
void (*test_second_order_attraction_gradient)(const BondSet bs);
void (*test_second_order_repulsion_gradient)( const GridPointer grid);
void (*test_third_order_gradient)(const BondConnectionPointer con);
void (*test_fourth_order_gradient)(const BondCrossPointer crs);

#endif
