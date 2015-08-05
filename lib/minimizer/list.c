/*****************************************************************************

* File Name: list.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 01-08-2015

*****************************************************************************/

#include <stdlib.h>

#include "util.h"
#include "list.h"

PList List_create(void *val)
{
    PList rtn = (PList) Util_allocate(1, sizeof(List));
    rtn->val = val;
    rtn->next = empty_list();
    return rtn;
}

PList empty_list()
{
    return NULL;
}

void List_free(PList l) 
{
    PList cur = l;
    while(cur != NULL) {
        PList tmp = cur;
        cur = cur->next;
        free(l->val);
        free(tmp);
        tmp = NULL;
    }
}

