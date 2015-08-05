/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: test file for ../lib/c/gradientient.c

* Creation Date: 18-07-2015: 

*****************************************************************************/

#include "test.h"

#define DEBUG 1

float step = 1;

enum {TESTX, TESTY};

static int approximate(const float tar, const float x) {

    int small = fabs(x) < 50 && fabs(tar) < 50 && fabs(x - tar) < 5;
    if (small) return 1;
    if (DEBUG) {
        printf("target: %f, number; %f\n", tar, x);
        printf("ratio: %f\n", fabs(1 - tar / x));
    }
    if (Util_equal(x, 0.0)) return 0;
    int about = fabs(1 - tar / x) < 0.02;
    return about;
}

static char *first_order(const char *n23, int dim)
{
    GraphPointer graph;
    if (dim == TESTX) {
        msg("Testing first order gradient: x...");
    } else {
        msg("Testing first order gradient: y...");
    }
    graph = Graph_create(n23);
    int nv = graph->vs.n; 
    for (int i = 0; i < nv; i++) {
        VectorPointer gradient;
        VertexPointer v = *(graph->vs.set + i);
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));

        (*test_first_order_gradient)(graph->vs, gradient);
        float grad; 
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);
        float e = test_first_order_energy(graph->vs); 

        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }

        float estep = test_first_order_energy(graph->vs); 
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float e2step = test_first_order_energy(graph->vs); 
        
        float approx = -(4 * estep  - 3 * e - e2step) / (2 * step);
        
        float about = approximate(approx, grad);

        if (about == 0) Graph_free(graph);

        if (dim == TESTX) {
            mu_assert("gradient approximation failed: first order x", about);
        } else {
            mu_assert("gradient approximation failed: first order y", about);
        }
    }
    msgpass();
    Graph_free(graph);
    return NULL;
} 

static char *second_order_attraction(const char *n23, int dim)
{
    GraphPointer graph;
    if (dim == TESTX) {
        msg("Testing second order attraction gradient: x...");
    } else {
        msg("Testing second order attraction gradient: y...");
    }
    graph = Graph_create(n23);
    int nv = graph->vs.n;
    for (int i = 0; i < nv; i++) {

        VectorPointer gradient;
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));

        (*test_second_order_attraction_gradient)(graph->bs, gradient);
        float grad;
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);

        float e = (*test_second_order_attraction_energy)(graph->bs); 

        VertexPointer v = *(graph->vs.set + i);
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float estep = (*test_second_order_attraction_energy)(graph->bs); 
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float e2step = (*test_second_order_attraction_energy)(graph->bs); 
        
        float approx = -(4 * estep  - 3 * e - e2step) / (2 * step);
        
        float about = approximate(approx, grad);

        if (about == 0) Graph_free(graph);

        if (dim == TESTX) {
            mu_assert("gradient approximation failed: attraction x", about);
        } else {
            mu_assert("gradient approximation failed: attraction y", about);
        }
    }
    msgpass();
    Graph_free(graph);
    return NULL;
}

static char *second_order_repulsion(const char *n23, int dim)
{
    GraphPointer graph;
    if (dim == TESTX) {
        msg("Testing second order repulsion gradient: x...");
    } else {
        msg("Testing second order repulsion gradient: y...");
    }
    graph = Graph_create(n23);
    int nv = graph->vs.n;
    for (int i = 0; i < nv; i++) {
        VectorPointer gradient;
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));
        test_second_order_repulsion_gradient(graph->grid, gradient);
        float grad;
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);

        float e = test_second_order_repulsion_energy(graph->grid); 

        VertexPointer v = *(graph->vs.set + i);
        if (dim == TESTX) {
            Vector pos = Vector_initialize(v->pos.x + step, v->pos.y);
            Vertex_move(v, pos);
        } else {
            Vector pos = Vector_initialize(v->pos.x, v->pos.y + step);
            Vertex_move(v, pos);
        }
        float estep = test_second_order_repulsion_energy(graph->grid); 
        if (dim == TESTX) {
            Vector pos = Vector_initialize(v->pos.x + step, v->pos.y);
            Vertex_move(v, pos);
        } else {
            Vector pos = Vector_initialize(v->pos.x, v->pos.y + step);
            Vertex_move(v, pos);
        }
        float e2step = test_second_order_repulsion_energy(graph->grid); 
        

        float approx = -(4 * estep  - 3 * e - e2step) / (2 * step);

        float about = approximate(approx, grad);

        if (about == 0) Graph_free(graph);

        if (dim == TESTX) {
            mu_assert("gradient approximation failed: repulsion x", about);
        } else {
            mu_assert("gradient approximation failed: repulsion y", about);
        }
    }
    msgpass();
    Graph_free(graph);
    return NULL;
}

