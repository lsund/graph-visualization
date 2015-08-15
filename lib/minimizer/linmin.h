
#ifndef LINMIN_H
#define LINMIN_H

#include "energy.h"

void linmin(
      const GraphPointer graph, 
      void (*e_fun)(GraphPointer), 
      double *fret
  );

#endif
