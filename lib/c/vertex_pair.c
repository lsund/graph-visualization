/*****************************************************************************

* File Name: vertex_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

#include "math.h"
#include "constants.h"
#include "vertex.h"
#include "pair.h"

/* Private ******************************************************************/

static float repulsion_weight(const P pr) 
{
    return 2 * WREP;
}

/* Public *******************************************************************/

float VertexPair_repulsion_energy(const P pr) 
{
    float w;
    w = repulsion_weight(pr);

    VP vp0, vp1;
    vp0 = (VP) pr.fst;
    vp1 = (VP) pr.snd;

    int cb;
    cb = *(vp0->crs_bof + vp1->id);
    if (cb) {
        w *= REPULSION_REDUCE;
    }

    float x_o, y_o, a_o;
    x_o = fmax(0.0, fmin(vp0->br.x, vp1->br.x) - fmax(vp0->tl.x, vp1->tl.x));
    y_o = fmax(0.0, fmin(vp0->br.y, vp1->br.y) - fmax(vp0->tl.y, vp1->tl.y));
    a_o = x_o * y_o;

    return w * a_o;
}

Vec2D VertexPair_repulsion_force(const P pr)
{
    
    float w;
    w = repulsion_weight(pr);

    VP vp0, vp1;
    vp0 = (VP) pr.fst;
    vp1 = (VP) pr.snd;

    int cb;
    cb = *(vp0->crs_bof + vp1->id);
    if (cb) {
        w *= 0.5;
    }

    Vec2D frc;
    if (vp1->pos.x < vp0->pos.x + PADDING && vp0->pos.x < vp1->pos.x) {
        frc.x = -(fmax(0.0, fmin(vp0->br.y, vp1->br.y) - 
                fmax(vp0->tl.y, vp1->tl.y)));
    } else if (vp1->pos.x < vp0->pos.x && vp0->pos.x < vp1->pos.x + PADDING) {
        frc.x = (fmax(0.0, fmin(vp0->br.y, vp1->br.y) - 
                fmax(vp0->tl.y, vp1->tl.y)));
    } else {
        frc.x = 0.0;
    }
    if (vp1->pos.y < vp0->pos.y + PADDING && vp0->pos.y < vp1->pos.y) {
        frc.y = -(fmax(0.0, fmin(vp0->br.x, vp1->br.x) - 
                fmax(vp0->tl.x, vp1->tl.x)));
    } else if (vp1->pos.y < vp0->pos.y && vp0->pos.y < vp1->pos.y + PADDING) {
        frc.y = (fmax(0.0, fmin(vp0->br.x, vp1->br.x) - 
                fmax(vp0->tl.x, vp1->tl.x)));
    } else {
        frc.y = 0.0;
    }

    return Vector2d_scalar_mult(frc, w);
}

