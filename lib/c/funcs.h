
#ifndef FUNCS_H
#define FUNCS_H

void flocal(const Gptr g);
void fglobal(const Gptr g);

void dflocal(const Gptr g);
void dfglobal(const Gptr g);

// For testing 
float first_order(const Gptr g);
float second_order_attraction(const Gptr g);
float second_order_repulsion(const Gptr g);
float second_order(const Gptr g);
float third_order(const Gptr g);
float fourth_order(const Gptr g);

void dfunc1(const Gptr g);
void dfunc2rep(const Gptr g);
void dfunc2attr(const Gptr g);
void dfunc2(const Gptr g);
void dfunc3(const Gptr g);

#endif
