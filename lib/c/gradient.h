
#ifndef GRADIENT_H
#define GRADIENT_H

void Gradient_calculate(const GraphPointer gp, const VectorPointer gradient);

// FACADE FOR TESTING

void (*test_first_order_gradient)(
        const VertexSet vs, 
        const VectorPointer gradient
    );
void (*test_second_order_gradient)(
        const GraphPointer graph, 
        const VectorPointer gradient);
void (*test_second_order_attraction_gradient)(
        const BondSet bs, 
        const VectorPointer gradient
    );
void (*test_second_order_repulsion_gradient)(
        const GridPointer grid, 
        const VectorPointer gradient
    );
void (*test_third_order_gradient)(
        const BondPairPointer con, 
        const VectorPointer gradient
    );
void (*test_fourth_order_gradient)(
        const BondCrossPointer crs, 
        const VectorPointer gradient
    );

#endif
