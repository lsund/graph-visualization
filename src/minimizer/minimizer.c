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
#include "parse_json.h"
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

double g_wpot = 0.005;
double g_wrep = 1.0;
double g_watr = 0.4;
double g_wang = 0;
double g_wcrs = 0;

void Minimizer_run(const char *fname, float *out) 
{
    assert(fname);
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
            return;
        }
        LocalMinimizer_run(graph, Energy_calculate, Gradient_calculate, FTOL);
        /*GlobalMinimizer_run(graph, Energy_calculate, Gradient_calculate);*/
        VertexSet_to_array(graph->vs, out); 
        Graph_free(graph);
        graph = 0;
    } else {
        assert((sizeof(fname) / sizeof(char)) <= MAX_FILENAME_LENGTH);
        printf("Error! in file: %s\n", fname);
        Util_runtime_error("Can't read file");
    }
}

