/*****************************************************************************

* Author : Ludvig Sundström

* File Name : physicsEngine.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};
  
  // Optimal bond length
  var SPRING_LENGTH = 100;
  // Optimal length between vertexes
  var VERTEX_DISTANCE = 200;
  
  // Gravity constant
  var GRAVITY = 3; 
  //  repulsion constant  
  var REPULSION = 2;
  // Threshold distance for repulsion
  var THETA = VERTEX_DISTANCE * (4 / 3);
  
  GRAVITY *= 0.001;

  /** 
   * The force exerted by a spring between two objects.
   * The result is normalized in respect to the distance between the objects.
   */
  var springForce = function (dist, stiffness) {
    var elongation = SPRING_LENGTH - dist;
    return (stiffness * elongation) / dist; 
  };
  
  /** 
   * The force exerted by the repulsion between two objects at distance dist.
   * Inspired by Columbs law
   */
  var repulsionForce = function (dist, m1, m2) {
    return (REPULSION * m1 * m2) / (dist * dist);
  };
  
  var zeroAllForces = function () {
    for (var i = 0; i < APP.theObject.vertices.length; i++) {
      APP.theObject.vertices[i].zeroForce(); 
    }
  };
  
  /**
   * Calculates the force on a vertex towards the center of the global object
   */
  var calculateGravityForce = function (v) {
    var dimension, globalCenter, dist, f, fx, fy;
    dimension = APP.theObject.dimension;
    globalCenter = APP.vector2D(dimension.x / 2, dimension.y / 2);
    dist = util.distance(v.getPosition(), globalCenter);
    f = GRAVITY * v.dimension;
    fx = dist.x * f;
    fy = dist.y * f; 
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
   * Calculates the repulsion forces over two vertices.
   */
  var calculateRepulsionForce = function (v1, v2, VERTEX_DISTANCE) {
    var f, p1, p2, dist, fx, fy;
    p1 = v1.getPosition();
    p2 = v2.getPosition();
    dist = util.distance(p1, p2);
    f = repulsionForce(dist.abs, v1.dimension, v2.dimension);
    fx = dist.x * f; 
    fy = dist.y * f;
    return APP.vector2D(fx, fy);
  };

  /**
   * This function applies repulsion forces to the vertices.
   * Function is O(V^2), Bottleneck
   */
  var solveRepulsion = function (VERTEX_DISTANCE) {
    var cv1, cv2;
    for (var i = 0; i < APP.theObject.vertices.length - 1; i++) {
      cv1 = APP.theObject.vertices[i]; 
      for (var j = i + 1; j < APP.theObject.vertices.length; j++) {
        cv2 = APP.theObject.vertices[j]; 
        var repulsingForce = calculateRepulsionForce(cv1, 
            cv2, VERTEX_DISTANCE);
        cv2.addForce(repulsingForce);
        repulsingForce.negate();
        cv1.addForce(repulsingForce);
      }
    }
  };

  /**
   * Calculates the spring force between two nodes.
   */
  var calculateSpringForce = function (b) {
    var p1, p2, dx, dy, dist, fx, fy;
    p1 = b.first.getPosition();
    p2 = b.second.getPosition();
    dist = util.distance(p1, p2);
    f = springForce(dist.abs, b.stiffness);
    fx = dist.x * f;
    fy = dist.y * f;
    return APP.vector2D(fx, fy);
  };
  
  /**
   * Applies the spring forces exerted on each vertex by the bonds.
   */
  var solveSpring = function (SPRING_LENGTH) {
    var cb, cv1, cv2;
    for (var i = 0; i < APP.theObject.bonds.length; i++) {
      cb = APP.theObject.bonds[i]; 
      var springForce = calculateSpringForce(cb);
      cb.second.addForce(springForce);
      springForce.negate();
      cb.first.addForce(springForce);
    }
  };

  APP.physicsEngine = {
  
    applyForces: function () {
      zeroAllForces(); 
      solveGravity();
      solveRepulsion(VERTEX_DISTANCE);
      solveSpring(SPRING_LENGTH);
    }
  
  };
  
});
