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

#include "emscripten.h"
#include "util.h"
#include "constants.h"
#include "graph.h"
#include "process_input.h"
#include "energy.h"
#include "gradient.h"
#include "local_minimizer.h"
#include "global_minimizer.h"
#include "js_interact.h"
#include "minimizer.h"
#include "vertex_set.h"

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

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
        /*GlobalMinimizer_run(graph, Energy_calculate, Gradient_calculate);*/
        if (EMSCRIPT) {
            printf("emscript;;\n");
            VertexSet_print(graph->vs);
            js_interact(graph);
        } else {
            printf("normal;;\n");
            VertexSet_print(graph->vs);
            rtn = VertexSet_to_array(graph->vs); 
        }
        Graph_free(graph);
        graph = 0;
    } else {
        assert((sizeof(fname) / sizeof(char)) <= MAX_FILENAME_LENGTH);
        
        printf("Error! in file: %s\n", fname);
        Util_runtime_error("Can't read file");
    }
    return rtn;
}

/*int get_files(char **fnames) {*/
    /*char sourcepath[64];*/
    /*strcpy(sourcepath, "data/json");*/
    /*DIR *dir;*/
    /*struct dirent *ent;*/
    /*if ((dir = opendir(sourcepath)) != NULL) {*/
        /*int i = 0;*/
        /*while ((ent = readdir(dir)) != NULL) {*/
            /*if ((strcmp(ent->d_name, ".") != 0) &&*/
                    /*(strcmp(ent->d_name, "..") != 0)) */
            /*{*/
                /*sprintf(fnames[i], "%s/%s", sourcepath, ent->d_name);*/
                /*i++;*/
            /*}*/
        /*}*/
        /*closedir(dir);*/
        /*return i;*/
    /*} else {*/
        /*perror("Error");*/
        /*return -1;*/
    /*}*/
/*}*/

/*int Minimizer_load_files()*/
/*{*/
    /*fnames = Util_allocate(MAX_FILES, sizeof(void *));*/
    /*int i;*/
    /*for (i = 0; i < MAX_FILES; i++) {*/
        /*fnames[i] = Util_allocate(MAX_FILENAME_LENGTH, sizeof(char));*/
    /*}*/
    /*nfiles = get_files(fnames);*/
    /*printf("Files loaded\n");*/
    /*return 0;*/
/*}*/

/*int Minimizer_unload_files() {*/
    /*int i;*/
    /*for (i = 0; i < MAX_FILES; i++) {*/
        /*free(fnames[i]);*/
    /*}*/
    /*free(fnames);*/
    /*return 0;*/
/*}*/

/*float Minimizer_run_next()*/
/*{*/
    /*g_findex++;*/
    /*return Minimizer_run(fnames[g_findex]);*/
/*}*/

/*void Minimizer_run_all(double wpot, double wrep, double watr, double wang, double wcrs)*/
/*{*/
    /*g_wpot = wpot;*/
    /*g_wrep = wrep;*/
    /*g_watr = watr;*/
    /*g_wang = wang;*/
    /*g_wcrs = wcrs;*/
    /*int i;*/
    /*float tot_energy_improvement = 0;*/
    /*for (i = 0; i < nfiles; i++) {*/
        /*float energy_improvement = Minimizer_run_next();*/
        /*tot_energy_improvement += energy_improvement;*/
        /*printf("%f\n", energy_improvement);*/
    /*}*/
    /*printf("%d files processed\n", i);*/
    /*printf("Total improvement%f\n", tot_energy_improvement);*/
    /*printf("Average improvement%f\n", tot_energy_improvement / nfiles);*/
    /*printf("Total overlaps: %d\n", tot_overlaps);*/
    /*printf("Tot angular res: %f\n", tot_angres);*/
    /*printf("Tot energy: %f\n", tot_energy);*/
/*}*/

