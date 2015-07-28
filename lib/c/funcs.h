
#ifndef FUNCS_H
#define FUNCS_H

void flocal(const Gptr graph);
void fglobal(const Gptr graph);

void dflocal(const Gptr graph);
void dfglobal(const Gptr graph);

// For testing 
float func1(const Gptr graph);
float func2attr(const Gptr graph);
float func2rep(const Gptr graph);
float func2(const Gptr graph);
float func3(const Gptr graph);
float func4(const Gptr graph);

void dfunc1(const Gptr graph);
void dfunc2rep(const Gptr graph);
void dfunc2attr(const Gptr graph);
void dfunc2(const Gptr graph);
void dfunc3(const Gptr graph);

#endif
