/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradientient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include "test.h"
#include <math.h>

#define DEBUG 0

double step = 0.001;
int incorrect = 0;

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

    int small = fabs(x) < 1e-05 && fabs(tar) < 1e-05;
    if (small) return 1;
    if (DEBUG) {
        printf("\ntarget: %f, number; %f\n", tar, x);
        printf("ratio: %f\n", fabs(1 - tar / x));
    }
    if (Util_equal(tar, x)) return 1;
    int about = fabs(1 - tar / x) < 0.02;
    return about;
}

static char *compare_with_approx(const char *fname, int dim, int order, int nv)
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
        VectorPointer gradient;
        VertexPointer v = *(graph->vs.set + i);
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));
        double e; 
        if (order == FIRST) {
            (*test_first_order_gradient)(graph->vs, gradient);
            e = test_first_order_energy(graph->vs); 
        } else if (order == SECONDA) {
            (*test_second_order_attraction_gradient)(graph->bs, gradient);
            e = (*test_second_order_attraction_energy)(graph->bs); 
        } else if (order == SECONDR) {
            (*test_second_order_repulsion_gradient)(graph->grid, gradient);
            e = (*test_second_order_repulsion_energy)(graph->grid); 
        } else if (order == THIRD) {
            (*test_third_order_gradient)(graph->con, gradient);
            e = (*test_third_order_energy)(graph->con); 
        } else {
            (*test_fourth_order_gradient)(graph->crs, gradient);
            e = (*test_fourth_order_energy)(graph->crs); 
        }
        
        double grad; 
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);
        
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
        if (order == FIRST) {
            estep = test_first_order_energy(graph->vs); 
        } else if (order == SECONDA) {
            estep = (*test_second_order_attraction_energy)(graph->bs); 
        } else if (order == SECONDR) {
            estep = (*test_second_order_repulsion_energy)(graph->grid); 
        } else if (order == THIRD) {
            estep = (*test_third_order_energy)(graph->con); 
        } else {
            estep = (*test_fourth_order_energy)(graph->crs); 
        }

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
        if (order == FIRST) {
            e2step = test_first_order_energy(graph->vs); 
        } else if (order == SECONDA) {
            e2step = (*test_second_order_attraction_energy)(graph->bs); 
        } else if (order == SECONDR) {
            e2step = (*test_second_order_repulsion_energy)(graph->grid); 
        } else if (order == THIRD) {
            e2step = (*test_third_order_energy)(graph->con); 
        } else {
            e2step = (*test_fourth_order_energy)(graph->crs); 
        }
        
        double approx; 
        if (order == THIRD) {
            approx = (4 * estep  - 3 * e - e2step) / (2 * step);
        } else {
            approx = -(4 * estep  - 3 * e - e2step) / (2 * step);
        }
        
        double about = approximate(approx, grad);

        if (about == 0) {
            printf("\nGradient: %d, Expected: %f Actual: %f\n", 
                    i, approx, grad);
            incorrect++;
        }
        
        if (dim == TESTX) {
            if (order == FIRST) { 
                mu_assert("gradient approximation failed: first order x", about);
            }  else if (order == SECONDA) {
                mu_assert("gradient approximation failed: second order attraction x", about);
            } else if (order == SECONDR) {
                mu_assert("gradient approximation failed: second order repulsion x", 1);
            } else if (order == THIRD) {
                mu_assert("gradient approximation failed: third order x", 1);
            } else {
                mu_assert("gradient approximation failed: fourth order x", 1);
            }
        } 
        else {
            if (order == FIRST) {
                mu_assert("gradient approximation failed: first order y", about);
            }  else if (order == SECONDA) {
                mu_assert("gradient approximation failed: second order attraction y", about);
            } else if (order == SECONDR) {
                mu_assert("gradient approximation failed: second order repulsion y", 1);
            } else if (order == THIRD) {
                mu_assert("gradient approximation failed: third order y", 1);
            } else {
                mu_assert("gradient approximation failed: fourth order y", 1);
            }
        }
        Graph_free(graph);
    }
    msgpass();
    return NULL;
} 

static char *run_gradient_tesets(const char *fname, int nv)
{
    char *msg1 = compare_with_approx(fname, TESTX, FIRST, nv);
    if (msg1 != NULL) return msg1;

    char *msg2 = compare_with_approx(fname, TESTY, FIRST, nv);
    if (msg2 != NULL) return msg2;

    char *msg3 = compare_with_approx(fname, TESTX, SECONDA, nv);
    if (msg3 != NULL) return msg3;

    char *msg4 = compare_with_approx(fname, TESTY, SECONDA, nv);
    if (msg4 != NULL) return msg4;

    char *msg5 = compare_with_approx(fname, TESTX, SECONDR, nv);
    if (msg5 != NULL) return msg5;

    char *msg6 = compare_with_approx(fname, TESTY, SECONDR, nv);
    if (msg6 != NULL) return msg6;

    char *msg7 = compare_with_approx(fname, TESTX, THIRD, nv);
    if (msg7 != NULL) return msg7;

    char *msg8 = compare_with_approx(fname, TESTY, THIRD, nv);
    if (msg8 != NULL) return msg8;

    char *msg9 = compare_with_approx(fname, TESTX, FOURTH, nv);
    if (msg9 != NULL) return msg9;

    char *msg10 = compare_with_approx(fname, TESTY, FOURTH, nv);
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

    msg("Testing gradients of 3 vertices...\n"); 
    char *msg0 = run_gradient_tesets(n3, 3);
    if (msg0 != NULL) return msg0;
    msgpass();
        
    msg("Testing gradients of 4 vertices...\n"); 
    char *msg1 = run_gradient_tesets(n4, 4);
    if (msg1 != NULL) return msg1;
    msgpass();

    msg("Testing gradients of 6 vertices...\n"); 
    char *msg2 = run_gradient_tesets(n6, 6);
    if (msg2 != NULL) return msg2;
    msgpass();

    msg("Testing gradients of 23 vertices...\n"); 
    char *msg3 = run_gradient_tesets(n23, 23);
    if (msg3 != NULL) return msg3;
    msgpass();

    msg("Testing gradients of 52 vertices...\n"); 
    char *msg4 = run_gradient_tesets(n52, 52);
    if (msg4 != NULL) return msg4;
    msgpass();

    msg("Testing gradients of 43 vertices...\n"); 
    char *msg5 = run_gradient_tesets(n43, 43);
    if (msg5 != NULL) return msg5;
    msgpass();

    msg("Testing gradients of 4 vertices, take 2...\n"); 
    char *msg6 = run_gradient_tesets(n4_2, 4);
    if (msg6 != NULL) return msg6;
    msgpass();

    msg("Testing gradients of 4 vertices, take 3...\n"); 
    char *msg7 = run_gradient_tesets(n4_3, 4);
    if (msg7 != NULL) return msg7;
    msgpass();

    
    printf("incorrect estimations/calculations: %d\n", incorrect);  
    return 0;
}

