
#ifndef PAIR_H
#define PAIR_H

// A pair is a generic set of two void pointers.
typedef struct Pair Pair, *PairPointer;

struct Pair {
    void *fst, *snd; 
};

// The Pair of the specified pointers.
Pair Pair_initialize(void *fst, void *snd);

// The pointer to the pair of the specified pointer.
PairPointer Pair_create(void *fst, void *snd);

#endif