static char *third_order(const char *n23, int dim)
{
    GraphPointer graph;
    if (dim == TESTX) {
        msg("Testing third order gradient: x...");
    } else {
        msg("Testing third order gradient: y...");
    }
    graph = Graph_create(n23);
    int nv = graph->vs.n;
    for (int i = 0; i < nv; i++) {
        VectorPointer gradient;
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));
        test_third_order_gradient(graph->con, gradient); 
        float grad;
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);

        float e = test_third_order_energy(graph->con); 

        VertexPointer v = *(graph->vs.set + i);
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float estep = test_third_order_energy(graph->con); 
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float e2step = test_third_order_energy(graph->con); 

        float approx = -(4 * estep  - 3 * e - e2step) / (2 * step);

        float about = approximate(approx, grad);

        if (about == 0) Graph_free(graph);

        if (dim == TESTX) {
            mu_assert("gradient approximation failed: third order x", about);
        } else {
            mu_assert("gradient approximation failed: third order y", about);
        }
    }
    msgpass();
    Graph_free(graph);
    return NULL;
}

static char *fourth_order(const char *n23, int dim)
{
    GraphPointer graph;
    if (dim == TESTX) {
        msg("Testing fourth order gradient: x...");
    } else {
        msg("Testing fourth order gradient: y...");
    }
    graph = Graph_create(n23);
    int nv = graph->vs.n;
    for (int i = 0; i < nv; i++) {
        VectorPointer gradient;
        gradient = (VectorPointer) Util_allocate_initialize(nv, sizeof(Vector));
        test_fourth_order_gradient(graph->crs, gradient); 
        float grad;
        if (dim == TESTX) {
            grad = gradient[i].x; 
        } else {
            grad = gradient[i].y; 
        }
        free(gradient);

        float e = test_fourth_order_energy(graph->crs); 

        VertexPointer v = *(graph->vs.set + i);
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float estep = test_fourth_order_energy(graph->crs); 
        if (dim == TESTX) {
            v->pos.x += step;
        } else {
            v->pos.y += step;
        }
        float e2step = test_fourth_order_energy(graph->crs); 

        float approx = -(4 * estep  - 3 * e - e2step) / (2 * step);

        float about = approximate(approx, grad);

        if (about == 0) Graph_free(graph);

        if (dim == TESTX) {
            mu_assert("gradient approximation failed: fourth order x", about);
        } else {
            mu_assert("gradient approximation failed: fourth order y", about);
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

    char *msg1 = first_order(n23, TESTX);
    if (msg1 != NULL) return msg1;

    char *msg2 = first_order(n23, TESTY);
    if (msg2 != NULL) return msg2;

    char *msg3 = second_order_attraction(n23, TESTX);
    if (msg3 != NULL) return msg3;

    char *msg4 = second_order_attraction(n23, TESTY);
    if (msg4 != NULL) return msg4;

    char *msg5 = second_order_repulsion(n23, TESTX);
    if (msg5 != NULL) return msg5;

    char *msg6 = second_order_repulsion(n23, TESTY);
    if (msg6 != NULL) return msg6;

    char *msg7 = third_order(n23, TESTX);
    if (msg7 != NULL) return msg7;

    char *msg8 = third_order(n23, TESTY);
    if (msg8 != NULL) return msg8;

    char *msg9 = fourth_order(n4, TESTX);
    if (msg9 != NULL) return msg9;

    char *msg10 = fourth_order(n4, TESTY);
    if (msg10 != NULL) return msg10;

    return 0;
}


