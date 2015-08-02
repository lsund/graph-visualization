
#ifndef PAIR_H
#define PAIR_H

typedef struct Pair Pair, *PairPointer;

struct Pair {
    void *fst, *snd; 
};

Pair Pair_initialize(void *fst, void *snd);
PairPointer Pair_create(void *fst, void *snd);

#endif
