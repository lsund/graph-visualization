/*****************************************************************************

* Author : Ludvig Sundström

* File Name : forces.js

* Purpose : 

* Creation Date : 20-06-2015

* Last Modified : 

*****************************************************************************/

/**
 * Calculates the force on a vertex towards the center of the global object
 */
var calculateGravityForce = function (v) {
  var globalCenter, dist, f, fx, fy;
  dist = util.distance(v.getPosition(), APP.theObject.center);
  f = gravityForce(dist.abs, v.dimension);
  //APP.TOTALENERGY += gravityEnergy(dist.abs, v.dimension); 
  fx = (dist.ui * f);
  fy = (dist.uj * f); 
  return APP.vector2D(fx, fy);
};

/**
 * Calculates the repulsion forces over two vertices.
 */
var calculateRepulsionForce = function (v1, v2) {
  var f, p1, p2, dist, fx, fy;
  p1 = v1.getPosition();
  p2 = v2.getPosition();
  dist = util.distance(p1, p2);
  f = repulsionForce(dist.abs, v1.dimension, v2.dimension);
  APP.TOTALENERGY += repulsionEnergy(dist.abs, v1.dimension, v2.dimension);
  fx = dist.ui * f; 
  fy = dist.uj * f;
  return APP.vector2D(fx, fy);
};

/** 
 * Applies the gravity force to the vertices
 */
var solveGravity = function () {
  for (var i = 0; i < APP.theObject.vertices.length; i++) {
    var cv = APP.theObject.vertices[i]; 
    var gravityForce = calculateGravityForce(cv);
    cv.addForce(gravityForce);
  }
}

/**
 * This function applies repulsion forces to the vertices.
 * Function is O(V^2), Bottleneck
 */
var solveRepulsion = function () {
  var cv1, cv2;
  for (var i = 0; i < APP.theObject.vertices.length - 1; i++) {
    cv1 = APP.theObject.vertices[i]; 
    for (var j = i + 1; j < APP.theObject.vertices.length; j++) {
      cv2 = APP.theObject.vertices[j]; 
      var repulsionForce = calculateRepulsionForce(cv1, cv2);
      cv2.addForce(repulsionForce);
      cv1.addForce(repulsionForce.negate());
    }
  }
};

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

/** 
 * The force exerted by the repulsion between two objects at distance dist.
 * Newtons law of gravity inverted
 */
var repulsionForce = function (dist, m1, m2) {
  if (dist > PHYSICS.OPTIMAL_DISTANCE) {
    return 0;
  }
  if (dist === 0) {
    dist = 0.01;
  }
  return (PHYSICS.REPULSION * m1 * m2) / (dist * dist);
};

var gravityForce = function (dist, m) {
  return m * PHYSICS.GRAVITY * dist;
};
   
