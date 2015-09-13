/*****************************************************************************

* File Name: vertex_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include <math.h>

#include "vertex_pair.h"
#include "constants.h"
#include "vertex.h"

/* Private ******************************************************************/

static double repulsion_weight() 
{
    return 2 * WREP;
}

/* Public *******************************************************************/

double VertexPair_repulsion_energy(const Pair pr) 
{
    double w;
    w = repulsion_weight();

    VertexPointer vp0, vp1;
    vp0 = (VertexPointer) pr.fst;
    vp1 = (VertexPointer) pr.snd;

    double i_tl_x, i_tl_y, i_br_x, i_br_y;
    i_tl_x = fmax(vp0->tl.x, vp1->tl.x);
    i_tl_y = fmax(vp0->tl.y, vp1->tl.y);
    i_br_x = fmin(vp0->br.x, vp1->br.x);
    i_br_y = fmin(vp0->br.y, vp1->br.y);

    if (i_tl_x > i_br_x || i_tl_y > i_br_y) {
        return 0;
    } else {
        double i_dx, i_dy;
        i_dx = i_br_x - i_tl_x;
        i_dy = i_br_y - i_tl_y;
        return w * pow(i_dx * i_dy, 2);
    }
}

Vector VertexPair_repulsion_gradient(const Pair pr)
{
    double w;
    w = repulsion_weight();

    VertexPointer vp0, vp1;
    vp0 = (VertexPointer) pr.fst;
    vp1 = (VertexPointer) pr.snd;

    double i_tl_x, i_tl_y, i_br_x, i_br_y;
    i_tl_x = fmax(vp0->tl.x, vp1->tl.x);
    i_tl_y = fmax(vp0->tl.y, vp1->tl.y);
    i_br_x = fmin(vp0->br.x, vp1->br.x);
    i_br_y = fmin(vp0->br.y, vp1->br.y);

    Vector frc;

    if (i_tl_x > i_br_x || i_tl_y > i_br_y) {
        return Vector_zero();
    } else {
        double i_dx, i_dy;
        i_dx = i_br_x - i_tl_x;
        i_dy = i_br_y - i_tl_y;
        if (vp0->pos.x <= vp1->pos.x) {
            frc.x = -2 * i_dx * pow(i_dy, 2);
        } else {
            frc.x = 2 * i_dx * pow(i_dy, 2);
        } 
        if (vp0->pos.y <= vp1->pos.y) {
            frc.y = -2 * i_dy * pow(i_dx, 2);
        } else {
            frc.y = 2 * i_dy * pow(i_dx, 2);
        } 
    }
    return Vector_scalar_mult(frc, w);
}

