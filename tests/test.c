/*****************************************************************************

* File Name: test.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 16-07-2015

*****************************************************************************/

#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>
#include "test.h"
#include "minunit.h"

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"

#ifndef TEST
#define TEST 0
#endif

char *test_util();
char *test_json();
char *test_gradient();
char *test_vertex();
char *test_bond();
char *test_bondpair();
char *test_bondcross();
char *test_graph();
char *test_global();
char *test_vertexset();

int g_findex;

int tot_overlaps;
double tot_energy;
double tot_angres;

void msg(const char *s) 
{
    fprintf(stdout, ANSI_COLOR_YELLOW ">>MinUnit>> %s" ANSI_COLOR_RESET, s); 
}
void msgpass() 
{
    fprintf(stdout, ANSI_COLOR_GREEN "passed" ANSI_COLOR_RESET "\n"); 
}

int tests_run = 0;

static char *all_tests() {
    msg("#################### TEST SYSTEM INPUT ###################\n\n");
    mu_run_test(test_json);
    printf("\n");
    msg("#################### TEST UTIL ###########################\n\n");
    mu_run_test(test_util);
    printf("\n");
    msg("#################### TEST VERTEX #########################\n\n");
    mu_run_test(test_vertex); 
    printf("\n");
    msg("#################### TEST BOND ###########################\n\n");
    mu_run_test(test_bond);
    printf("\n");
    msg("#################### TEST BOND PAIR ######################\n\n");
    mu_run_test(test_bondpair);
    printf("\n");
    msg("#################### TEST BOND CROSS #####################\n\n");
    mu_run_test(test_bondcross);
    printf("\n");
    msg("#################### TEST VERTEX SET #####################\n\n");
    mu_run_test(test_vertexset);
    printf("\n");
    msg("#################### TEST GRADIENT #######################\n\n");
    mu_run_test(test_gradient);
    printf("\n");
    msg("#################### TEST GRAPH ##########################\n\n");
    mu_run_test(test_graph);
    printf("\n");
    msg("#################### TEST GLOBAL OPTIMIZER ###############\n\n");
    mu_run_test(test_global);
    printf("\n");
    return 0;
}

int main(int argc, char **argv) {
            
    if (TEST) {
        char *result = all_tests();
        printf("Tests run: %d\n", tests_run);
        if (result != 0) {
            printf("%s\n", result);
        }
        else {
            printf("ALL TESTS passed\n");
            int msec;
            clock_t start, diff;
            start = clock();
            Minimizer_run("data/test/3.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("3 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
            start = clock();
            Minimizer_run("data/test/23.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("23 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
            Minimizer_run("data/test/52.json");
            diff = clock() - start;
            msec = diff * 1000 / CLOCKS_PER_SEC;
            printf("52 vertices: \n%d seconds %d milliseconds \n", 
                    msec / 1000, msec % 1000);
        }
        return result != 0;
    } else {
        Minimizer_load_files();
        double potentials[2] = {0.0001, 0.0002};
        double repulsions[4] = {0.5, 0.6, 0.8, 1.0};
        double attractions[5] = {0.2, 0.4, 0.5, 0.6, 0.8};
        double angulars[2] = {0.0, 0.00001};
        double overlaps[5] = {0.2, 0.3, 0.4, 0.6, 0.8};

        int best_overlaps = 999999;
        double best_angres = 999999.0;
        double best_energy = 999999.0;

        double best_overlap_config[5] = {0.0, 0.0, 0.0, 0.0, 0.0};
        double best_angres_config[5] = {0.0, 0.0, 0.0, 0.0, 0.0};
        double best_energy_config[5] = {0.0, 0.0, 0.0, 0.0, 0.0};

        int i, j, k, l, m;
        for(i = 0; i < 2; i++) {
            for(j = 0; j < 4; j++) {
                for(k = 0; k < 5; k++) {
                    for(l = 0; l < 2; l++) {
                        for(m = 0; m < 5; m++) {
                            tot_overlaps = 0;
                            tot_angres = 0.0;
                            tot_energy = 0.0;
                            g_findex = -1;
                            Minimizer_run_all(
                                    potentials[i],
                                    repulsions[j],
                                    attractions[k],
                                    angulars[l],
                                    overlaps[m]
                                );
                            if (tot_overlaps <= best_overlaps) {
                                best_overlaps = tot_overlaps;
                                best_overlap_config[0] = potentials[i];
                                best_overlap_config[1] = repulsions[j];
                                best_overlap_config[2] = attractions[k];
                                best_overlap_config[3] = angulars[l];
                                best_overlap_config[4] = overlaps[m];
                            }
                            if (tot_angres <= best_angres) {
                                best_angres = tot_angres;
                                best_angres_config[0] = potentials[i];
                                best_angres_config[1] = repulsions[j];
                                best_angres_config[2] = attractions[k];
                                best_angres_config[3] = angulars[l];
                                best_angres_config[4] = overlaps[m];
                            }
                            if (tot_energy <= best_energy) {
                                best_energy = tot_energy;
                                best_energy_config[0] = potentials[i];
                                best_energy_config[1] = repulsions[j];
                                best_energy_config[2] = attractions[k];
                                best_energy_config[3] = angulars[l];
                                best_energy_config[4] = overlaps[m];
                            }
                        }
                    }
                }
            }
        }
        printf("\nBest energy config: \n wpot %f\n wrep %f\n watr %f\n wang %f\n wcrs %f\n",
                best_energy_config[0],
                best_energy_config[1],
                best_energy_config[2],
                best_energy_config[3],
                best_energy_config[4]);
        printf("\nBest overlap config: \n wpot %f\n wrep %f\n watr %f\n wang %f\n wcrs %f\n",
                best_overlap_config[0],
                best_overlap_config[1],
                best_overlap_config[2],
                best_overlap_config[3],
                best_overlap_config[4]);
        printf("\nBest angres config: \n wpot %f\n wrep %f\n watr %f\n wang %f\n wcrs %f\n",
                best_angres_config[0],
                best_angres_config[1],
                best_angres_config[2],
                best_angres_config[3],
                best_angres_config[4]);
        Minimizer_unload_files();
        return 0;
    }
}

