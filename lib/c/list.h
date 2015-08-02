
#ifndef LIST_H
#define LIST_H

typedef struct List List, *PList;

struct List {
    void *val;
    PList next;
};

PList List_create(void *val);

PList empty_list();

void List_free(PList l);

#endif
