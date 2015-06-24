/*****************************************************************************

* Author : Ludvig Sundström

* File Name : newton.js

* Purpose : 

* Creation Date : 23-06-2015

* Last Modified : 

*****************************************************************************/

var MAX_ITER = 20;

// Using the Newton-Raphson method, find the root of a function known to lie in
// the interval [x1, x2]. The root rtnewt will be refined until its accuracy is
// known within xacc func is a user-supplied routine that returns both the
// function value and the first derivative of the function at the point x;
var newton = function (f, df, x1, x2, xacc) {
  var fx, dfx, dx, rtn;
  rtn = 0.5 * (x1 + x2) + 0.4;
  for (var i = 0; i < MAX_ITER; i++) {
    fx = f(rtn);  
    dfx = df(rtn);  
    dx = fx / dfx;
    rtn -= dx;
    if ((rtn < x1) || (rtn > x2)) {
      throw 'Error: jumped out of brackets';
    } 
    if (Math.abs(dx) < xacc) {
      return rtn;
    }
  }
  throw 'Maximum number of iterations exceeded';

};

var testf = function (x) {
  return x * x - 1;
} 
var testdf = function (x) {
  return 2 * x;
} 

console.log(newton(testf, testdf, -2, 2, 0.01));

