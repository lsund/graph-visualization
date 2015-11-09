/*****************************************************************************

* File Name: pair_gradient.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 10-08-2015

*****************************************************************************/

#include "metafile.h"
#include "minimizer/js_interact.h"

static void check1(double *a, double *b)
{
    double x, y;
    x = *a;
    y = *b;
    if (Util_close_to(x, -1.0)) x = -1.0 + EPS;
    if (Util_close_to(x, 1.0)) x = 1.0 - EPS;
    assert(Util_in_range_strict(-1.0, 1.0, x));
    if (Util_equal(y, 1.0) && y > 1.0) {
        y = 1.0 - TINY;
    } else if (Util_close_to(y, 1.0) && y > 1.0) {
        y = 1.0 - EPS;
    }
    assert((1 - y) >= 0);
    *a = x;
    *b = y;
}

static void check2(double *a)
{
    double x;
    x = *a;
    if (Util_is_zero(x)) x = Util_sign(x) == MINUS ? -EPS : EPS;
    assert(!Util_is_zero(x));
    *a = x;
}

double AngularGradient_dfx0(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c02 = pow(b00 + b01, 1.5);
    double c03 = pow(b05, 2);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c07 = a01 * b05;

    double d00 = c00 * c01;
    double d01 = c02 * c01;
    double d03 = c05 * c06;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d01));
    assert(!Util_is_zero(d03));

    double e00 = a00 / d00;
    double e01 = c07 / d01;
    double e02 = b05 / d00;
    double e03 = c03 / d03;
    check1(&e02, &e03);

    double f00 = e00 - e01;
    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    check2(&f02);

    double g00 = a04 - f01;

    double h00 = (2*w*f00*g00);

    return h00 / f02;
}

double AngularGradient_dfy0(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c02 = pow(b00 + b01, 1.5);
    double c03 = pow(b05, 2);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c08 = a02 * b05;

    double d00 = c00 * c01;
    double d01 = c02 * c01;
    double d03 = c05 * c06;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d01));
    assert(!Util_is_zero(d03));

    double e02 = b05 / d00;
    double e03 = c03 / d03;
    double e04 = a03 / d00;
    double e05 = c08 / d01;
    check1(&e02, &e03);

    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    double f03 = e04 - e05;
    check2(&f02);

    double g00 = a04 - f01;

    double h01 = (2*w*f03*g00);

    return h01/f02;
}

double AngularGradient_dfx1(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;
    double a06 = -x0 + 2 * x1 - x2;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c02 = pow(b00 + b01, 1.5);
    double c03 = pow(b05, 2);
    double c04 = pow(b02 + b04, 1.5);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c07 = a01 * b05;
    double c09 = a00 * b05;

    double d00 = c00 * c01;
    double d01 = c02 * c01;
    double d03 = c05 * c06;
    double d04 = c00 * c04;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d01));
    assert(!Util_is_zero(d03));
    assert(!Util_is_zero(d04));

    double e01 = c07 / d01;
    double e02 = b05 / d00;
    double e03 = c03 / d03;
    double e06 = c09 / d04;
    double e08 = a06 / d00;
    check1(&e02, &e03);

    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    double f04 = e06 +e08 +e01;
    check2(&f02);

    double g00 = a04 - f01;

    double h02 = (2*w*f04*g00);
    return h02/f02;
}

double AngularGradient_dfy1(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;
    double a05 = -y0 + 2 * y1 - y2;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c02 = pow(b00 + b01, 1.5);
    double c03 = pow(b05, 2);
    double c04 = pow(b02 + b04, 1.5);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c08 = a02 * b05;
    double c10 = a03 * b05;

    double d00 = c00 * c01;
    double d01 = c02 * c01;
    double d03 = c05 * c06;
    double d04 = c00 * c04;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d01));
    assert(!Util_is_zero(d03));
    assert(!Util_is_zero(d04));

    double e02 = b05 / d00;
    double e03 = c03 / d03;
    double e05 = c08 / d01;
    double e09 = c10 / d04;
    double e11 = a05 / d00;
    check1(&e02, &e03);

    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    double f05 = e09 +e11 +e05;
    check2(&f02);

    double g00 = a04 - f01;

    double h03 = (2*w*f05*g00);
    
    return h03/f02;
}

double AngularGradient_dfx2(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c03 = pow(b05, 2);
    double c04 = pow(b02 + b04, 1.5);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c09 = a00 * b05;

    double d00 = c00 * c01;
    double d03 = c05 * c06;
    double d04 = c00 * c04;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d03));
    assert(!Util_is_zero(d04));

    double e02 = b05 / d00;
    double e03 = c03 / d03;
    double e06 = c09 / d04;
    double e07 = a01 / d00;
    check1(&e02, &e03);

    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    double f06 = -e06 + e07;
    check2(&f02);

    double g00 = a04 - f01;

    double h04 = (2*w*f06*g00);
    return h04/f02;
}

double AngularGradient_dfy2(Vector v0, Vector v1, Vector v2, double w, int mass) {
    double x0, y0, x1, y1, x2, y2;
    x0 = v0.x; 
    y0 = v0.y; 
    x1 = v1.x; 
    y1 = v1.y; 
    x2 = v2.x; 
    y2 = v2.y; 
    double a00 = -x1 + x2;
    double a01 = x0 - x1;
    double a02 = y0 - y1;
    double a03 = -y1 + y2;
    double a04 = 2 * M_PI / mass;

    double b00 = pow(a01, 2);
    double b01 = pow(a02, 2);
    double b02 = pow(a00, 2);
    double b04 = pow(a03, 2);
    double b05 = a01 * a00 + a02 * a03;

    double c00 = sqrt(b00 + b01);
    double c01 = sqrt(b02 + b04);
    double c03 = pow(b05, 2);
    double c04 = pow(b02 + b04, 1.5);
    double c05 = b00 + b01;
    double c06 = b02 + b04;
    double c10 = a03 * b05;

    double d00 = c00 * c01;
    double d03 = c05 * c06;
    double d04 = c00 * c04;
    assert(!Util_is_zero(d00));
    assert(!Util_is_zero(d03));
    assert(!Util_is_zero(d04));

    double e02 = b05 / d00;
    double e03 = c03 / d03;
    double e09 = c10 / d04;
    double e10 = a02 / d00;
    check1(&e02, &e03);

    double f01 = acosf(e02);
    double f02 = sqrt(1 - e03);
    double f07 = -e09 + e10;
    check2(&f02);

    double g00 = a04 - f01;

    double h05 = (2*w*f07*g00);
    return h05/f02;
}

/*****************************************************************************

* File Name: Bond.c

* Author: Ludvig Sundström

* Description: Defines a bond, which is a relation between two vertices. 

* Creation Date: 28-07-2015

*****************************************************************************/

Bond Bond_initialize(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    )
{
    fst->mass++;
    snd->mass++;
    Bond rtn;
    rtn.fst = fst;
    rtn.snd = snd;  
    rtn.dist0 = dist0;
    rtn.stiffness = WATR;

    return rtn;
}

BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    )
{

    BondPointer rtn = malloc(sizeof(Bond));
    *rtn = Bond_initialize(fst, snd, dist0);

    return rtn;
}

static double Bond_attraction_weight(const BondPointer bp)
{
    return bp->stiffness;
}

double Bond_attraction_energy(const BondPointer bp)
{
    double d0, d;
    d0 = bp->dist0 * SPRING_LENGTH;
    d = Vector_norm(Vector_sub(bp->snd->pos, bp->fst->pos)); 
        
    double w;
    w = Bond_attraction_weight(bp);
    return w * pow(d - d0, 2);
}

Vector Bond_attraction_gradient(const BondPointer bp)
{
    double d0;
    d0 = bp->dist0 * SPRING_LENGTH;

    Vector vecb;
    vecb = Vector_sub(bp->snd->pos, bp->fst->pos);

    double d;
    d = Vector_norm(vecb); 
    if (fabs(d) <  MIN_DIST) {
        d = MIN_DIST;
    } 
    
    double w;
    w = Bond_attraction_weight(bp);

    return Vector_scalar_mult(vecb, 2 * w * (1 - (d0 / d)));
}

void Bond_free(BondPointer bp)
{
    free(bp);
}

/*****************************************************************************

* File Name: bond_connection.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 15-08-2015

*****************************************************************************/

/* Private ******************************************************************/

static double angular_weight()
{
   return WANG;
}

/* Public *******************************************************************/

BondConnection BondConnection_initialize(const Pair pr)
{
    BondConnection rtn;
    rtn.bpr = BondPair_initialize(pr);
    rtn.next = 0;

    VertexPointer v0, v1, v2, v3;
    v0 = rtn.bpr.fst->fst;
    v1 = rtn.bpr.fst->snd;
    v2 = rtn.bpr.snd->fst;
    v3 = rtn.bpr.snd->snd;

    if (v0->id == v2->id) {
        rtn.common = v0;
        rtn.other1 = v1;
        rtn.other2 = v3;
    } else if (v0->id == v3->id) {
        rtn.common = v0;
        rtn.other1 = v1;
        rtn.other2 = v2;
    } else if (v1->id == v2->id) {
        rtn.common = v1;
        rtn.other1 = v0;
        rtn.other2 = v3;
    } else {
        rtn.common = v1;
        rtn.other1 = v0;
        rtn.other2 = v2;
    }

    return rtn;
}

BondConnectionPointer BondConnection_create(const Pair pr)
{
    BondConnectionPointer rtn = Util_allocate_initialize(1, sizeof(BondConnection));
    *rtn = BondConnection_initialize(pr);

    return rtn;
}

double BondConnection_angular_energy(const BondConnectionPointer bcon)
{
    VertexPointer vi, vj, vk;
    vi = bcon->other1; 
    vj = bcon->common;
    vk = bcon->other2; 

    double xji, yji, xjk, yjk;
    xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
    xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

    Vector vecji, vecjk;
    vecji = Vector_initialize(xji, yji);
    vecjk = Vector_initialize(xjk, yjk);
    
    double theta; 
    theta = Vector_angle(vecji, vecjk);
    
    double wij, theta0;
    wij = angular_weight();
    theta0 = (2 * M_PI) / (vj->mass - 1);

    return wij * pow(theta - theta0, 2);
}

VectorPointer BondConnection_angular_gradient(const BondConnectionPointer bcon)
{
    VertexPointer vi, vj, vk;
    vi = bcon->other1; 
    vj = bcon->common;
    vk = bcon->other2; 
   
    Vector vec[3]; 
    vec[0] = vi->pos;
    vec[1] = vj->pos;
    vec[2] = vk->pos;
    
    double w;
    int m;
    w = angular_weight();
    m = vj->mass - 1;

    double gradient[6];
    gradient[0] = AngularGradient_dfx0(vec[0], vec[1], vec[2], w, m);
    gradient[1] = AngularGradient_dfy0(vec[0], vec[1], vec[2], w, m);
    gradient[2] = AngularGradient_dfx1(vec[0], vec[1], vec[2], w, m);
    gradient[3] = AngularGradient_dfy1(vec[0], vec[1], vec[2], w, m);
    gradient[4] = AngularGradient_dfx2(vec[0], vec[1], vec[2], w, m);
    gradient[5] = AngularGradient_dfy2(vec[0], vec[1], vec[2], w, m);

    assert(!(gradient[0] != gradient[0]));
    assert(!(gradient[1] != gradient[1]));
    assert(!(gradient[2] != gradient[2]));
    assert(!(gradient[3] != gradient[3]));
    assert(!(gradient[4] != gradient[4]));
    assert(!(gradient[5] != gradient[5]));
    
    VectorPointer rtn = Util_allocate(3, sizeof(Vector));

    rtn[0] = Vector_scalar_mult(Vector_initialize(gradient[0], gradient[1]), w);
    rtn[1] = Vector_scalar_mult(Vector_initialize(gradient[2], gradient[3]), w);
    rtn[2] = Vector_scalar_mult(Vector_initialize(gradient[4], gradient[5]), w);

    return rtn;
}

void BondConnections_free(const BondConnectionPointer bcons)
{
    BondConnectionPointer bcon = bcons;
    while(bcon) {
        BondConnectionPointer tmp = bcon;
        bcon = bcon->next;
        free(tmp);
        tmp = 0;
    }
}

/*****************************************************************************

* File Name: bond_overlap.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 03-08-2015

*****************************************************************************/

/* Private *******************************************************************/

#ifndef TEST
#define TEST 0
#endif

static double weight()
{
    return WCRS;
}

/* The combination of three parabolas takes the two dimensional shape of a
 * bump. The maximum value of function is the value of the local variable
 * max_y.
 */
static double bump(const double x, const double range) {
    const double steepness = 1 / (range / 2);
    const double max_val = (steepness * pow((range / 2), 2)) / 2;
    if (Util_in_range(0, (range / 4), x)) {
        return steepness * pow(x, 2);
    } else if (Util_in_range((range / 4), (3 * range / 4), x)) {
        return -steepness * pow(x - (range / 2), 2) + max_val;
    } else if (Util_in_range((3 * range / 4), range, x)) {
        return steepness * pow(x - range, 2);
    } else {
        return 0;
    }
}

/*
 * The derivative of bump. 
 */
