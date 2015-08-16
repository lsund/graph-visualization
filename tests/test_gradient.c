/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradientient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include "../lib/minimizer/constants.h"
#include "test.h"
#include <math.h>
#include <stdlib.h>

static double step = 1e-7;
static int incorrect = 0;
static double accepted_percentage = 0.03;

enum {TESTX, TESTY};
enum { FIRST, SECONDA, SECONDR, THIRD, FOURTH };

static int get_nof_bondcrosses(GraphPointer graph) {
    int n = 0;
    BondCrossPointer cur = graph->crs;
    while (cur) {
        n++;
        cur = cur->next;
    }
    return n;
}

static int approximate(const double tar, double x) {

    int small = fabs(x) < 1e-04 && fabs(tar) < 1e-04;
    if (small) return 1;
    if (Util_equal(tar, x)) return 1;
    int about = fabs(1 - tar / x) < accepted_percentage;
    return about;
}

static char *compare_with_approx(const char *fname, int dim, int order, int nv, FILE *log)
{
    if (dim == TESTX) {
        if (order == FIRST) {
            msg("Testing first order gradient: x...");
        } else if (order == SECONDA) {
            msg("Testing second order attraction gradient: x...");
        } else if (order == SECONDR) {
            msg("Testing second order repulsion gradient: x...");
        } else if (order == THIRD) {
            msg("Testing third order gradient: x...");
        } else {
            msg("Testing fourth order gradient: x...");
        }
    } else {
        if (order == FIRST) {
            msg("Testing first order gradient: y...");
        } else if (order == SECONDA)  {
            msg("Testing second order attraction gradient: y...");
        } else if (order == SECONDR) {
            msg("Testing second order repulsion gradient: y...");
        } else if (order == THIRD) {
            msg("Testing third order gradient: y...");
        } else {
            msg("Testing fourth order gradient: y...");
        }
    }
    
    for (int i = 0; i < nv; i++) {
        GraphPointer graph;
        graph = Graph_create(fname);\
        Placement_set_random(graph->vs, graph->vs.n);
        Graph_reset_dynamics(graph);
        int nof_crs1 = get_nof_bondcrosses(graph);
        VertexPointer v = *(graph->vs.set + i);
        double e; 
        graph->energy = 0;
        if (order == FIRST) {
            (*test_first_order_gradient)(graph);
            test_first_order_energy(graph); 
        } else if (order == SECONDA) {
            (*test_second_order_attraction_gradient)(graph->bs);
            (*test_second_order_attraction_energy)(graph); 
        } else if (order == SECONDR) {
            (*test_second_order_repulsion_gradient)(graph->grid);
            (*test_second_order_repulsion_energy)(graph); 
        } else if (order == THIRD) {
            (*test_third_order_gradient)(graph->con);
            (*test_third_order_energy)(graph); 
        } else {
            (*test_fourth_order_gradient)(graph->crs);
            (*test_fourth_order_energy)(graph); 
        }
        e = graph->energy; 
        double grad; 
        if (dim == TESTX) {
            grad = v->gradient.x;
        } else {
            grad = v->gradient.y;
        }
        
        Vector pos; 
        if (dim == TESTX) {
            pos = Vector_initialize(v->pos.x + step, v->pos.y);
            Vertex_move(v, pos);
        } else {
            pos = Vector_initialize(v->pos.x, v->pos.y + step);
        }
        Vertex_move(v, pos);

        if (order == FOURTH) {
            Graph_reset_dynamics(graph);
            if (nof_crs1 != get_nof_bondcrosses(graph)) {
                break;
            }
        }
        double estep;
        graph->energy = 0;
        if (order == FIRST) {
            test_first_order_energy(graph); 
        } else if (order == SECONDA) {
            (*test_second_order_attraction_energy)(graph); 
        } else if (order == SECONDR) {
            (*test_second_order_repulsion_energy)(graph); 
        } else if (order == THIRD) {
            (*test_third_order_energy)(graph); 
        } else {
            (*test_fourth_order_energy)(graph); 
        }
        estep = graph->energy;

        if (dim == TESTX) {
            Vector pos = Vector_initialize(v->pos.x + step, v->pos.y);
            Vertex_move(v, pos);
            Graph_reset_dynamics(graph);
        } else {
            Vector pos = Vector_initialize(v->pos.x, v->pos.y + step);
            Vertex_move(v, pos);
            Graph_reset_dynamics(graph);
        }
        if (order == FOURTH) {
            Graph_reset_dynamics(graph);
            if (nof_crs1 != get_nof_bondcrosses(graph)) {
                break;
            }
        }
        double e2step;
        graph->energy = 0;
        if (order == FIRST) {
            test_first_order_energy(graph); 
        } else if (order == SECONDA) {
            (*test_second_order_attraction_energy)(graph); 
        } else if (order == SECONDR) {
            (*test_second_order_repulsion_energy)(graph); 
        } else if (order == THIRD) {
            (*test_third_order_energy)(graph); 
        } else {
            (*test_fourth_order_energy)(graph); 
        }
        e2step = graph->energy;
        double approx; 
        if (order == THIRD) {
            approx = (4 * estep  - 3 * e - e2step) / (2 * step);
        } else {
            approx = -(4 * estep  - 3 * e - e2step) / (2 * step);
        }
        
        double about = approximate(approx, grad);

        if (about == 0) {
            switch (order) {
                case FIRST:
                    fprintf(log, "First order gradient");
                    break;
                case SECONDA:
                    fprintf(log, "Second order attraction gradient");
                    break;
                case SECONDR:
                    fprintf(log, "Second order repulsion gradient");
                    break;
                case THIRD:
                    fprintf(log, "Third order gradient");
                    break;
                case FOURTH:
                    fprintf(log, "Fourth order gradient");
                    break;
                default: 
                    Util_runtime_error("Invalid parameter");
            }
            if (dim == TESTX) {
                fprintf(log, ": x direction\n");
            } else {
                fprintf(log, ": y direction\n");
            }
            fprintf(log, "Gradient of vertex: %d of %d\n", i, nv);
            fprintf(log, "Expected: %f Actual: %f\n", approx, grad);
            fprintf(log, "Vertex Position {%f, %f}\n", v->pos.x, v->pos.y);
            fprintf(log, "---------------------\n");
            incorrect++;
        }
        Graph_free(graph);
    }
    msgpass();
    return NULL;
} 

