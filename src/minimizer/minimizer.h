
#ifndef MINIMIZER_H
#define MINIMIZER_H

// Given a file F under name fname specifying a set of vertices V and a set of
// bonds B, return a set P of floating point coordinates of length 2n where n
// is the maximum index in F. If i is an even non-negative integer, then P[i]
// is the x-coordinate of vertex of index i (vi) and P[i+1] is the y-coordinate
// of vi.
float *Minimizer_run(const char *fname);

int Minimizer_test(int number);

#endif
