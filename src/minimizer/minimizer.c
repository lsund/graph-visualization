/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c
 
 * Description: Defines the minimizer, the engine capable of creating a
 * graph-object G and minimizing its energy as an attempt of finding a good
 * visual representation of G. 
 
 * Creation Date: 24-06-2015

 *****************************************************************************/

#include <unistd.h>
#include <string.h>
#include <dirent.h>
#include <stdio.h>

#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "energy.h"
#include "gradient.h"
#include "local_minimizer.h"
#include "global_minimizer.h"

int nfiles;
int g_findex = -1;
char **fnames;

int tot_overlaps;
double tot_energy;
double tot_angres;

double g_wpot = 0.004;
double g_wrep = 0.8;
double g_watr = 0.5;
double g_wang = 0.00000;
double g_wcrs = 0.040;

float *Minimizer_run(const char *fname) 
{
    assert(fname);
    float *rtn;
    rtn = 0;
    if (access(fname, R_OK) != -1) {

        GraphPointer graph;
        graph = Graph_create(fname);
        if (PRINT_STATISTICS) {
            printf("-----------------------\n");
            printf("Filename: %s\n", fname);
            printf("Vertices: %d, Bonds: %d\n", graph->vs.n, graph->bs.n);
            printf("Number of conncetions %d\n", graph->ncon);
        }
        if (graph->bs.n > 100) {
            fprintf(stderr, "Number of bonds too damn high!\n");
            Graph_free(graph);
            return 0;
        }
        LocalMinimizer_run(graph, Energy_calculate, Gradient_calculate, FTOL);
        GlobalMinimizer_run(graph, Energy_calculate, Gradient_calculate);
        rtn = VertexSet_to_array(graph->vs); 
        Graph_free(graph);
        graph = 0;
    } else {
        assert((sizeof(fname) / sizeof(char)) <= MAX_FILENAME_LENGTH);
        
        printf("Error! in file: %s\n", fname);
        Util_runtime_error("Can't read file");
    }
    return rtn;
}