static char *run_gradient_tesets(const char *fname, int nv, FILE *log)
{
    char *msg1 = compare_with_approx(fname, TESTX, FIRST, nv, log);
    if (msg1 != NULL) return msg1;

    char *msg2 = compare_with_approx(fname, TESTY, FIRST, nv, log);
    if (msg2 != NULL) return msg2;

    char *msg3 = compare_with_approx(fname, TESTX, SECONDA, nv, log);
    if (msg3 != NULL) return msg3;

    char *msg4 = compare_with_approx(fname, TESTY, SECONDA, nv, log);
    if (msg4 != NULL) return msg4;

    char *msg5 = compare_with_approx(fname, TESTX, SECONDR, nv, log);
    if (msg5 != NULL) return msg5;

    char *msg6 = compare_with_approx(fname, TESTY, SECONDR, nv, log);
    if (msg6 != NULL) return msg6;

    char *msg7 = compare_with_approx(fname, TESTX, THIRD, nv, log);
    if (msg7 != NULL) return msg7;

    char *msg8 = compare_with_approx(fname, TESTY, THIRD, nv, log);
    if (msg8 != NULL) return msg8;

    char *msg9 = compare_with_approx(fname, TESTX, FOURTH, nv, log);
    if (msg9 != NULL) return msg9;

    char *msg10 = compare_with_approx(fname, TESTY, FOURTH, nv, log);
    if (msg10 != NULL) return msg10;

    return NULL;
}

char *test_gradient() 
{
    const char *n3 = "data/test/3.json";
    const char *n4 = "data/test/4-1.json";
    const char *n4_2 = "data/test/4.json";
    const char *n4_3 = "data/test/4-2.json";
    const char *n6 = "data/test/6.json";
    const char *n23 = "data/test/23.json";
    const char *n52 = "data/test/52.json";
    const char *n43 = "data/test/43.json";

    int i;
    
    FILE *log = fopen("log/gradient.txt", "a");

    if (!log) {
        Util_runtime_error("Could not open file\n");
    }
    
    for (i = 0; i < T_ITMAX; i++) {

        msg("Testing gradients of 3 vertices...\n"); 
        char *msg0 = run_gradient_tesets(n3, 3, log);
        if (msg0 != NULL) return msg0;
        msgpass();
            
        msg("Testing gradients of 4 vertices...\n"); 
        char *msg1 = run_gradient_tesets(n4, 4, log);
        if (msg1 != NULL) return msg1;
        msgpass();

        msg("Testing gradients of 6 vertices...\n"); 
        char *msg2 = run_gradient_tesets(n6, 6, log);
        if (msg2 != NULL) return msg2;
        msgpass();
        
        msg("Testing gradients of 23 vertices...\n"); 
        char *msg3 = run_gradient_tesets(n23, 23, log);
        if (msg3 != NULL) return msg3;
        msgpass();

        msg("Testing gradients of 52 vertices...\n"); 
        char *msg4 = run_gradient_tesets(n52, 52, log);
        if (msg4 != NULL) return msg4;
        msgpass();

        msg("Testing gradients of 43 vertices...\n"); 
        char *msg5 = run_gradient_tesets(n43, 43, log);
        if (msg5 != NULL) return msg5;
        msgpass();

        msg("Testing gradients of 4 vertices, take 2...\n"); 
        char *msg6 = run_gradient_tesets(n4_2, 4, log);
        if (msg6 != NULL) return msg6;
        msgpass();

        msg("Testing gradients of 4 vertices, take 3...\n"); 
        char *msg7 = run_gradient_tesets(n4_3, 4, log);
        if (msg7 != NULL) return msg7;
        msgpass();

    }
    
    fclose(log); 
    printf("incorrect estimations/calculations: %d\n", incorrect);  
    return 0;
}

