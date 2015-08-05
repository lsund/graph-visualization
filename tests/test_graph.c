/*****************************************************************************

* File Name: test_graph.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 05-08-2015

*****************************************************************************/

#include "test.h"

char *test_graph() 
{
    const char *fname = "data/4.json";
    GraphPointer graph = Graph_create(fname);
    
    int ncrs = 0; int ncon = 0;
    BondPairPointer cur_con = graph->con;
    BondCrossPointer cur_crs = graph->crs;
    while (cur_con) {
        ncon++; 
        cur_con = cur_con->next;
    }
    while (cur_crs) {
        ncrs++; 
        cur_crs = cur_crs->next;
    }

    msg("Checking that the number or crosses has been detected...");
    mu_assert("Wrong number of crosses", ncrs == 1);
    msgpass();

    msg("Checking that the number of connections has been detected...");
    mu_assert("Wrong number of connected", ncon == 8);
    msgpass();

    Graph_free(graph);

    return 0;
}