static void dbump(
        double *gradient, 
        const double d,
        const double b,
        const Vector v0,
        const Vector v1,
        const Vector v2,
        const Vector v3
    )
{
    if (Util_in_range(0, (b / 4), d)) {
        gradient[0] = CrossingGradient_df0x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df0y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df0x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df0y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df0x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df0y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df0x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df0y3(v0, v1, v2, v3);
    } else if (Util_in_range((b / 4), (3 * b / 4), d)) {
        gradient[0] = CrossingGradient_df1x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df1y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df1x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df1y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df1x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df1y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df1x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df1y3(v0, v1, v2, v3);
    } else if (Util_in_range((3 * b / 4), b, d)) {
        gradient[0] = CrossingGradient_df2x0(v0, v1, v2, v3);
        gradient[1] = CrossingGradient_df2y0(v0, v1, v2, v3);
        gradient[2] = CrossingGradient_df2x1(v0, v1, v2, v3);
        gradient[3] = CrossingGradient_df2y1(v0, v1, v2, v3);
        gradient[4] = CrossingGradient_df2x2(v0, v1, v2, v3);
        gradient[5] = CrossingGradient_df2y2(v0, v1, v2, v3);
        gradient[6] = CrossingGradient_df2x3(v0, v1, v2, v3);
        gradient[7] = CrossingGradient_df2y3(v0, v1, v2, v3);
    } else {
        gradient[0] = 0;
        gradient[1] = 0;
        gradient[2] = 0;
        gradient[3] = 0;
        gradient[4] = 0;
        gradient[5] = 0;
        gradient[6] = 0;
        gradient[7] = 0;
    }
}

/* Public ********************************************************************/

BondOverlap BondOverlap_initialize(const BondPair bpr, const Vector cross)
{
    BondOverlap rtn;

    rtn.bpr = bpr;
    rtn.cross = cross;
    rtn.next = 0;

    rtn.cross = cross;
    return rtn;
}

BondOverlapPointer BondOverlap_create( const BondPair bcrs, const Vector cross)
{
    BondOverlapPointer rtn = Util_allocate(1, sizeof(BondOverlap));
    *rtn = BondOverlap_initialize(bcrs, cross);
    return rtn;
}

double BondOverlap_overlap_energy(const BondOverlapPointer bcrs)
{
    BondPointer b0, b1;
    b0 = bcrs->bpr.fst; b1 = bcrs->bpr.snd;

    VertexPointer v[4];
    v[0] = b0->fst; 
    v[1] = b0->snd; 
    v[2] = b1->fst; 
    v[3] = b1->snd;
    
    Vector vecs[4]; 
    vecs[0] = Vector_sub(bcrs->cross, v[0]->pos);
    vecs[1] = Vector_sub(bcrs->cross, v[1]->pos);
    vecs[2] = Vector_sub(bcrs->cross, v[2]->pos);
    vecs[3] = Vector_sub(bcrs->cross, v[3]->pos);
    
    double dsum;
    dsum = fmax(Vector_norm(vecs[0]), EPS) + fmax(Vector_norm(vecs[2]), EPS);

    double d0, d1;
    d0 = Vector_sub(b0->snd->pos, b0->fst->pos).len; 
    d1 = Vector_sub(b1->snd->pos, b1->fst->pos).len; 

    double rtn = bump(dsum, d0 + d1);
    
    double wi;
    if (!TEST) {
        wi = weight() / (v[0]->mass + v[1]->mass + v[2]->mass + v[3]->mass) ;
    } else {
        wi = weight();
    }
    return wi * rtn;
}

VectorPointer BondOverlap_overlap_gradient(const BondOverlapPointer bcrs)
{
    BondPointer b0, b1;
    b0 = bcrs->bpr.fst; b1 = bcrs->bpr.snd;

    VertexPointer v[4];
    v[0] = b0->fst; 
    v[1] = b0->snd; 
    v[2] = b1->fst; 
    v[3] = b1->snd;
    
    Vector vecs[4]; 
    vecs[0] = Vector_sub(bcrs->cross, v[0]->pos);
    vecs[1] = Vector_sub(bcrs->cross, v[1]->pos);
    vecs[2] = Vector_sub(bcrs->cross, v[2]->pos);
    vecs[3] = Vector_sub(bcrs->cross, v[3]->pos);
    
    double dsum;
    dsum = fmax(Vector_norm(vecs[0]), EPS) + fmax(Vector_norm(vecs[2]), EPS);

    double d0, d1;
    d0 = Vector_sub(v[1]->pos, v[0]->pos).len; 
    d1 = Vector_sub(v[3]->pos, v[2]->pos).len; 

    double gradient[8];
    dbump(gradient, dsum, d0 + d1, v[0]->pos, v[1]->pos, v[2]->pos, v[3]->pos);
    
    assert(!(gradient[0] != gradient[0]));
    assert(!(gradient[1] != gradient[1]));
    assert(!(gradient[2] != gradient[2]));
    assert(!(gradient[3] != gradient[3]));
    assert(!(gradient[4] != gradient[4]));
    assert(!(gradient[5] != gradient[5]));
    assert(!(gradient[6] != gradient[6]));
    assert(!(gradient[7] != gradient[7]));

    Vector v0_grad, v1_grad, v2_grad, v3_grad;
    v0_grad = Vector_initialize(gradient[0], gradient[1]);
    v1_grad = Vector_initialize(gradient[2], gradient[3]);
    v2_grad = Vector_initialize(gradient[4], gradient[5]);
    v3_grad = Vector_initialize(gradient[6], gradient[7]);

    double wi;
    wi = weight();
    
    VectorPointer rtn = Util_allocate(4, sizeof(Vector));
    
    if (!TEST) {
        rtn[0] = Vector_scalar_mult(v0_grad, -wi / v[0]->mass);
        rtn[1] = Vector_scalar_mult(v1_grad, -wi / v[1]->mass);
        rtn[2] = Vector_scalar_mult(v2_grad, -wi / v[2]->mass);
        rtn[3] = Vector_scalar_mult(v3_grad, -wi / v[3]->mass);
    } else {
        rtn[0] = Vector_scalar_mult(v0_grad, -wi);
        rtn[1] = Vector_scalar_mult(v1_grad, -wi);
        rtn[2] = Vector_scalar_mult(v2_grad, -wi);
        rtn[3] = Vector_scalar_mult(v3_grad, -wi);
    }
    
    return rtn;
}


void BondOverlap_free(const BondOverlapPointer bcrss)
{
    BondOverlapPointer bcrs = bcrss;
    while(bcrs != 0) {
        BondOverlapPointer tmp = bcrs;
        bcrs = bcrs->next;
        free(tmp);
        tmp = 0;
    }
}

/*****************************************************************************

* File Name: bond_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 30-07-2015

*****************************************************************************/

/* Public *******************************************************************/

BondPair BondPair_initialize(const Pair pr)
{
    BondPair rtn;
    rtn.fst = (BondPointer) pr.fst;
    rtn.snd = (BondPointer) pr.snd;

    return rtn;
}

BondPairPointer BondPair_create(const Pair pr)
{
    BondPairPointer rtn = Util_allocate_initialize(1, sizeof(BondPair));
    *rtn = BondPair_initialize(pr);

    return rtn;
}

/**
 * Returns 1 if the lines intersect, otherwise 0. In Vector_addition, if the
 * lines intersect the intersection point may be stored in the const doubles i_x
 * and i_y.  
 * Credit: http://stackoverflow.com/users/78216/gavin
 */
