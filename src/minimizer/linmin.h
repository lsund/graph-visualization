
#ifndef LINMIN_H
#define LINMIN_H

#include "energy.h"

// The minimum value of the function pointed to by e_fun
void linmin(
      const GraphPointer graph, 
      void (*e_fun)(GraphPointer), 
      double *o_min
  );

#endif
