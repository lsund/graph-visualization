
void (*test_first_order_gradient)(const GraphPointer graph);
void (*test_second_order_gradient)(const GraphPointer graph);
void (*test_second_order_attraction_gradient)(const BondSet bs);
void (*test_second_order_repulsion_gradient)( const GridPointer grid);
void (*test_third_order_gradient)(const BondConnectionPointer con);
void (*test_fourth_order_gradient)(const BondOverlapPointer crs);

void (*test_first_order_energy)(const GraphPointer graph);
void (*test_second_order_energy)(const GraphPointer graph);
void (*test_second_order_attraction_energy)(const GraphPointer graph);
void (*test_second_order_repulsion_energy)(const GraphPointer graph);
void (*test_third_order_energy)(const GraphPointer graph);
void (*test_fourth_order_energy)(const GraphPointer graph);

