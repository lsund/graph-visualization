/*****************************************************************************

* Author : Ludvig Sundström

* File Name : energy.js

* Purpose : 

* Creation Date : 22-06-2015

* Last Modified : 

*****************************************************************************/

  var springEnergy = function (dist, stiffness, length) {
    var es = 0;
    if (dist === 0) {
      dist = 0.01;
    }
    var elongation = length - dist;
    es = 0.5 * (stiffness * (elongation * elongation)); 
    return es;
  }

  var repulsionEnergy = function (dist, m1, m2) {
    var er = 0;
    if (dist > PHYSICS.OPTIMAL_DISTANCE) {
      return er;
    }
    if (dist === 0) {
      dist = 0.01;
    }
    er = 2 * (PHYSICS.REPULSION * m1 * m2) / (dist);
    return er;
  };

  var gravityEnergy = function (dist, m) {
    var eg = 0.5 * m * PHYSICS.GRAVITY * (dist * dist);
    return eg;
  };

