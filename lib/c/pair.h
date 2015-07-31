
#ifndef PAIR_H
#define PAIR_H

typedef struct pair P, *PP;

struct pair {
    void *fst, *snd; 
};


P pair_initialize(void *fst, void *snd);
PP pair_create(void *fst, void *snd);

#endif
