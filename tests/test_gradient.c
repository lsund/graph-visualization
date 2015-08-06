/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradientient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include "test.h"

#define DEBUG 0

double step = 1;

enum {TESTX, TESTY};
enum { FIRST, SECONDA, SECONDR, THIRD, FOURTH };

static int approximate(const double tar, const double x) {

    int small = fabs(x) < 65 && fabs(tar) < 65 && fabs(x - tar) < 10;
    if (small) return 1;
    if (DEBUG) {
        printf("target: %f, number; %f\n", tar, x);
        printf("ratio: %f\n", fabs(1 - tar / x));
    }
    if (Util_equal(x, 0.0)) return 0;
    int about = fabs(1 - tar / x) < 0.02;
    return about;
}

static char *compare_with_approx(const char *fname, int dim, int order)
{
    GraphPointer graph;
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

    graph = Graph_create(fname);
    int nv = graph->vs.n; 
    for (int i = 0; i < nv; i++) {
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

        if (dim == TESTX) {
            Vector pos = Vector_initialize(v->pos.x + step, v->pos.y);
            Vertex_move(v, pos);
        } else {
            Vector pos = Vector_initialize(v->pos.x, v->pos.y + step);
            Vertex_move(v, pos);
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
        } else {
            Vector pos = Vector_initialize(v->pos.x, v->pos.y + step);
            Vertex_move(v, pos);
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
        
        double approx = -(4 * estep  - 3 * e - e2step) / (2 * step);
        
        double about = approximate(approx, grad);

        if (about == 0) {
            printf("\nIteration: %d, Expected: %f Actual: %f\n", 
                    i, approx, grad);
            Graph_free(graph);
        }
        
        if (dim == TESTX) {
            if (order == FIRST) { 
                mu_assert("gradient approximation failed: first order x", about);
            }  else if (order == SECONDA) {
                mu_assert("gradient approximation failed: second order attraction x", about);
            } else if (order == SECONDR) {
                mu_assert("gradient approximation failed: second order repulsion x", about);
            } else if (order == THIRD) {
                mu_assert("gradient approximation failed: third order x", about);
            } else {
                mu_assert("gradient approximation failed: fourth order x", about);
            }
        } 
        else {
            if (order == FIRST) {
                mu_assert("gradient approximation failed: first order y", about);
            }  else if (order == SECONDA) {
                mu_assert("gradient approximation failed: second order attraction y", about);
            } else if (order == SECONDR) {
                mu_assert("gradient approximation failed: second order repulsion y", about);
            } else if (order == THIRD) {
                mu_assert("gradient approximation failed: third order x", about);
            } else {
                mu_assert("gradient approximation failed: fourth order x", about);
            }
        }
    }
    msgpass();
    Graph_free(graph);
    return NULL;
} 

char *test_gradient() 
{
    const char *n4 = "data/test/4.json";
    const char *n23 = "data/test/23.json";
    const char *n52 = "data/test/52.json";

    char *msg1 = compare_with_approx(n4, TESTX, FIRST);
    if (msg1 != NULL) return msg1;

    char *msg2 = compare_with_approx(n4, TESTY, FIRST);
    if (msg2 != NULL) return msg2;

    char *msg3 = compare_with_approx(n4, TESTX, SECONDA);
    if (msg3 != NULL) return msg3;

    char *msg4 = compare_with_approx(n4, TESTY, SECONDA);
    if (msg4 != NULL) return msg4;

    char *msg5 = compare_with_approx(n4, TESTX, SECONDR);
    if (msg5 != NULL) return msg5;

    char *msg6 = compare_with_approx(n4, TESTY, SECONDR);
    if (msg6 != NULL) return msg6;

    char *msg7 = compare_with_approx(n4, TESTX, THIRD);
    if (msg7 != NULL) return msg7;

    char *msg8 = compare_with_approx(n4, TESTY, THIRD);
    if (msg8 != NULL) return msg8;

    /*char *msg9 = compare_with_approx(n4, TESTX, FOURTH);*/
    /*if (msg9 != NULL) return msg9;*/

    /*char *msg10 = compare_with_approx(n4, TESTY, FOURTH);*/
    /*if (msg10 != NULL) return msg10;*/

    return 0;
}

