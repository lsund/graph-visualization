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
#define ANSI_COLOR_TEST    "\x1b[37m"
#define ANSI_COLOR_RESET   "\x1b[0m"

#ifndef TEST
#define TEST 0
#endif

char *test_angular_gradient();
char *test_bond();
char *test_bond_connection();
char *test_bond_overlap();
char *test_bond_pair();
char *test_bond_set();
char *test_cross_gradient();
char *test_energy();
char *test_global_minimizer();
char *test_gradient();
char *test_graph();
char *test_grid();
char *test_linmin();
char *test_local_minimizer();
char *test_minimizer();
char *test_pair();
char *test_parse_json();
char *test_placement();
char *test_util();
char *test_vector();
char *test_vertex();
char *test_vertex_pair();
char *test_vertex_set();
char *test_zone();
char *test_zone_pair();


int g_findex;

int tot_overlaps;
double tot_energy;
double tot_angres;


void msg(enum MessageOption option, const char *s) 
{
    switch (option) {
        case TESTING:
            fprintf(stdout, ANSI_COLOR_YELLOW "Testing Module >> %s" ANSI_COLOR_RESET, s); 
            break;
        case ASSERTING:
            fprintf(stdout, ANSI_COLOR_YELLOW "Asserting %s" ANSI_COLOR_RESET, s); 
            break;
        case DATA:
            fprintf(stdout, ANSI_COLOR_TEST   "Data           >> %s" ANSI_COLOR_RESET, s); 
            break;
        case STATISTICS:
            fprintf(stdout, ANSI_COLOR_YELLOW ">>         >> %s" ANSI_COLOR_RESET, s); 
            break;
        case LINEBREAK:
            printf("\n");
            break;
        case PASSING:
            fprintf(stdout, ANSI_COLOR_GREEN "\t\t  Passed" ANSI_COLOR_RESET "\n"); 
            break;
        case ERROR:
            fprintf(stdout, ANSI_COLOR_RED   "Error          >> %s" ANSI_COLOR_RESET "\n", s); 
            break;
        case TESTSPASSED:
            fprintf(stdout, ANSI_COLOR_GREEN "ALL TESTS PASSED" ANSI_COLOR_RESET "\n"); 
            break;
    }
}

int tests_run = 0;

static char *test_energies() 
{

	msg(TESTING,"test_angular_gradient\n");
    mu_run_test(test_angular_gradient);
	msg(TESTING,"cross_gradient\n");
    mu_run_test(test_cross_gradient);
	msg(TESTING,"energy\n");
    mu_run_test(test_energy);
	msg(TESTING,"gradient\n");
    mu_run_test(test_gradient);

    return 0;
}

static char *test_graph_constructs() 
{
	msg(TESTING,"bond\n");
    mu_run_test(test_bond);
	msg(TESTING,"test_bond_connection\n");
    mu_run_test(test_bond_connection);
	msg(TESTING,"bond_overlap\n");
    mu_run_test(test_bond_overlap);
	msg(TESTING,"bond_pair\n");
    mu_run_test(test_bond_pair);
	msg(TESTING,"bond_set\n");
    mu_run_test(test_bond_set);
	msg(TESTING,"graph\n");
    mu_run_test(test_graph);
	msg(TESTING,"grid\n");
    mu_run_test(test_grid);
	msg(TESTING,"pair\n");
    mu_run_test(test_pair);
	msg(TESTING,"vector\n");
    mu_run_test(test_vector);
	msg(TESTING,"vertex\n");
    mu_run_test(test_vertex);
	msg(TESTING,"vertex_pair\n");
    mu_run_test(test_vertex_pair);
	msg(TESTING,"vertex_set\n");
    mu_run_test(test_vertex_set);
	msg(TESTING,"zone\n");
    mu_run_test(test_zone);
	msg(TESTING,"zone_pair\n");
    mu_run_test(test_zone_pair);

    return 0;
}

static char *test_computation() 
{
	msg(TESTING,"global_minimizer\n");
    mu_run_test(test_global_minimizer);
	msg(TESTING,"linmin\n");
    mu_run_test(test_linmin);
	msg(TESTING,"local_minimizer\n");
    mu_run_test(test_local_minimizer);
	msg(TESTING,"minimizer\n");
    mu_run_test(test_minimizer);
	msg(TESTING,"placement\n");
    mu_run_test(test_placement);
	msg(TESTING,"util\n");
    mu_run_test(test_util);

    return 0;
}

static char *test_parser()
{
	msg(TESTING,"parse_json\n");
    mu_run_test(test_parse_json);

    return 0;
}

static char *all_tests() {
    
    mu_run_test(test_parser);
    /*mu_assert("Test parser failed", test_parser());*/
    /*test_computation();*/
    /*test_graph_constructs();*/
    /*test_enrgies();*/

    return 0;
}

int main(int argc, char **argv) {
    argc = 0;
    argv = 0;
            
    char *result = all_tests();
    char buf[128];
    if (result != 0) {
        msg(ERROR, result);
    }
    else {
        msg(TESTSPASSED, "");
    }
    sprintf(buf, "Tests run: %d\n", tests_run);
    return result != 0;
}