int BondPair_intersect(const BondPair bpr, VectorPointer v) 
{
    assert(v);

    BondPointer b0, b1;
    b0 = bpr.fst; b1 = bpr.snd;
    
    VertexPointer vertices[4];
    vertices[0] = b0->fst; 
    vertices[1] = b0->snd; 
    vertices[2] = b1->fst; 
    vertices[3] = b1->snd;

    double p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y;
    p0_x = vertices[0]->pos.x; p0_y = vertices[0]->pos.y;
    p1_x = vertices[1]->pos.x; p1_y = vertices[1]->pos.y;
    p2_x = vertices[2]->pos.x; p2_y = vertices[2]->pos.y;
    p3_x = vertices[3]->pos.x; p3_y = vertices[3]->pos.y;

    double s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;     
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     
    s2_y = p3_y - p2_y;

    double s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / 
        (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / 
        (-s2_x * s1_y + s1_x * s2_y);

    if (s >= EPS && s <= 1 - EPS && 
        t >= EPS && t <= 1 - EPS)
    {
        double i_x, i_y;
        i_x = p0_x + (t * s1_x);
        i_y = p0_y + (t * s1_y);
        *v = Vector_initialize(i_x, i_y);
        return 1;
    }
    return 0; 
}

int BondPair_has_common_vertex(const BondPair bpr) 
{
    BondPointer bp1, bp2;
    bp1 = bpr.fst; bp2 = bpr.snd;
    return  bp1->fst->id == bp2->fst->id ||
            bp1->fst->id == bp2->snd->id || 
            bp1->snd->id == bp2->fst->id ||
            bp1->snd->id == bp2->snd->id;
}

/*****************************************************************************

* File Name: Bond_set.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

BondSet BondSet_initialize(int nb)
{
    BondSet rtn;
    rtn.set = (BondPointer *) Util_allocate(nb, sizeof(BondPointer));
    rtn.n = nb;
    
    return rtn;
}

BondPointer BondSet_get_bond(const BondSet bs, const int i) 
{
    return *(bs.set + i);  
}

/*BondSetPointer BondSet_create(*/
        /*VertexPointer *vs, */
        /*json_value *contents, */
        /*int *nbp*/
    /*)*/
/*{*/
    /*BondSetPointer rtn;*/
    /*rtn = (BondSetPointer) malloc(sizeof(BondSet));*/
    /**rtn = BondSet_initialize(vs, contents, nbp);*/
    /*return rtn;*/
/*}*/

int *Bondset_to_array(BondSet bs)
{
    int *rtn = (int *) Util_allocate(bs.n * 2, sizeof(int));
    int i;
    for (i = 0; i < bs.n; i++) {
        *(rtn + i * 2) = (*(bs.set + i))->fst->id;
        *(rtn + i * 2 + 1) = (*(bs.set + i))->snd->id;
    }
    return rtn;
}

void BondSet_free(BondSet bs) 
{
    int i;
    for (i = 0; i < bs.n; i++) {
        Bond_free(*(bs.set + i));
    }
    free(bs.set);
}


double CrossingGradient_df0x0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-1-((-x0+x1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-y0+y1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x0+x1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0y0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x2+x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-x2+x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x2+x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x2+x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-1-((-x2+x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x2+x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y0+y1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0x1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((-2*pow(-x0+x1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(((-x0+x1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(2*(-y0+y1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x0+x1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0y1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((-2*pow(-x0+x1,2)*(x2-x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x2-x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+((2*(-x0+x1)*(x2-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+2*(((x2-x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y0+y1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0x2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(1-((-x0+x1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x2+x3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0y2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(x0-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(x0-x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*(x0-x1)*pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x0-x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(x0-x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((x0-x1)*(-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(1-((x0-x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((x0-x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y2+y3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0x3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y0-y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(y0-y1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(y0-y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((y0-y1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x2+x3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df0y3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(((2*pow(-x0+x1,2)*(-x0+x2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x0+x2)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x0+x2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-x0+x1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-x0+x2)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y2+y3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}


double CrossingGradient_df1x0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return -(-x0+x1)/(4.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))-(4*((-x0+x1)/(2.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((2*pow(-x0+x1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-1-((-x0+x1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-y0+y1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x0+x1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1y0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return -(-y0+y1)/(4.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))-(4*((-y0+y1)/(2.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((2*pow(-x0+x1,2)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x2+x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-x2+x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x2+x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x2+x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-1-((-x2+x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x2+x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y0+y1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1x1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (-x0+x1)/(4.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))-(4*(-(-x0+x1)/(2.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((-2*pow(-x0+x1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(((-x0+x1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(2*(-y0+y1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x0+x1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1y1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (-y0+y1)/(4.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))-(4*(-(-y0+y1)/(2.*sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((-2*pow(-x0+x1,2)*(x2-x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x2-x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+((2*(-x0+x1)*(x2-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+2*(((x2-x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y0+y1)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1x2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return -(-x2+x3)/(4.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(4*((-x2+x3)/(2.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(1-((-x0+x1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x2+x3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1y2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return -(-y2+y3)/(4.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(4*((-y2+y3)/(2.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(x0-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(x0-x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*(x0-x1)*pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x0-x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(x0-x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((x0-x1)*(-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(1-((x0-x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((x0-x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y2+y3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}


double CrossingGradient_df1x3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (-x2+x3)/(4.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(4*(-(-x2+x3)/(2.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y0-y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(y0-y1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(y0-y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((y0-y1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x2+x3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df1y3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (-y2+y3)/(4.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(4*(-(-y2+y3)/(2.*sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(-x0+x2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x0+x2)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x0+x2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-x0+x1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-x0+x2)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y2+y3)*pow(sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))/2.+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}


double CrossingGradient_df2x0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*((-x0+x1)/sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+((2*pow(-x0+x1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(y2-y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-1-((-x0+x1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y2-y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-y0+y1)*(y2-y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x0+x1)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2y0(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*((-y0+y1)/sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+((2*pow(-x0+x1,2)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x2+x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-x2+x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x2+x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x2+x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-x2+x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-1-((-x2+x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x2+x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y0+y1)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
 }

double CrossingGradient_df2x1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
 {
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(-((-x0+x1)/sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((-2*pow(-x0+x1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,2)*(-y2+y3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-x0+x1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(((-x0+x1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(2*(-y0+y1)*(-y2+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x0+x1)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2y1(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(-((-y0+y1)/sqrt(pow(-x0+x1,2)+pow(-y0+y1,2)))+((-2*pow(-x0+x1,2)*(x2-x3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x2-x3)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)+(2*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+((2*(-x0+x1)*(x2-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+2*(((x2-x3)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y0+y1)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2x2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*((-x2+x3)/sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+((2*pow(-x0+x1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(-y0+y3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(-y0+y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*pow(-y0+y1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(1-((-x0+x1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(-y0+y3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-x2+x3)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2y2(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*((-y2+y3)/sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+((2*pow(-x0+x1,2)*(x0-x3)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(x0-x3)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*(x0-x1)*pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(x0-x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(x0-x3))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((x0-x1)*(-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(1-((x0-x3)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))+((x0-x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+(2*(-y2+y3)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2x3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(-((-x2+x3)/sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*pow(-y0+y1,2)*(y0-y2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,2)*(y0-y1)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(y0-y1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(y0-y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-y0+y1)*(y0-y2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((y0-y1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-x2+x3)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

double CrossingGradient_df2y3(
        Vector v0, 
        Vector v1, 
        Vector v2,
        Vector v3
)
{
    double x0, y0, x1, y1, x2, y2, x3, y3;
	x0=v0.x;
	y0=v0.y;
	x1=v1.x;
	y1=v1.y;
	x2=v2.x;
	y2=v2.y;
	x3=v3.x;
	y3=v3.y;
return (4*(-((-y2+y3)/sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))+((2*pow(-x0+x1,2)*(-x0+x2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(2*(-x0+x2)*pow(-y0+y1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)-(2*pow(-x0+x1,3)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3)-(2*(-x0+x1)*pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),3))/(2.*sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)))+(2*(-(((-x0+x1)*(-x0+x2))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+(pow(-x0+x1,2)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+2*(-(((-x0+x2)*(-y0+y1))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)))+((-x0+x1)*(-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))*(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3))))/(2.*sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))*(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2))))/(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)))-(2*(-y2+y3)*pow(-sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))-sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))+sqrt((pow(-x0+x1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2)+(pow(-y0+y1,2)*pow((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3),2))/pow(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3),2))+sqrt(pow(-x0+x2-((-x0+x1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)+pow(-y0+y2-((-y0+y1)*((-x2+x3)*(y0-y2)-(x0-x2)*(-y2+y3)))/(-((-x2+x3)*(-y0+y1))+(-x0+x1)*(-y2+y3)),2)),2))/(sqrt(pow(-x2+x3,2)+pow(-y2+y3,2))*pow(sqrt(pow(-x0+x1,2)+pow(-y0+y1,2))+sqrt(pow(-x2+x3,2)+pow(-y2+y3,2)),2));
}

/*****************************************************************************

* File Name: objective.c 
* Author: Ludvp0g Sundström

* Description: The objective function F = F1 + F2 + F3 + F4 where FN considers
* N vertices. 

* Creation Date: 05-07-2015

*****************************************************************************/

/* Private ******************************************************************/

static void first_order_energy(const GraphPointer graph) 
{
    VertexSet vs; 
    vs = graph->vs;
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = *(vs.set + i);
        
        Bond b;
        b = Bond_initialize(v, &graph->center, 0.0); 

        double e;
        e = Bond_attraction_energy(&b);

        graph->energy += e;
        v->energy = e;
    }
}

static void second_order_attraction_energy(const GraphPointer graph) 
{
    BondSet bs;
    bs = graph->bs;
    int i;
    for (i = 0; i < bs.n; i++) {
        BondPointer b;
        b = *(bs.set + i);
        double e;
        e = Bond_attraction_energy(b);
        graph->energy += e;
        b->fst->energy += e / 2;
        b->snd->energy += e / 2;
    }
}

static void second_order_repulsion_energy(const GraphPointer graph) 
{
    GridPointer grid;
    grid = graph->grid;
    int i;
    for (i = 0; i < grid->npz; i++) {
        ZonePointer zp = *(grid->pzps + i);
        VertexPointer v0 = zp->members;
        while (v0->next) {
            VertexPointer v1;
            v1 = v0->next; 
            while (v1) {
                Pair pr;
                if (v0->id > v1->id) {
                    pr = Pair_initialize(v1, v0);
                } else {
                    pr = Pair_initialize(v0, v1);
                }
                double e;
                e = VertexPair_repulsion_energy(pr);
                graph->energy += e;
                v0->energy += e / 2;
                v1->energy += e / 2;
                v1 = v1->next;
            }
            v0 = v0->next;
        }
    }
    ZonePairPointer z2p = grid->azps;
    while (z2p) {
        VertexPointer v0;
        v0 = z2p->fst->members;
        while (v0) {
            VertexPointer v1;
            v1 = z2p->snd->members;
            while (v1) {
                Pair pr;
                if (v0->id > v1->id) {
                    pr = Pair_initialize(v1, v0);
                } else {
                    pr = Pair_initialize(v0, v1);
                }
                double e;
                e = VertexPair_repulsion_energy(pr);
                graph->energy += e;
                v0->energy += e / 2;
                v1->energy += e / 2;
                v1 = v1->next;          
            }
            v0 = v0->next;
        }
        z2p = z2p->next;
    }
}

static void second_order_energy(const GraphPointer graph)
{
    second_order_attraction_energy(graph);
    second_order_repulsion_energy(graph);
}

static void third_order_energy(const GraphPointer graph)
{
    
    BondConnectionPointer bpr;
    bpr = graph->con;

    while (bpr) {
        double e;
        e = BondConnection_angular_energy(bpr);
        graph->energy += e;
        bpr->common->energy += e / 3;
        bpr->other1->energy += e / 3;
        bpr->other2->energy += e / 3;
        bpr = bpr->next;
    }
}

static void fourth_order_energy(const GraphPointer graph)
{
    BondOverlapPointer bcrs;
    bcrs = graph->crs;

    while (bcrs) {
        double e;
        e = BondOverlap_overlap_energy(bcrs);
        graph->energy += e;
        bcrs->bpr.fst->fst->energy += e / 4;
        bcrs->bpr.fst->snd->energy += e / 4;
        bcrs->bpr.snd->fst->energy += e / 4;
        bcrs->bpr.snd->snd->energy += e / 4;
        bcrs = bcrs->next;
    }
}

/* Public *******************************************************************/

void Energy_calculate(const GraphPointer graph) 
{
    graph->energy = 0.0;
    first_order_energy(graph);
    second_order_energy(graph);
    third_order_energy(graph);
    fourth_order_energy(graph);

    assert(!(graph->energy != graph->energy));
}

/*****************************************************************************

 * File Name: global_minimizer.c

 * Author: Ludvig Sundström

 * Description: 

 * Creation Date: 13-08-2015

 *****************************************************************************/

/* Private *****************************************************************/

#define ERR_NO_NUM -1
#define ERR_NO_MEM -2

int myRandom (int size) {
    int i, n;
    static int numNums = 0;
    static int *numArr = NULL;

    // Initialize with a specific size.

    if (size >= 0) {
        if (numArr != NULL)
            free (numArr);
        if ((numArr = malloc (sizeof(int) * size)) == NULL)
            return ERR_NO_MEM;
        for (i = 0; i  < size; i++)
            numArr[i] = i;
        numNums = size;
    }

    // Error if no numbers left in pool.

    if (numNums == 0)
        return ERR_NO_NUM;

    // Get random number from pool and remove it (rnd in this
    //   case returns a number between 0 and numNums-1 inclusive).

    n = rand() % numNums;
    i = numArr[n];
    numArr[n] = numArr[numNums-1];
    numNums--;
    if (numNums == 0) {
        free (numArr);
        numArr = 0;
    }

    return i;
}

static VertexSet pick_subset_random(const VertexSet vs, const int n)
{
    int i, count;
    count = 0;
    i = myRandom (vs.n);
    VertexSet rtn;
    rtn = VertexSet_initialize(n);
    while (i >= 0) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        VertexSet_update_vertex(vs, i, v);
        i = myRandom (-1);
        if (count > n) {
            break;
        } else {
            count++;
        }
    }
    return rtn;
}

static VertexSet pick_subset(const VertexSet vs, const int n) 
{
    return pick_subset_random(vs, n);
}

Vector generate_move()
{
    double x, y;
    x = (((double) rand()) / RAND_MAX) * 2 - 1;
    y = (((double) rand()) / RAND_MAX) * 2 - 1;

    assert(x < 1 && x >= -1 && y < 1 && y >= -1); 

    double a = 0.01;

    Vector rtn;
    rtn = Vector_scalar_mult(Vector_initialize(x, y), a);

    return rtn;    
}

static void mutate(const GraphPointer graph)
{
    assert(graph);
    assert(graph->vs.n);

    VertexSet vs;
    vs = graph->vs; 

    int n;
    n = vs.n / 5; 

    VertexSet subset;
    subset = pick_subset(vs, n);

    int i; 
    for (i = 0; i < n; i++) {
        Vector new_pos;
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        new_pos = Vector_add(v->pos, generate_move());
        Vertex_set_position(v, new_pos);
    }
}

/* Public ******************************************************************/

void GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer),
        void (*g_fun)(GraphPointer)
        )
{
    assert(graph);
    double e0 = graph->energy; 
    srand(time(NULL));
    int i; 

    for (i = 0; i < G_ITMAX; i++) {
        e_fun(graph);

        double old_e; 
        old_e = graph->energy;

        VertexSet vs = graph->vs;
        VectorPointer ps_0;
        ps_0 = VertexSet_positions(vs);

        mutate(graph);
        LocalMinimizer_run(graph, e_fun, g_fun, FTOL);

        e_fun(graph);

        double new_e; 
        new_e = graph->energy;

        double energy_ratio;
        energy_ratio = new_e / old_e;

        assert(!(energy_ratio != energy_ratio));
        double temperature, r, c;
        temperature = Util_is_zero(TEMPERATURE) ? MIN_DIST : TEMPERATURE;
        r = (((double) rand()) / RAND_MAX);
        c = exp(-(new_e - old_e) / temperature);
        if (new_e > old_e && r > c) {
            int j;
            for (j = 0; j < vs.n; j++) {
                VertexPointer v;
                v = VertexSet_get_vertex(vs, j);
                Vertex_set_position(v, *(ps_0 + j));
            }
        }
        free(ps_0);
    }
    double e1 = graph->energy;
    double rat = e1 / e0;
    if (PRINT_STATISTICS) {
        printf("%f%% energy improvement\n", (1 - rat) * 100);
    }
}

/***************************************************************************** 

 * File Name: gradient.c

 * Author: Ludvig Sundström

 * Description: The gradient of the objective function.

 * Creation Date: 06-07-2015

 *****************************************************************************/

        /* Private ******************************************************************/

static void apply_repulsion(const VertexPointer vi, const VertexPointer vj) 
{
    Vector rpls_grad;
    Pair pr = Pair_initialize(vi, vj);
    rpls_grad = VertexPair_repulsion_gradient(pr);

    vi->gradient = Vector_add(vi->gradient, rpls_grad);
    vj->gradient = Vector_add(vj->gradient, Vector_negate(rpls_grad));
}

static void first_order_gradient(const GraphPointer graph)
{
    VertexSet vs;
    vs = graph->vs;

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = *(vs.set + i);

        Bond b;
        b = Bond_initialize(v, &graph->center, 0.0); 
        b.stiffness = WPOT;

        v->gradient = Vector_add(v->gradient, Bond_attraction_gradient(&b));
    }
}

static void second_order_repulsion_gradient(const GridPointer grid)
{
    int i;
    for (i = 0; i < grid->npz; i++) {
        ZonePointer z = *(grid->pzps + i);
        VertexPointer vi = z->members;
        while (vi->next) {
            VertexPointer vj;
            vj = vi->next; 
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;
            }
            vi = vi->next;
        }
    }
    ZonePairPointer z2p = grid->azps;
    while (z2p) {
        VertexPointer vi;
        vi = z2p->fst->members;
        while (vi) {
            VertexPointer vj;
            vj = z2p->snd->members;
            while (vj) {
                if (vi->id > vj->id) {
                    apply_repulsion(vj, vi);
                } else {
                    apply_repulsion(vi, vj);
                }
                vj = vj->next;          
            }
            vi = vi->next;
        }
        z2p = z2p->next;
    }
}

static void second_order_attraction_gradient(const BondSet bs)
{
    int i;
    for (i = 0; i < bs.n; i++) {
        BondPointer b;
        b = *(bs.set + i);
        Vector grad, neg_grad;
        grad = Bond_attraction_gradient(b);
        neg_grad = Vector_negate(grad);

        b->fst->gradient = Vector_add(b->fst->gradient, grad);
        b->snd->gradient = Vector_add(b->snd->gradient, neg_grad);
    }
}

static void second_order_gradient(const GraphPointer graph)
{
    second_order_repulsion_gradient(graph->grid);
    second_order_attraction_gradient(graph->bs);
}

static void third_order_gradient(const BondConnectionPointer con)
{
    BondConnectionPointer bpr = con;
    while (bpr) {

        VectorPointer grad;
        grad = BondConnection_angular_gradient(bpr);
        VertexPointer vi, vj, vk;
        vi = bpr->other1; 
        vj = bpr->common; 
        vk = bpr->other2; 

        vi->gradient = Vector_add(vi->gradient, grad[0]);
        vj->gradient = Vector_add(vj->gradient, grad[1]);
        vk->gradient = Vector_add(vk->gradient, grad[2]);

        free(grad); 

        bpr = bpr->next;
    }
}

static void fourth_order_gradient(const BondOverlapPointer crs)
{
    BondOverlapPointer bcrs;
    bcrs = crs;
    while (bcrs) {

        VectorPointer grad = BondOverlap_overlap_gradient(bcrs);

        VertexPointer v0, v1, v2, v3;
        v0 = bcrs->bpr.fst->fst; v1 = bcrs->bpr.fst->snd; 
        v2 = bcrs->bpr.snd->fst; v3 = bcrs->bpr.snd->snd;

        v0->gradient = Vector_add(v0->gradient, grad[0]);
        v1->gradient = Vector_add(v1->gradient, grad[1]);
        v2->gradient = Vector_add(v2->gradient, grad[2]);
        v3->gradient = Vector_add(v3->gradient, grad[3]);

        free(grad); 

        bcrs = bcrs->next;
    }
}

/* Public *******************************************************************/

void Gradient_calculate(const GraphPointer graph)
{
    first_order_gradient(graph);
    second_order_gradient(graph);
    third_order_gradient(graph->con);
    fourth_order_gradient(graph->crs);
}

/* Test facade *************************************************************/

/*****************************************************************************

 * File Name: graph.c

 * Author: Ludvig Sundström

 * Description: 

 * Creation Date: 07-07-2015

 *****************************************************************************/

    /* Private ******************************************************************/

GraphPointer create(VertexSet vs, BondSet bs) 
{
    assert(vs.set && bs.set);
    assert(vs.n > 0);

    GraphPointer rtn; 
    rtn = (GraphPointer) calloc(1, sizeof(Graph));

    rtn->grid = Grid_create(); 
    rtn->con = NULL; rtn->crs = NULL;
    rtn->energy = 0;
    rtn->vs = vs; 
    rtn->bs = bs;

    rtn->center = Vertex_initialize(-1, Vector_zero(), "center", 'c', 1);

    Graph_detect_connected(rtn);

    assert(rtn); 
    return rtn;
}

/** 
 * Given a vertex in a graph, assign it a zone.
 */

static void assign_vertex_to_zone(
        const GridPointer grid, 
        const VertexPointer v
        )
{
    assert(grid && v);
    assert(grid->nz > 0 && grid->is_populated);
    assert(grid->zps && grid->pzps);

    Grid_append_vertex(grid, v);
}

static void link_bondconnection(const GraphPointer graph, const Pair pr) 
{
    BondConnectionPointer newpr;
    newpr = BondConnection_create(pr);
    newpr->next = graph->con;
    graph->con = newpr;
}

static void link_bondcross(
        const GraphPointer graph, 
        const BondPair bpr, 
        const Vector cross
        )
{
    BondOverlapPointer bcrs;
    bcrs = BondOverlap_create(bpr, cross);
    bcrs->next = graph->crs;
    graph->crs = bcrs;
} 

/* Public ******************************************************************/

GraphPointer Graph_create(const char *fname) 
{
    Pair pr;
    pr = process_json(fname);

    VertexSetPointer vs;
    vs = (VertexSetPointer) pr.fst; 

    BondSetPointer bs;
    bs = (BondSetPointer) pr.snd; 

    assert(bs->n < (double) vs->n * log((double) vs->n));
    assert(pr.fst && pr.snd);

    GraphPointer rtn;
    rtn = create(*vs, *bs);

    free(vs);
    free(bs);

    Placement_set_spiral(rtn->vs); 
    Graph_reset_dynamic_data(rtn);

    assert(rtn->grid && rtn->vs.set && rtn->bs.set);
    assert(rtn->vs.n > 0 && rtn->vs.n <= MAX_NV);
    assert(rtn->bs.n >= 0);

    return rtn;
}

void Graph_reset_dynamic_data(const GraphPointer graph)
{
    assert(graph && graph->grid && graph->vs.n > 0 && graph->vs.set);

    Grid_reset_dynamic_data(graph->grid);

    if (graph->crs) BondOverlap_free(graph->crs);
    graph->crs = NULL;

    int i;
    for (i = 0; i < graph->vs.n; i++) {
        VertexPointer v = *(graph->vs.set + i);
        Vertex_reset_dynamics(v);
        assign_vertex_to_zone(graph->grid, v);
    }

    Grid_detect_adjacent_zones(graph->grid);
    Graph_detect_overlapping_bonds(graph);
}

void Graph_detect_overlapping_bonds(const GraphPointer graph)
{
    assert(graph && graph->bs.set && graph->bs.n >= 0);
    assert(!graph->crs);

    BondSet bs;
    bs = graph->bs;
    graph->ncrosses = 0;
    int i;
    for (i = 0; i < bs.n - 1; i++) {
        int j;
        for (j = i + 1; j < bs.n; j++) {
            BondPointer fst, snd;
            fst = BondSet_get_bond(bs, i);
            snd = BondSet_get_bond(bs, j);

            BondPair bpr;
            bpr = BondPair_initialize(Pair_initialize(fst, snd));

            int crossing;
            Vector cross;
            crossing = BondPair_intersect(bpr, &cross);
            if (crossing) {
                graph->ncrosses++;
                link_bondcross(graph, bpr, cross);
            } 
        }
    }
}

void Graph_detect_connected(const GraphPointer graph)
{
    assert(!graph->con);
    int i;
    for (i = 0; i < graph->bs.n - 1; i++) {
        int j;
        for (j = i + 1; j < graph->bs.n; j++) {
            BondPointer fst, snd;
            fst = BondSet_get_bond(graph->bs, i);
            snd = BondSet_get_bond(graph->bs, j);
            Pair pr = Pair_initialize(fst, snd);
            int common;
            common = BondPair_has_common_vertex(BondPair_initialize(pr));
            if (common) {
                link_bondconnection(graph, Pair_initialize(fst, snd));
            }
        }
    }
}

double Graph_angular_resolution(const GraphPointer graph)
{
    int i;
    double rtn = 0;
    for (i = 0; i < graph->bs.n - 1; i++) {
        int j;
        for (j = i + 1; j < graph->bs.n; j++) {
            BondPointer fst, snd;
            fst = BondSet_get_bond(graph->bs, i);
            snd = BondSet_get_bond(graph->bs, j);
            Pair pr = Pair_initialize(fst, snd);
            int common;
            common = BondPair_has_common_vertex(BondPair_initialize(pr));
            if (common) {
                BondConnectionPointer bconn;
                bconn = BondConnection_create(pr);
                VertexPointer vi, vj, vk;
                vi = bconn->other1; 
                vj = bconn->common;
                vk = bconn->other2; 
                double xji, yji, xjk, yjk;
                xji = vi->pos.x - vj->pos.x; yji = vi->pos.y - vj->pos.y;
                xjk = vk->pos.x - vj->pos.x; yjk = vk->pos.y - vj->pos.y;

                Vector vecji, vecjk;
                vecji = Vector_initialize(xji, yji);
                vecjk = Vector_initialize(xjk, yjk);

                rtn += Vector_angle(vecji, vecjk);
            }
        }
    }
    return rtn;
}

void Graph_free(const GraphPointer graph)
{
    if (graph->con) BondConnections_free(graph->con);
    if (graph->crs) BondOverlap_free(graph->crs);
    VertexSet_free(graph->vs);
    BondSet_free(graph->bs);
    Grid_free(graph->grid);
    free(graph->grid);
    free(graph);
}

/*****************************************************************************

 * File Name: grid.c

 * Author: Ludvig Sundström

 * Description: A collection of adjacent zones 

 * Creation Date: 31-07-2015

 *****************************************************************************/

        /* Private ******************************************************************/

int zone_idx(const VertexPointer v)
{
    int rtn;
    if (v->pos.x >= PANEL_X) {
        rtn = PANEL_X / PADDING - 1;
    } else if (v->pos.x <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.x) / PADDING;
    }
    return rtn; 
}

int zone_idy(const VertexPointer v)
{
    int rtn;
    if (v->pos.y >= PANEL_Y) {
        rtn = PANEL_Y / PADDING - 1;
    } else if (v->pos.y <= 0) {
        rtn = 0;
    } else {
        rtn = ((int) v->pos.y) / PADDING;
    }
    return rtn;
}

/* Public *******************************************************************/

GridPointer Grid_create()
{
    GridPointer rtn;
    rtn = (GridPointer) Util_allocate(1, sizeof(Grid));

    rtn->nz = 0;

    int nzones; 
    nzones = GRID_DIM_X * GRID_DIM_Y;

    rtn->zps = (ZonePointer *) Util_allocate_initialize(nzones, sizeof(Zone));
    int i, j, id;
    for (j = 0; j < GRID_DIM_Y; j++) {
        for (i = 0; i < GRID_DIM_X; i++) {
            id = (j * GRID_DIM_Y) + i;
            ZonePointer z;
            z= Zone_create(id, i, j, 
                    (double) i * PADDING, (double) j * PADDING, 
                    (double) PADDING, (double) PADDING);
            *(rtn->zps + id) = z;
            rtn->nz++;
        }
    }
    rtn->is_populated = (int *) Util_allocate_initialize(rtn->nz, sizeof(int));
    rtn->pzps = (ZonePointer *) Util_allocate_initialize(rtn->nz, sizeof(void *));
    rtn->azps = 0;
    rtn->npz = 0;

    return rtn;
}

ZonePointer Grid_get_zone(const GridPointer grid, const int x, const int y)
{
    assert(x < GRID_DIM_X && x >= 0);
    assert(y < GRID_DIM_Y && y >= 0);

    return *(grid->zps + (y * GRID_DIM_X) + x);
}

void Grid_append_vertex(const GridPointer grid, const VertexPointer v)
{
    int i, j; 
    i = zone_idx(v);
    j = zone_idy(v);
    ZonePointer z = Grid_get_zone(grid, i, j);
    v->next = z->members;
    z->members = v;
    if (!*(grid->is_populated + z->id)) {
        *(grid->pzps + grid->npz) = z;
        grid->npz++;
    }
    *(grid->is_populated + z->id) = 1;
}

void Grid_detect_adjacent_zones(const GridPointer grid) 
{
    int i, j;
    for (i = 0; i < grid->npz - 1; i++) {
        for (j = i + 1; j < grid->npz; j++) {
            ZonePointer zi = *(grid->pzps + i);
            ZonePointer zj = *(grid->pzps + j);
            int diff;
            diff = zi->id - zj->id;

            int adj; 
            adj = 
                diff == 1 || 
                diff == -1 || 
                diff == GRID_DIM_X || 
                diff == -GRID_DIM_X ||
                diff == GRID_DIM_X - 1 ||
                diff == GRID_DIM_X + 1 ||
                diff == -GRID_DIM_X - 1 ||
                diff == -GRID_DIM_X + 1;
            if (adj) {
                Pair pr = Pair_initialize(zi, zj);
                ZonePairPointer newz2p = ZonePair_create(pr, grid->azps);
                grid->azps = newz2p;
            }
        }
    }
}

void Grid_reset_dynamic_data(const GridPointer grid)
{
    if (grid->azps) ZonePairs_free(grid->azps);
    grid->azps = 0;
    grid->npz = 0;
    int i;
    for (i = 0; i < grid->nz; i++) {
        *(grid->is_populated + i) = 0;
        ZonePointer z = *(grid->zps + i);
        if (z) z->members = 0;
    }
}

int *Grid_to_array(const GridPointer grid)
{
    int *rtn;
    rtn = (int *) Util_allocate(grid->nz * 3, sizeof(int));
    int i;
    for (i = 0; i < grid->nz; i++) {
        ZonePointer z = *(grid->zps + i);
        *(rtn + i * 3) = z->minx;
        *(rtn + i * 3 + 1) = z->miny;
        *(rtn + i * 3 + 2) = z->width;
    }
    return rtn;
}

void Grid_free(const GridPointer grid)
{
    ZonePairs_free(grid->azps);
    Zones_free(grid->zps, grid->nz);
    free(grid->pzps);
    free(grid->zps);
    free(grid->is_populated);
}
/* vim: set et ts=3 sw=3 sts=3 ft=c:
 *
 * Copyright (C) 2012, 2013, 2014 James McLaughlin et al.  All rights reserved.
 * https://github.com/udp/json-parser
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

#ifdef _MSC_VER
#ifndef _CRT_SECURE_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#endif
#endif

            const struct _json_value json_value_none;

            typedef unsigned int json_uchar;

static unsigned char hex_value (json_char c)
{
    if (isdigit(c))
        return c - '0';

    switch (c) {
        case 'a': case 'A': return 0x0A;
        case 'b': case 'B': return 0x0B;
        case 'c': case 'C': return 0x0C;
        case 'd': case 'D': return 0x0D;
        case 'e': case 'E': return 0x0E;
        case 'f': case 'F': return 0x0F;
        default: return 0xFF;
    }
}

typedef struct
{
    unsigned long used_memory;

    unsigned int uint_max;
    unsigned long ulong_max;

    json_settings settings;
    int first_pass;

    const json_char * ptr;
    unsigned int cur_line, cur_col;

} json_state;

static void * default_alloc (size_t size, int zero, void * user_data)
{
    return zero ? calloc (1, size) : malloc (size);
}

static void default_free (void * ptr, void * user_data)
{
    free (ptr);
}

static void * json_alloc (json_state * state, unsigned long size, int zero)
{
    if ((state->ulong_max - state->used_memory) < size)
        return 0;

    if (state->settings.max_memory
            && (state->used_memory += size) > state->settings.max_memory)
    {
        return 0;
    }

    return state->settings.mem_alloc (size, zero, state->settings.user_data);
}

static int new_value (json_state * state,
        json_value ** top, json_value ** root, json_value ** alloc,
        json_type type)
{
    json_value * value;
    int values_size;

    if (!state->first_pass)
    {
        value = *top = *alloc;
        *alloc = (*alloc)->_reserved.next_alloc;

        if (!*root)
            *root = value;

        switch (value->type)
        {
            case json_array:

                if (value->u.array.length == 0)
                    break;

                if (! (value->u.array.values = (json_value **) json_alloc
                            (state, value->u.array.length * sizeof (json_value *), 0)) )
                {
                    return 0;
                }

                value->u.array.length = 0;
                break;

            case json_object:

                if (value->u.object.length == 0)
                    break;

                values_size = sizeof (*value->u.object.values) * value->u.object.length;

                if (! (value->u.object.values = (json_object_entry *) json_alloc
                            (state, values_size + ((unsigned long) value->u.object.values), 0)) )
                {
                    return 0;
                }

                value->_reserved.object_mem = (*(char **) &value->u.object.values) + values_size;

                value->u.object.length = 0;
                break;

            case json_string:

                if (! (value->u.string.ptr = (json_char *) json_alloc
                            (state, (value->u.string.length + 1) * sizeof (json_char), 0)) )
                {
                    return 0;
                }

                value->u.string.length = 0;
                break;

            default:
                break;
        };

        return 1;
    }

    if (! (value = (json_value *) json_alloc
                (state, sizeof (json_value) + state->settings.value_extra, 1)))
    {
        return 0;
    }

    if (!*root)
        *root = value;

    value->type = type;
    value->parent = *top;

#ifdef JSON_TRACK_SOURCE
    value->line = state->cur_line;
    value->col = state->cur_col;
#endif

    if (*alloc)
        (*alloc)->_reserved.next_alloc = value;

    *alloc = *top = value;

    return 1;
}

#define whitespace \
    case '\n': ++ state.cur_line;  state.cur_col = 0; \
case ' ': case '\t': case '\r'

#define string_add(b)  \
    do { if (!state.first_pass) string [string_length] = b;  ++ string_length; } while (0);

#define line_and_col \
    state.cur_line, state.cur_col

static const long
flag_next             = 1 << 0,
                      flag_reproc           = 1 << 1,
                      flag_need_comma       = 1 << 2,
                      flag_seek_value       = 1 << 3, 
                      flag_escaped          = 1 << 4,
                      flag_string           = 1 << 5,
                      flag_need_colon       = 1 << 6,
                      flag_done             = 1 << 7,
                      flag_num_negative     = 1 << 8,
                      flag_num_zero         = 1 << 9,
                      flag_num_e            = 1 << 10,
                      flag_num_e_got_sign   = 1 << 11,
                      flag_num_e_negative   = 1 << 12,
                      flag_line_comment     = 1 << 13,
                      flag_block_comment    = 1 << 14;

json_value * json_parse_ex (json_settings * settings,
        const json_char * json,
        size_t length,
        char * error_buf)
{
    json_char error [json_error_max];
    const json_char * end;
    json_value * top, * root, * alloc = 0;
    json_state state = { 0 };
    long flags;
    long num_digits = 0, num_e = 0;
    json_int_t num_fraction = 0;

    /* Skip UTF-8 BOM
    */
    if (length >= 3 && ((unsigned char) json [0]) == 0xEF
            && ((unsigned char) json [1]) == 0xBB
            && ((unsigned char) json [2]) == 0xBF)
    {
        json += 3;
        length -= 3;
    }

    error[0] = '\0';
    end = (json + length);

    memcpy (&state.settings, settings, sizeof (json_settings));

    if (!state.settings.mem_alloc)
        state.settings.mem_alloc = default_alloc;

    if (!state.settings.mem_free)
        state.settings.mem_free = default_free;

    memset (&state.uint_max, 0xFF, sizeof (state.uint_max));
    memset (&state.ulong_max, 0xFF, sizeof (state.ulong_max));

    state.uint_max -= 8; /* limit of how much can be added before next check */
    state.ulong_max -= 8;

    for (state.first_pass = 1; state.first_pass >= 0; -- state.first_pass)
    {
        json_uchar uchar;
        unsigned char uc_b1, uc_b2, uc_b3, uc_b4;
        json_char * string = 0;
        unsigned int string_length = 0;

        top = root = 0;
        flags = flag_seek_value;

        state.cur_line = 1;

        for (state.ptr = json ;; ++ state.ptr)
        {
            json_char b = (state.ptr == end ? 0 : *state.ptr);

            if (flags & flag_string)
            {
                if (!b)
                {  sprintf (error, "Unexpected EOF in string (at %d:%d)", line_and_col);
                    goto e_failed;
                }

                if (string_length > state.uint_max)
                    goto e_overflow;

                if (flags & flag_escaped)
                {
                    flags &= ~ flag_escaped;

                    switch (b)
                    {
                        case 'b':  string_add ('\b');  break;
                        case 'f':  string_add ('\f');  break;
                        case 'n':  string_add ('\n');  break;
                        case 'r':  string_add ('\r');  break;
                        case 't':  string_add ('\t');  break;
                        case 'u':

                                   if (end - state.ptr < 4 || 
                                           (uc_b1 = hex_value (*++ state.ptr)) == 0xFF ||
                                           (uc_b2 = hex_value (*++ state.ptr)) == 0xFF ||
                                           (uc_b3 = hex_value (*++ state.ptr)) == 0xFF ||
                                           (uc_b4 = hex_value (*++ state.ptr)) == 0xFF)
                                   {
                                       sprintf (error, "Invalid character value `%c` (at %d:%d)", b, line_and_col);
                                       goto e_failed;
                                   }

                                   uc_b1 = (uc_b1 << 4) | uc_b2;
                                   uc_b2 = (uc_b3 << 4) | uc_b4;
                                   uchar = (uc_b1 << 8) | uc_b2;

                                   if ((uchar & 0xF800) == 0xD800) {
                                       json_uchar uchar2;

                                       if (end - state.ptr < 6 || (*++ state.ptr) != '\\' || (*++ state.ptr) != 'u' ||
                                               (uc_b1 = hex_value (*++ state.ptr)) == 0xFF ||
                                               (uc_b2 = hex_value (*++ state.ptr)) == 0xFF ||
                                               (uc_b3 = hex_value (*++ state.ptr)) == 0xFF ||
                                               (uc_b4 = hex_value (*++ state.ptr)) == 0xFF)
                                       {
                                           sprintf (error, "Invalid character value `%c` (at %d:%d)", b, line_and_col);
                                           goto e_failed;
                                       }

                                       uc_b1 = (uc_b1 << 4) | uc_b2;
                                       uc_b2 = (uc_b3 << 4) | uc_b4;
                                       uchar2 = (uc_b1 << 8) | uc_b2;

                                       uchar = 0x010000 | ((uchar & 0x3FF) << 10) | (uchar2 & 0x3FF);
                                   }

                                   if (sizeof (json_char) >= sizeof (json_uchar) || (uchar <= 0x7F))
                                   {
                                       string_add ((json_char) uchar);
                                       break;
                                   }

                                   if (uchar <= 0x7FF)
                                   {
                                       if (state.first_pass)
                                           string_length += 2;
                                       else
                                       {  string [string_length ++] = 0xC0 | (uchar >> 6);
                                           string [string_length ++] = 0x80 | (uchar & 0x3F);
                                       }

                                       break;
                                   }

                                   if (uchar <= 0xFFFF) {
                                       if (state.first_pass)
                                           string_length += 3;
                                       else
                                       {  string [string_length ++] = 0xE0 | (uchar >> 12);
                                           string [string_length ++] = 0x80 | ((uchar >> 6) & 0x3F);
                                           string [string_length ++] = 0x80 | (uchar & 0x3F);
                                       }

                                       break;
                                   }

                                   if (state.first_pass)
                                       string_length += 4;
                                   else
                                   {  string [string_length ++] = 0xF0 | (uchar >> 18);
                                       string [string_length ++] = 0x80 | ((uchar >> 12) & 0x3F);
                                       string [string_length ++] = 0x80 | ((uchar >> 6) & 0x3F);
                                       string [string_length ++] = 0x80 | (uchar & 0x3F);
                                   }

                                   break;

                        default:
                                   string_add (b);
                    };

                    continue;
                }

                if (b == '\\')
                {
                    flags |= flag_escaped;
                    continue;
                }

                if (b == '"')
                {
                    if (!state.first_pass)
                        string [string_length] = 0;

                    flags &= ~ flag_string;
                    string = 0;

                    switch (top->type)
                    {
                        case json_string:

                            top->u.string.length = string_length;
                            flags |= flag_next;

                            break;

                        case json_object:

                            if (state.first_pass)
                                (*(json_char **) &top->u.object.values) += string_length + 1;
                            else
                            {  
                                top->u.object.values [top->u.object.length].name
                                    = (json_char *) top->_reserved.object_mem;

                                top->u.object.values [top->u.object.length].name_length
                                    = string_length;

                                (*(json_char **) &top->_reserved.object_mem) += string_length + 1;
                            }

                            flags |= flag_seek_value | flag_need_colon;
                            continue;

                        default:
                            break;
                    };
                }
                else
                {
                    string_add (b);
                    continue;
                }
            }

            if (state.settings.settings & json_enable_comments)
            {
                if (flags & (flag_line_comment | flag_block_comment))
                {
                    if (flags & flag_line_comment)
                    {
                        if (b == '\r' || b == '\n' || !b)
                        {
                            flags &= ~ flag_line_comment;
                            -- state.ptr;  /* so null can be reproc'd */
                        }

                        continue;
                    }

                    if (flags & flag_block_comment)
                    {
                        if (!b)
                        {  sprintf (error, "%d:%d: Unexpected EOF in block comment", line_and_col);
                            goto e_failed;
                        }

                        if (b == '*' && state.ptr < (end - 1) && state.ptr [1] == '/')
                        {
                            flags &= ~ flag_block_comment;
                            ++ state.ptr;  /* skip closing sequence */
                        }

                        continue;
                    }
                }
                else if (b == '/')
                {
                    if (! (flags & (flag_seek_value | flag_done)) && top->type != json_object)
                    {  sprintf (error, "%d:%d: Comment not allowed here", line_and_col);
                        goto e_failed;
                    }

                    if (++ state.ptr == end)
                    {  sprintf (error, "%d:%d: EOF unexpected", line_and_col);
                        goto e_failed;
                    }

                    switch (b = *state.ptr)
                    {
                        case '/':
                            flags |= flag_line_comment;
                            continue;

                        case '*':
                            flags |= flag_block_comment;
                            continue;

                        default:
                            sprintf (error, "%d:%d: Unexpected `%c` in comment opening sequence", line_and_col, b);
                            goto e_failed;
                    };
                }
            }

            if (flags & flag_done)
            {
                if (!b)
                    break;

                switch (b)
                {
whitespace:
                    continue;

                    default:

                    sprintf (error, "%d:%d: Trailing garbage: `%c`",
                            state.cur_line, state.cur_col, b);

                    goto e_failed;
                };
            }

            if (flags & flag_seek_value)
            {
                switch (b)
                {
whitespace:
                    continue;

                    case ']':

                    if (top && top->type == json_array)
                        flags = (flags & ~ (flag_need_comma | flag_seek_value)) | flag_next;
                    else
                    {  sprintf (error, "%d:%d: Unexpected ]", line_and_col);
                        goto e_failed;
                    }

                    break;

                    default:

                    if (flags & flag_need_comma)
                    {
                        if (b == ',')
                        {  flags &= ~ flag_need_comma;
                            continue;
                        }
                        else
                        {
                            sprintf (error, "%d:%d: Expected , before %c",
                                    state.cur_line, state.cur_col, b);

                            goto e_failed;
                        }
                    }

                    if (flags & flag_need_colon)
                    {
                        if (b == ':')
                        {  flags &= ~ flag_need_colon;
                            continue;
                        }
                        else
                        { 
                            sprintf (error, "%d:%d: Expected : before %c",
                                    state.cur_line, state.cur_col, b);

                            goto e_failed;
                        }
                    }

                    flags &= ~ flag_seek_value;

                    switch (b)
                    {
                        case '{':

                            if (!new_value (&state, &top, &root, &alloc, json_object))
                                goto e_alloc_failure;

                            continue;

                        case '[':

                            if (!new_value (&state, &top, &root, &alloc, json_array))
                                goto e_alloc_failure;

                            flags |= flag_seek_value;
                            continue;

                        case '"':

                            if (!new_value (&state, &top, &root, &alloc, json_string))
                                goto e_alloc_failure;

                            flags |= flag_string;

                            string = top->u.string.ptr;
                            string_length = 0;

                            continue;

                        case 't':

                            if ((end - state.ptr) < 3 || *(++ state.ptr) != 'r' ||
                                    *(++ state.ptr) != 'u' || *(++ state.ptr) != 'e')
                            {
                                goto e_unknown_value;
                            }

                            if (!new_value (&state, &top, &root, &alloc, json_boolean))
                                goto e_alloc_failure;

                            top->u.boolean = 1;

                            flags |= flag_next;
                            break;

                        case 'f':

                            if ((end - state.ptr) < 4 || *(++ state.ptr) != 'a' ||
                                    *(++ state.ptr) != 'l' || *(++ state.ptr) != 's' ||
                                    *(++ state.ptr) != 'e')
                            {
                                goto e_unknown_value;
                            }

                            if (!new_value (&state, &top, &root, &alloc, json_boolean))
                                goto e_alloc_failure;

                            flags |= flag_next;
                            break;

                        case 'n':

                            if ((end - state.ptr) < 3 || *(++ state.ptr) != 'u' ||
                                    *(++ state.ptr) != 'l' || *(++ state.ptr) != 'l')
                            {
                                goto e_unknown_value;
                            }

                            if (!new_value (&state, &top, &root, &alloc, json_null))
                                goto e_alloc_failure;

                            flags |= flag_next;
                            break;

                        default:

                            if (isdigit (b) || b == '-')
                            {
                                if (!new_value (&state, &top, &root, &alloc, json_integer))
                                    goto e_alloc_failure;

                                if (!state.first_pass)
                                {
                                    while (isdigit (b) || b == '+' || b == '-'
                                            || b == 'e' || b == 'E' || b == '.')
                                    {
                                        if ( (++ state.ptr) == end)
                                        {
                                            b = 0;
                                            break;
                                        }

                                        b = *state.ptr;
                                    }

                                    flags |= flag_next | flag_reproc;
                                    break;
                                }

                                flags &= ~ (flag_num_negative | flag_num_e |
                                        flag_num_e_got_sign | flag_num_e_negative |
                                        flag_num_zero);

                                num_digits = 0;
                                num_fraction = 0;
                                num_e = 0;

                                if (b != '-')
                                {
                                    flags |= flag_reproc;
                                    break;
                                }

                                flags |= flag_num_negative;
                                continue;
                            }
                            else
                            {  sprintf (error, "%d:%d: Unexpected %c when seeking value", line_and_col, b);
                                goto e_failed;
                            }
                    };
                };
            }
            else
            {
                switch (top->type)
                {
                    case json_object:

                        switch (b)
                        {
whitespace:
                            continue;

                            case '"':

                            if (flags & flag_need_comma)
                            {  sprintf (error, "%d:%d: Expected , before \"", line_and_col);
                                goto e_failed;
                            }

                            flags |= flag_string;

                            string = (json_char *) top->_reserved.object_mem;
                            string_length = 0;

                            break;

                            case '}':

                            flags = (flags & ~ flag_need_comma) | flag_next;
                            break;

                            case ',':

                            if (flags & flag_need_comma)
                            {
                                flags &= ~ flag_need_comma;
                                break;
                            }

                            default:
                            sprintf (error, "%d:%d: Unexpected `%c` in object", line_and_col, b);
                            goto e_failed;
                        };

                        break;

                    case json_integer:
                    case json_double:

                        if (isdigit (b))
                        {
                            ++ num_digits;

                            if (top->type == json_integer || flags & flag_num_e)
                            {
                                if (! (flags & flag_num_e))
                                {
                                    if (flags & flag_num_zero)
                                    {  sprintf (error, "%d:%d: Unexpected `0` before `%c`", line_and_col, b);
                                        goto e_failed;
                                    }

                                    if (num_digits == 1 && b == '0')
                                        flags |= flag_num_zero;
                                }
                                else
                                {
                                    flags |= flag_num_e_got_sign;
                                    num_e = (num_e * 10) + (b - '0');
                                    continue;
                                }

                                top->u.integer = (top->u.integer * 10) + (b - '0');
                                continue;
                            }

                            num_fraction = (num_fraction * 10) + (b - '0');
                            continue;
                        }

                        if (b == '+' || b == '-')
                        {
                            if ( (flags & flag_num_e) && !(flags & flag_num_e_got_sign))
                            {
                                flags |= flag_num_e_got_sign;

                                if (b == '-')
                                    flags |= flag_num_e_negative;

                                continue;
                            }
                        }
                        else if (b == '.' && top->type == json_integer)
                        {
                            if (!num_digits)
                            {  sprintf (error, "%d:%d: Expected digit before `.`", line_and_col);
                                goto e_failed;
                            }

                            top->type = json_double;
                            top->u.dbl = (double) top->u.integer;

                            num_digits = 0;
                            continue;
                        }

                        if (! (flags & flag_num_e))
                        {
                            if (top->type == json_double)
                            {
                                if (!num_digits)
                                {  sprintf (error, "%d:%d: Expected digit after `.`", line_and_col);
                                    goto e_failed;
                                }

                                top->u.dbl += ((double) num_fraction) / (pow (10.0, (double) num_digits));
                            }

                            if (b == 'e' || b == 'E')
                            {
                                flags |= flag_num_e;

                                if (top->type == json_integer)
                                {
                                    top->type = json_double;
                                    top->u.dbl = (double) top->u.integer;
                                }

                                num_digits = 0;
                                flags &= ~ flag_num_zero;

                                continue;
                            }
                        }
                        else
                        {
                            if (!num_digits)
                            {  sprintf (error, "%d:%d: Expected digit after `e`", line_and_col);
                                goto e_failed;
                            }

                            top->u.dbl *= pow (10.0, (double)
                                    (flags & flag_num_e_negative ? - num_e : num_e));
                        }

                        if (flags & flag_num_negative)
                        {
                            if (top->type == json_integer)
                                top->u.integer = - top->u.integer;
                            else
                                top->u.dbl = - top->u.dbl;
                        }

                        flags |= flag_next | flag_reproc;
                        break;

                    default:
                        break;
                };
            }

            if (flags & flag_reproc)
            {
                flags &= ~ flag_reproc;
                -- state.ptr;
            }

            if (flags & flag_next)
            {
                flags = (flags & ~ flag_next) | flag_need_comma;

                if (!top->parent)
                {
                    /* root value done */

                    flags |= flag_done;
                    continue;
                }

                if (top->parent->type == json_array)
                    flags |= flag_seek_value;

                if (!state.first_pass)
                {
                    json_value * parent = top->parent;

                    switch (parent->type)
                    {
                        case json_object:

                            parent->u.object.values
                                [parent->u.object.length].value = top;

                            break;

                        case json_array:

                            parent->u.array.values
                                [parent->u.array.length] = top;

                            break;

                        default:
                            break;
                    };
                }

                if ( (++ top->parent->u.array.length) > state.uint_max)
                    goto e_overflow;

                top = top->parent;

                continue;
            }
        }

        alloc = root;
    }

    return root;

e_unknown_value:

    sprintf (error, "%d:%d: Unknown value", line_and_col);
    goto e_failed;

e_alloc_failure:

    strcpy (error, "Memory allocation failure");
    goto e_failed;

e_overflow:

    sprintf (error, "%d:%d: Too long (caught overflow)", line_and_col);
    goto e_failed;

e_failed:

    if (error_buf)
    {
        if (*error)
            strcpy (error_buf, error);
        else
            strcpy (error_buf, "Unknown error");
    }

    if (state.first_pass)
        alloc = root;

    while (alloc)
    {
        top = alloc->_reserved.next_alloc;
        state.settings.mem_free (alloc, state.settings.user_data);
        alloc = top;
    }

    if (!state.first_pass)
        json_value_free_ex (&state.settings, root);

    return 0;
}

json_value * json_parse (const json_char * json, size_t length)
{
    json_settings settings = { 0 };
    return json_parse_ex (&settings, json, length, 0);
}

void json_value_free_ex (json_settings * settings, json_value * value)
{
    json_value * cur_value;

    if (!value)
        return;

    value->parent = 0;

    while (value)
    {
        switch (value->type)
        {
            case json_array:

                if (!value->u.array.length)
                {
                    settings->mem_free (value->u.array.values, settings->user_data);
                    break;
                }

                value = value->u.array.values [-- value->u.array.length];
                continue;

            case json_object:

                if (!value->u.object.length)
                {
                    settings->mem_free (value->u.object.values, settings->user_data);
                    break;
                }

                value = value->u.object.values [-- value->u.object.length].value;
                continue;

            case json_string:

                settings->mem_free (value->u.string.ptr, settings->user_data);
                break;

            default:
                break;
        };

        cur_value = value;
        value = value->parent;
        settings->mem_free (cur_value, settings->user_data);
    }
}

void json_value_free (json_value * value)
{
    json_settings settings = { 0 };
    settings.mem_free = default_free;
    json_value_free_ex (&settings, value);
}

/*****************************************************************************

 * Author: Numerical recepies in C, modified by Ludvig Sundström

 * File Name: linmin.c

 * Description: 
 * GraphPointeriven an n-dimensional point p[1..n] and an n-dimensional
 * direction xi[1..n], moves and resets p to where the function step(p) takes
 * on a minimum along the direction xi from p, and replaces xi by the actual
 * vector displacement that p was moved. Also returns as fret the value of func
 * at the returned location p. This is actually all accomplished by calling the
 * routines mnbrak and brent.  

 * Creation Date: 25-06-2015

 *****************************************************************************/

static double parabolic_extrapolation(
        const double *ax, 
        const double *bx, 
        const double *cx, 
        const double q, 
        const double r
        )
{
    return (*bx) - ((*bx - *cx) * q - (*bx - *ax) *r ) / 
        (2.0 * SIGN(MAX(fabs(q - r), TINY), q - r));
}

static double step(
        double x, GraphPointer graph, 
        void (*e_fun)(GraphPointer)
        )   
{   
    VertexSet_move(graph->vs, x);
    Graph_reset_dynamic_data(graph);

    e_fun(graph);

    return graph->energy;
}

static double isolate_minimum(
        GraphPointer graph, 
        double ax, 
        double bx, 
        double cx, 
        double tol, 
        double *xmin,
        void (*e_fun)(GraphPointer)
        )
{
    int iter;
    double a,b,d,etemp,fu,fv,fw,fx,p,q,r,tol1,tol2,u,v,w,x,xm;
    double e=0.0;

    a=(ax < cx ? ax : cx);
    b=(ax > cx ? ax : cx);
    x = w = v = bx;
    fw = fv = fx = step(x, graph, e_fun);
    for (iter = 0; iter < L_ITMAX; iter++) {
        xm = 0.5 * (a + b);
        tol2 = 2.0 * (tol1 = tol * fabs(x) + ZEPS);
        if (fabs(x-xm) <= (tol2-0.5*(b-a))) {
            *xmin=x;
            return fx;
        }
        if (fabs(e) > tol1) {
            r = (x - w) * (fx - fv);
            q =(x - v) * (fx - fw);
            p = (x - v) * q - (x - w) * r;
            q = 2.0 * (q - r);
            if (q > 0.0) p = -p;
            q = fabs(q);
            etemp = e;
            e = d;
            if (fabs(p) >= fabs(0.5 * q * etemp) || p <= q * (a - x) || p >= q * (b - x))
                d = CGOLD * (e = (x >= xm ? a - x : b - x));
            else {
                d =p / q;
                u = x + d;
                if (u - a < tol2 || b - u < tol2)
                    d = SIGN(tol1, xm - x);
            }
        } else {
            d = CGOLD * (e = (x >= xm ? a - x : b - x));
        }
        u = (fabs(d) >= tol1 ? x + d : x + SIGN(tol1, d));
        fu = step(u, graph, e_fun);
        if (fu <= fx) {
            if (u >= x) a = x; else b = x;
            SHFT(v,w,x,u)
                SHFT(fv,fw,fx,fu)
        } else {
            if (u < x) a = u; else b = u;
            if (fu <= fw || w == x) {
                v = w;
                w = u;
                fv = fw;
                fw = fu;
            } else if (fu <= fv || v == x || v == w) {
                v = u;
                fv = fu;
            }
        }
    }
    Util_runtime_error("Too many iterations in brent");
    *xmin = x;
    return fx;
}

void bracket_minimum(
        GraphPointer gp, 
        double *ax, 
        double *bx, 
        double *cx, 
        double *fa, 
        double *fb, 
        double *fc, 
        void (*e_fun)(GraphPointer)
        )
{

    *fa = step(*ax, gp, e_fun);
    *fb = step(*bx, gp, e_fun);

    if (*fb > *fa) {
        double dum;
        SHFT(dum,*ax,*bx,dum);
        SHFT(dum,*fb,*fa,dum);
    }

    *cx = *bx + GOLD * (*bx - *ax);
    *fc = step(*cx, gp, e_fun);

    while (*fb > *fc) {

        double r, q;
        r = (*bx - *ax) * (*fb - *fc);
        q = (*bx - *cx) * (*fb - *fa);

        double u, ulim;
        u = parabolic_extrapolation(ax, bx, cx, q, r);
        ulim = (*bx)+GLIMIT*(*cx-*bx);

        double fu;
        if ((*bx-u)*(u-*cx) > 0.0) {
            fu=(*step)(u, gp, e_fun);
            if (fu < *fc) {
                *ax=(*bx);
                *bx=u;
                *fa=(*fb);
                *fb=fu;
                return;
            } else if (fu > *fb) {
                *cx=u;
                *fc=fu;
                return;
            }
            u=(*cx)+GOLD*(*cx-*bx);
            fu=(*step)(u, gp, e_fun);
        } else if ((*cx-u)*(u-ulim) > 0.0) {
            fu=(*step)(u, gp, e_fun);
            if (fu < *fc) {
                SHFT(*bx,*cx,u,*cx+GOLD*(*cx-*bx));
                SHFT(*fb,*fc,fu,(*step)(u, gp, e_fun));
            }
        } else if ((u-ulim)*(ulim-*cx) >= 0.0) {
            u=ulim;
            fu=(*step)(u, gp, e_fun);
        } else {
            u = (*cx)+GOLD*(*cx-*bx);
            fu=(*step)(u, gp, e_fun);
        }
        SHFT(*ax,*bx,*cx,u)
            SHFT(*fa,*fb,*fc,fu)
    }
}

void linmin(
        GraphPointer graph, 
        void (*e_fun)(GraphPointer),
        double *o_min
        )   
{   
    VertexSet vs;
    vs = graph->vs;

    VertexSet_store_gradient(vs);

    double ax, xx;
    ax = 0.0; 
    xx = 1.0;   

    double bx, fa, fx, fb;
    bracket_minimum(graph, &ax, &xx, &bx, &fa, &fx, &fb, e_fun);   

    double xmin;
    *o_min = isolate_minimum(graph, ax, xx, bx, TOL, &xmin, e_fun);   

    VertexSet_boost(vs, xmin);
}

/*****************************************************************************

 * File Name: local_minimizer.c

 * Author: Ludvig Sundström

 * Description: 

 * Creation Date: 13-08-2015

 *****************************************************************************/

        /* Private ******************************************************************/

static int close_to_target(double fret, double e, double ftol)
{
    return 2.0 * fabs(fret - e) <= (ftol) * (fabs((fret)) + fabs((e)) + EPS);
}

/* Public ******************************************************************/

void LocalMinimizer_run(
        const GraphPointer graph, 
        void (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        const double ftol
        )
{
    assert(graph && e_fun && g_fun);
    assert(graph->grid && graph->vs.set && graph->bs.set);
    assert(ftol > 0 && ftol < 0.1);

    int nv;
    nv = graph->vs.n;

    g_fun(graph);

    VertexSet_create_sequences(graph->vs, 1, INITIALIZE);

    double e;
    e_fun(graph);
    e = graph->energy;

    assert(e >= 0);

    int i; 
    for (i = 0; i < L_ITMAX; i++) {

        double fret = 0.0;
        linmin(graph, e_fun, &fret);

        if (close_to_target(fret, e, ftol)) break;

        g_fun(graph);
        e_fun(graph);
        e = graph->energy;

        double gg, dgg;
        dgg = gg = 0.0;
        VertexSet_calculate_score(graph->vs, &gg, &dgg); 

        if (fabs(gg) < EPS) {
            break;
        }

        double gam;
        gam = dgg / gg;
        VertexSet_create_sequences(graph->vs, gam, UPDATE);
    }
}

/***************************************************************************** 
 * Author: Ludvig Sundström

 * File Name: minimizer.c

 * Description: Defines the minimizer, the engine capable of creating a
 * graph-object G and minimizing its energy as an attempt of finding a good
 * visual representation of G. 

 * Creation Date: 24-06-2015

 *****************************************************************************/

#ifndef EMSCRIPT
#define EMSCRIPT 0
#endif

static void js_interact(GraphPointer graph)
{
    assert(graph);
    float *varr;
    int *barr, *zarr;
    varr = NULL;
    barr = NULL; zarr = NULL;
    if (EMSCRIPT) {
        varr = VertexSet_to_array(graph->vs);
        barr = Bondset_to_array(graph->bs);
        zarr = Grid_to_array(graph->grid);
        EM_ASM_({
                window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5);
                }, varr, barr, zarr, 
                graph->vs.n * 2, graph->bs.n * 2, graph->grid->nz * 3);
    }
    free(varr); free(barr); free(zarr);
    varr = NULL; barr = NULL; zarr = NULL;
}

float *Minimizer_run(const char *fname) 
{
    assert(fname);
    float *rtn;
    rtn = 0;
    if (access(fname, R_OK) != -1) {

        GraphPointer graph;
        graph = Graph_create(fname);

        LocalMinimizer_run(graph, Energy_calculate, Gradient_calculate, FTOL);
        js_interact(graph);
        GlobalMinimizer_run(graph, Energy_calculate, Gradient_calculate);

        if (EMSCRIPT) {
            js_interact(graph);
        } else {
            rtn = VertexSet_to_array(graph->vs); 
        }
        if (PRINT_STATISTICS) {
            printf("Overlaps: %d\n", graph->ncrosses);
            printf("Angular resolution %f\n", Graph_angular_resolution(graph));
            printf("-----------------------\n");
        }

        Graph_free(graph);
        graph = 0;
    } else {
        assert((sizeof(fname) / sizeof(char)) <= MAX_FILENAME_LENGTH);

        char emsg[128];
        strcpy(emsg, "Minimizer_run: Can't read file: ");
        strcat(emsg, fname);
        Util_runtime_error(emsg);
    }

    return rtn;
}

/*****************************************************************************

 * File Name: Pair.c

 * Author: Ludvig Sundström

 * Description: 

 * Creation Date: 30-07-2015

 *****************************************************************************/

Pair Pair_initialize(void *fst, void *snd) 
{
    Pair rtn;
    rtn.fst = fst;
    rtn.snd = snd;
    return rtn;
}

PairPointer Pair_create(void *fst, void *snd) 
{
    PairPointer rtn = (PairPointer) Util_allocate(1, sizeof(Pair));
    *rtn = Pair_initialize(fst, snd);
    return rtn;
}

/*****************************************************************************

 * File Name: placement.c

 * Author: Ludvig Sundström

 * Description: Assign positions (x, y) to a set of vertices

 * Creation Date: 13-07-2015

 *****************************************************************************/

    /* Private *******************************************************************/

static int comp_by_mass(const void *elem1, const void *elem2) 
{
    VertexPointer *fst = (VertexPointer *) elem1;
    VertexPointer *snd = (VertexPointer *) elem2;
    if ((*fst)->mass > (*snd)->mass) return 1;
    if ((*fst)->mass < (*snd)->mass) return -1;
    return 0;
}

static int comp_by_id(const void *elem1, const void *elem2) 
{
    VertexPointer *fst = (VertexPointer *) elem1;
    VertexPointer *snd = (VertexPointer *) elem2;
    if ((*fst)->id > (*snd)->id) return 1;
    if ((*fst)->id < (*snd)->id) return -1;
    return 0;
}

/* Public ********************************************************************/

void Placement_set_spiral(VertexSet vs)
{
    qsort((void *) vs.set, vs.n, sizeof(void *), comp_by_mass);

    int n;
    n = vs.n;
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }

    int dimx, dimy;
    dimx = (int) sqrt(n);
    dimy = dimx;

    double gapx, gapy;
    gapx = PANEL_X / dimx;
    gapy = PANEL_Y / dimy;

    int x, y;
    x = 0; 
    y = 0;

    int dx, dy;
    dx = 0;
    dy = -1;

    int t;
    t = fmax(dimx, dimy);

    int i;
    for (i = vs.n - 1; i >= 0; i--) {
        if ((-dimx / 2 <= x && x <= dimx / 2) && 
                (-dimy / 2 <= y && y <= dimy / 2))
        {
            double placex, placey;
            placex = (double) x * gapx;
            placey = (double) y * gapy;
            Vertex_set_position(*(vs.set + i), Vector_initialize(placex, placey));
        }
        if ((x == y) || ((x < 0) && (x == -y)) || ((x > 0) && (x == 1 - y))) {
            t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy; 
    }
    qsort((void *) vs.set, vs.n, sizeof(void *), comp_by_id);
}

void Placement_set_random(const VertexSet vs)
{
    srand(time(NULL));
    int i;
    for (i = 0; i < vs.n; i++) {
        double rx, ry;
        rx = ((double) rand()) / RAND_MAX;
        ry = ((double) rand()) / RAND_MAX;
        Vertex_set_position(*(vs.set + i), Vector_initialize(rx, ry));
    }
}

void Placement_set_grid(VertexSet vs) 
{
    int i, n, vdim, rows, cols;
    double gapx, gapy, offsetx, offsety, x, y;
    n = vs.n; 
    while (fabs(sqrt(n) - (int) sqrt(n)) > EPS) {
        n++;
    }
    vdim = sqrt(n);
    gapx = PANEL_X / vdim;
    gapy = PANEL_Y / vdim;
    offsetx = gapx / 2;
    offsety = gapy / 2;
    rows = 0;
    cols = -1;
    for (i = 0; i < vs.n; i++) {
        if (i % vdim == 0) {
            rows++;
            cols = 0; 
        }
        x = cols * gapx + offsetx;
        y = rows * gapy + offsety; 
        Vertex_set_position(*(vs.set + i), Vector_initialize(x, y));
        cols++;
    }
}

static void parse_vertex_data(
        json_value *vertex, 
        int *o_id,
        VectorPointer o_pos,
        char *o_label,
        char *o_type,
        int *o_fixed
        )
{
    json_value *ident;
    int id;
    id = -99;
    ident = vertex->u.object.values[0].value;
    if (ident->type == json_integer) {
        id = ident->u.integer;
    } else {
        Util_runtime_error("Bad JSON data: ident");
    }
    *o_id = id;

    Vector pos, zv;
    zv = Vector_zero();
    json_value *position;
    position = vertex->u.object.values[1].value;
    int fixed = 0;
    if (position->type == json_array) {
        fixed = 1; 
        int length;
        length = position->u.array.length;
        if (length != 2) {
            Util_runtime_error("Bad JSON data, position dimension not 2");
        }
        json_value *j_x = position->u.array.values[0];
        json_value *j_y = position->u.array.values[1];
        double fixed_x, fixed_y;
        fixed_x = fixed_y = 0;
        if (j_x->type == json_double && Util_in_range(0, 1, (double) j_x->u.dbl)) {
            fixed_x = (double) j_x->u.dbl;
        } else {
            Util_runtime_error("Bad JSON data: position: x");
        }
        if (j_y->type == json_integer && Util_in_range(0, 1, (double) j_y->u.dbl)) {
            fixed_x = (double) j_y->u.integer;
        } else if (j_x->type == json_double) {
            fixed_x = (double) j_y->u.dbl;
        } else {
            Util_runtime_error("Bad JSON data: position: y");
        }
        pos = Vector_initialize(fixed_x, fixed_y);
    } 
    else {
        pos = zv;
        if (position->type != json_null) {
            Util_runtime_error("Bad JSON data: position");
        }
    }
    *o_pos = pos;
    *o_fixed = fixed;

    char vertex_label[MAX_LABEL_LENGTH];
    json_value *label;
    label = vertex->u.object.values[2].value;
    if (label->type == json_string) {
        strcpy(vertex_label, label->u.string.ptr);
    } else if (label->type == json_null) {
        vertex_label[0] = 0;
    } else {
        Util_runtime_error("Bad JSON data: label");
    }
    strcpy(o_label, vertex_label);

    char t;
    t = 0;
    json_value *vertex_type;
    vertex_type = vertex->u.object.values[3].value;
    if (vertex_type->type == json_string) {
        t = vertex_type->u.string.ptr[0];
    } else {
        Util_runtime_error("Bad JSON data: type");
    }
    *o_type = t;
}

static void parse_bond_data(
        VertexSet vs,
        json_value *bond, 
        VertexPointer *o_fst,
        VertexPointer *o_snd,
        double *o_len
        )
{
    json_value *first = bond->u.object.values[0].value;
    json_value *second = bond->u.object.values[1].value;
    json_value *length = bond->u.object.values[2].value;

    int fstid, sndid;
    fstid = sndid = 0;
    if (first->type == json_integer && second->type == json_integer) {
        fstid = first->u.integer;
        sndid = second->u.integer;
    } else {
        Util_runtime_error("Bad JSON data");
    }
    *o_fst = VertexSet_get_vertex(vs, fstid);
    *o_snd = VertexSet_get_vertex(vs, sndid);

    double len;
    len = 0;
    if (length->type == json_integer) {
        len = (double) length->u.integer;
    } else if (length->type == json_double) {
        len = (double) length->u.dbl;
    } else {
        Util_runtime_error("Bad JSON data\n");
    }
    *o_len = len;

}

static void populate_vertexset(VertexSet vs, json_value *contents, int *nvp)
{
    int nv = *nvp;
    json_value *vsarr = contents->u.object.values[0].value;

    if (nv < 1) {
        Util_runtime_error("No vertices");
    }

    int i;
    for (i = 0; i < nv; i++) {

        json_value *vertex;  
        vertex = vsarr->u.array.values[i];

        int id, fixed;
        Vector pos;
        char *label;
        char t;
        label = Util_allocate(MAX_LABEL_LENGTH, sizeof(label));
        parse_vertex_data(vertex, &id, &pos, label, &t, &fixed);

        VertexSet_update_vertex(
                vs, 
                i, 
                Vertex_create(id, pos, label, t, fixed)
                );
    }
}

static void populate_bondset(BondSet bs, VertexSet vs, json_value *contents, int nb)
{
    json_value *bsarr = contents->u.object.values[1].value;

    int i;
    for (i = 0; i < nb; i++) {
        json_value *bond_value = bsarr->u.array.values[i];

        double len; 
        VertexPointer fst, snd;
        parse_bond_data(vs, bond_value, &fst, &snd, &len); 
        BondPointer bp;
        bp = Bond_create(fst, snd, len);
        *(bs.set + i) = bp;
    }

}


VertexSetPointer vertexset_from_json(json_value *contents, int *nvp)
{
    json_value *vsarr = contents->u.object.values[0].value;
    *nvp = vsarr->u.array.length;

    int nv;
    nv = *nvp;

    VertexSetPointer rtn;
    rtn = (VertexSetPointer) Util_allocate(1, sizeof(VertexSet));

    *rtn = VertexSet_initialize(nv);
    populate_vertexset(*rtn, contents, nvp);

    return rtn;
}

BondSetPointer bondset_from_json(VertexSet vs, json_value *contents, int *nbp)
{
    json_value *bsarr = contents->u.object.values[1].value;
    *nbp = bsarr->u.array.length;

    int nb;
    nb = *nbp;

    BondSetPointer rtn;
    rtn = (BondSetPointer) Util_allocate(1, sizeof(BondSet));

    *rtn = BondSet_initialize(nb);
    populate_bondset(*rtn, vs, contents, nb);

    return rtn;
}

Pair process_json(const char *filename)
{
    FILE *fp;
    struct stat filestatus;
    int file_size;
    char* file_contents;
    json_char* json;

    if ( stat(filename, &filestatus) != 0) {
        char  buf[256];
        strcpy(buf, "process_json(): File not found: ");
        strcat(buf, filename);
        Util_runtime_error(buf);
    }
    file_size = filestatus.st_size;
    file_contents = (char *) malloc(filestatus.st_size);
    if ( file_contents == NULL) {
        Util_runtime_error("process_json(): Unable to allocate memory");
    }

    fp = fopen(filename, "rt");

    if (fp == NULL) {
        fclose(fp);
        free(file_contents);
        Util_runtime_error("process_json(): Unable to open file");
    }
    if ( fread(file_contents, file_size, 1, fp) != 1 ) {
        fclose(fp);
        free(file_contents);
        Util_runtime_error("process_json(): Unable to read file");
    }

    fclose(fp);

    json = (json_char*)file_contents;

    json_value* value;
    value = NULL;
    value = json_parse(json,file_size);

    if (value == NULL) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): Unable to parse data");
    }
    if (value->u.object.length != 2) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): Wrong number of keys");
    }
    if (strcmp(value->u.object.values[0].name, "vertices") != 0) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): First key is not vertices");
    }
    if (strcmp(value->u.object.values[1].name, "bonds") != 0) {
        free(file_contents);
        json_value_free(value);
        Util_runtime_error("process_json(): Second key is not 'bonds'");
    }

    int nv, nb;
    VertexSetPointer vs; BondSetPointer bs;
    vs = vertexset_from_json(value, &nv);
    bs = bondset_from_json(*vs, value, &nb);

    json_value_free(value);
    free(file_contents);

    return Pair_initialize(vs, bs);
}

/*****************************************************************************
* Author : Ludvig Sundström
* File Name : util.c

 * Purpose : 

 * Creation Date : 26-06-2015

 * Last Modified : 

 *****************************************************************************/

Sign Util_sign(const double x)
{
    return x > 0 ? PLUS : MINUS;
}

double Util_doubles_min(const double *set, const int n)
{
    double min;
    min = set[0];

    int i;
    for (i = 1; i < n; i++) {
        if (set[i] < min) min = set[i];
    }
    return min;
}

double Util_doubles_max(const double *set, const int n)
{
    double max;
    max = set[0];

    int i;
    for (i = 1; i < n; i++) {
        if (set[i] > max) max = set[i];
    }
    return max;
}

void Util_normalize(
        double *set, 
        const int n, 
        const double upper, 
        const double min, 
        const double max 
    )
{
    int i;
    for (i = 0; i < n; i++) {
        assert(Util_in_range(min, max, set[i]));

        set[i] = upper * ((set[i] - min) / (max - min));
    }
}

int Util_is_zero(const double x)
{
    return Util_equal(x, 0.0);
}

int Util_equal(const double tar, const double x) {
    if (tar == 0 && x == 0) return 1;
    return fabs(x - tar) < TINY;
}

int Util_close_to(const double tar, const double x) {
    if (tar == 0 && x == 0) return 1;
    return fabs(x - tar) < EPS;
}

int Util_about(const double tar, const double x) {
    if (Util_equal(tar, x)) return 1;
    double err;
    err = fabs(x * EPS);
    return fabs(x - tar) <= err;
}

int Util_in_range(const double lower, const double upper, const double x)
{
    int lowcond, upcond;
    lowcond = x > lower || Util_equal(x, lower);
    upcond = x < upper || Util_equal(x, upper);
    return lowcond && upcond;
}

int Util_in_range_strict(
        const double lower, 
        const double upper, 
        const double x
    )
{
    int lowcond, upcond;
    lowcond = x > lower;
    upcond = x < upper;
    return lowcond && upcond;
}

void Util_runtime_error(char error_text[])
{
    fprintf(stderr,ANSI_COLOR_RED "Runtime-error: %s\n" ANSI_COLOR_RESET,
            error_text);
    exit(1);
}

void *Util_allocate(int nmemb, int size) {
    void *rtn = malloc(nmemb * size);
    if (rtn == NULL)
    {
        Util_runtime_error("Error when allocating memory");
    }
    return rtn;
}

void *Util_allocate_initialize(int nmemb, int size) {
    void *rtn = calloc(nmemb, size);
    if (rtn == NULL)
    {
        Util_runtime_error("Error when allocating memory");
    }
    return rtn;
}

/*****************************************************************************

* File Name: math2D.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 06-07-2015

*****************************************************************************/

Vector Vector_initialize(const double x, const double y)
{
    Vector rtn;
    rtn.x = x;
    rtn.y = y;
    rtn.len = sqrt(x * x + y * y);
    return rtn;
}

VectorPointer Vector_create(const double x, const double y)
{
    VectorPointer rtn = (VectorPointer) malloc(sizeof(Vector));
    *rtn = Vector_initialize(x, y);
    return rtn;
}

Vector Vector_zero()
{
    return Vector_initialize(0.0, 0.0);
}

Vector Vector_add(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x + vec1.x, vec0.y + vec1.y);
}

Vector Vector_sub(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x - vec1.x, vec0.y - vec1.y);
}

Vector Vector_mult(const Vector vec0, const Vector vec1) 
{
    return Vector_initialize(vec0.x * vec1.x, vec0.y * vec1.y);
}

Vector Vector_negate(const Vector vec) 
{
    return Vector_initialize(-vec.x, -vec.y);
}

Vector Vector_scalar_mult(const Vector vec, const double c)
{
    return Vector_initialize(c * vec.x, c * vec.y);
}

Vector Vector_scalar_add(const Vector vec, const double c)
{
    return Vector_initialize(c + vec.x, c + vec.y);
}

double Vector_dot(const Vector vec0, const Vector vec1)
{   
    return vec0.x * vec1.x + vec0.y * vec1.y;
}

double Vector_norm(const Vector v) 
{
    return sqrt(Vector_dot(v, v));
}

double Vector_angle(const Vector vec0, const Vector vec1)
{

    double scalp;
    scalp = Vector_dot(vec0, vec1);
    
    double lenp;
    lenp = (vec0.len * vec1.len);
    assert(lenp >= 0);

    if (Util_is_zero(lenp)) {
        return 0.0;
    }
    if (scalp != scalp) {
        Util_runtime_error("Vector_angle: Nan scalp");
    }
    if (
            Util_equal(scalp, lenp) || 
            Util_equal(scalp, -lenp) || 
            Util_equal(-scalp, lenp)
        )
    {
        return 0.0;
    }

    double div;
    div = scalp / lenp;
    if (fabs(div - 1.0) < EPS || fabs(div + 1.0) < EPS) 
        return 0.0;
    if (!Util_in_range_strict(-1.0, 1.0, div)) {
        Util_runtime_error("Vector_angle: Outside acos range"); 
    }
    return acos(div);
}

int Vector_parallel(const Vector vec0, const Vector vec1)
{
    return Util_equal(Vector_angle(vec0, vec1), 0);
}

int Vector_equal(const Vector vec0, const Vector vec1)
{
    return Util_equal(vec0.x, vec1.x) && Util_equal(vec0.y, vec1.y);
}

/*****************************************************************************

* File Name: vertex.c

* Author: Ludvpig Sundström

* Description: 

* Creation Date: 28-07-2015

*****************************************************************************/

/* Public  ******************************************************************/

Vertex Vertex_initialize(
       const int id, 
       const Vector pos,
       char *label,
       const char type,
       const int fixed
    )
{
    Vertex rtn;
    rtn.id = id;
    rtn.mass = DEFAULT_MASS;
    rtn.pos = pos;
    rtn.fixed = fixed;
    rtn.energy = 0.0;
    rtn.gradient = Vector_zero();
    rtn.g = Vector_zero(); 
    rtn.h = Vector_zero();
    Vertex_set_position(&rtn, pos);
    rtn.label = label;
    rtn.type = type;
    Vertex_reset_dynamics(&rtn);
    return rtn;
}

VertexPointer Vertex_create(
       const int id, 
       const Vector pos,
       char *label,
       const char type,
       const int fixed
    )
{
    VertexPointer rtn;
    rtn = Util_allocate_initialize(1, sizeof(Vertex));
    *rtn = Vertex_initialize(id, pos, label, type, fixed);

    return rtn;
}


void Vertex_reset_dynamics(const VertexPointer v) 
{
    v->next = NULL;
}

Vertex Vertex_copy(const Vertex v)
{
    Vertex rtn;
    rtn.id = v.id;
    rtn.pos = v.pos;
    rtn.tl = v.tl;
    rtn.br = v.br;
    rtn.type = v.type;
    rtn.pos0 = v.pos0;
    rtn.grad0 = v.grad0;
    rtn.mass = v.mass;
    rtn.next = v.next;
    rtn.energy = v.energy;
    rtn.gradient = v.gradient;
    rtn.g = v.g;
    rtn.h = v.h;

    return rtn;
}

VertexPointer Vertex_copy_pointer(const VertexPointer v)
{
    VertexPointer rtn;
    rtn = Util_allocate(1, sizeof(Vertex));
    *rtn = Vertex_copy(*v);

    return rtn;
}

void Vertex_set_position(const VertexPointer v, const Vector pos)
{
    v->pos.x = pos.x;
    v->pos.y = pos.y;

    v->tl.x = pos.x - VERTEX_BASE_WIDTH - (PADDING / 2.0);
    v->tl.y = pos.y - VERTEX_BASE_HEIGHT - (PADDING / 2.0);

    v->br.x = pos.x + VERTEX_BASE_WIDTH + (PADDING / 2.0);
    v->br.y = pos.y + VERTEX_BASE_HEIGHT + (PADDING / 2.0);
}

void Vertex_move(const VertexPointer v, const Vector ds) 
{
    if (!v->fixed) {
        Vector new_pos;
        new_pos = Vector_add(v->pos0, ds);
        Vertex_set_position(v, new_pos);
    }
}

void Vertex_free(VertexPointer v)
{
    free(v);
}

/*****************************************************************************

* File Name: vertex_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

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

/*****************************************************************************

* File Name: vertex_set.c

* Author: Ludvig Sundström

* Description: Represents a set of vertices

* Creation Date: 31-07-2015

*****************************************************************************/

void VertexSet_update_vertex(const VertexSet vs, const int i, const VertexPointer v)
{
    *(vs.set + i) = v;
}

VertexSet VertexSet_initialize(int nv)
{
    VertexSet rtn;
    rtn.set = (VertexPointer *) Util_allocate(nv, sizeof(VertexPointer));
    rtn.n = nv;

    return rtn;
}

VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i)
{
    return *(vs.set + i);
}

VertexSet VertexSet_copy(const VertexSet vs)
{
    VertexSet rtn;
    rtn = VertexSet_initialize(vs.n);

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer current = VertexSet_get_vertex(vs, i);
        VertexPointer copy = Vertex_copy_pointer(current);
        VertexSet_update_vertex(rtn, i, copy);
    }

    return rtn;
}

VectorPointer VertexSet_positions(const VertexSet vs)
{
    VectorPointer rtn;
    rtn = Util_allocate(vs.n, sizeof(Vector));

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer current;
        current = VertexSet_get_vertex(vs, i);
        *(rtn + i) = current->pos;
    }

    return rtn;
}

void VertexSet_store_gradient(const VertexSet vs)
{
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        v->pos0 = v->pos;
        v->grad0 = v->gradient;
        v->gradient = Vector_zero();
    }
}

void VertexSet_move(const VertexSet vs, const double x)
{
    int i;   
    for (i = 0; i < vs.n; i++) {
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);

        Vector ds;
        ds = Vector_scalar_mult(v->grad0, x);

        Vertex_move(v, ds);
    }
}
    
void VertexSet_boost(const VertexSet vs, const double x)
{
    int i;    
    for (i = 0; i < vs.n; i++) { 
        VertexPointer v;
        v = VertexSet_get_vertex(vs, i);
        Vector_scalar_mult(v->gradient, x);
    }   
}

void VertexSet_create_sequences(
        const VertexSet vs,
        const double gam, 
        const Strategy strat
    )
{
    assert(vs.n > 0 && vs.n <= MAX_NV); 
    assert(strat == INITIALIZE || strat == UPDATE);
    
    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = VertexSet_get_vertex(vs, i);
        v->g = Vector_negate(v->gradient);
        if (strat == INITIALIZE) {
            v->gradient = v->h = v->g;

        } else {
            Vector h_gam, g_h_gam;
            h_gam = Vector_scalar_mult(v->h, gam);
            g_h_gam = Vector_add(v->g, h_gam);

            v->gradient = v->h = g_h_gam;
        }
    }
}

void VertexSet_calculate_score(
        const VertexSet vs,
        double *gg, 
        double *dgg
    )
{
    assert(vs.n > 0 && vs.n <= MAX_NV);
    assert(Util_is_zero(*gg) && Util_is_zero(*dgg));

    int i;
    for (i = 0; i < vs.n; i++) {
        VertexPointer v = VertexSet_get_vertex(vs, i);
        *gg += Vector_dot(v->g, v->g);
        *dgg += Vector_dot(Vector_add(v->gradient, v->g), v->gradient);
    }
}

float *VertexSet_to_array(const VertexSet vs)
{
    float *rtn = (float *) Util_allocate(vs.n * 2, sizeof(double));
    int i;
    for (i = 0; i < vs.n; i++) {
        *(rtn + i * 2) = (float) (VertexSet_get_vertex(vs, i))->pos.x;
        *(rtn + i * 2 + 1) = (float) (VertexSet_get_vertex(vs, i))->pos.y;
    }
    return rtn;

}

void VertexSet_free(VertexSet vs) 
{
    int i;
    for (i = 0; i < vs.n; i++) {
        Vertex_free(VertexSet_get_vertex(vs, i));
    }
    free(vs.set);
}

/*****************************************************************************

* File Name: zone2d.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 24-07-2015

*****************************************************************************/

ZonePointer Zone_create(
        const int id, 
        const int i, 
        const int j, 
        const double minx,
        const double miny, 
        const double width, 
        const double height
    )
{
    ZonePointer rtn = malloc(sizeof(Zone));
    rtn->id = id;
    rtn->i = i;
    rtn->j = j;
    rtn->minx = minx; rtn->miny = miny;
    rtn->width = width; rtn->height = height;
    return rtn;
}


void Zones_free(ZonePointer *zs, int nz) 
{
    int i;
    for (i = 0; i < nz; i++) {
        free(*(zs + i));
    }
    zs = NULL;
}

/*****************************************************************************

* File Name: zone_pair.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 31-07-2015

*****************************************************************************/

ZonePairPointer ZonePair_create(const Pair pr, const ZonePairPointer next)
{
    ZonePairPointer rtn = (ZonePairPointer) malloc(sizeof(ZonePair));
    rtn->fst = (ZonePointer) pr.fst;
    rtn->snd = (ZonePointer) pr.snd;
    rtn->next = next;
    return rtn;
}

void ZonePairs_free(ZonePairPointer z2p)
{
    ZonePairPointer cur = z2p;
    while(cur != 0) {
        ZonePairPointer tmp = cur;
        cur = cur->next;
        free(tmp);
    }
}

