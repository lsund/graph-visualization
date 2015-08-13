/*****************************************************************************

* File Name: pair_gradient.c

* Author: Ludvig Sundström

* Description: 

* Creation Date: 10-08-2015

*****************************************************************************/

#include <math.h>

#include "stdio.h"
#include "util.h"
#include "constants.h"
#include "vector.h"

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

