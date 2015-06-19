/*****************************************************************************

* Author : Ludvig Sundström

* File Name : physicsEngine.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.TEST = window.TEST || {};
  window.APP = window.APP || {};
  window.PHYSICS = window.PHYSICS || {};
  
  // Stiffness constant
  PHYSICS.STIFFNESS = 5;
  // Optimal bond length
  PHYSICS.SPRING_LENGTH = 100;
  // Gravity constant
  PHYSICS.GRAVITY = 10; 
  //  repulsion constant  
  PHYSICS.REPULSION = 10;
  
  PHYSICS.GRAVITY *= 0.001;
  PHYSICS.STIFFNESS *= 0.1; 

  /** 
   * The force exerted by a spring between two objects.
   * The result is normalized in respect to the distance between the objects.
   * @param dist the distance between the vertices connected by the bond 
   * @param stiffness the spring stiffness constant
   */
  var springForce = function (dist, stiffness) {
    if (dist === 0) {
      dist = 0.01;
    }
    var elongation = PHYSICS.SPRING_LENGTH - dist;
    return (stiffness * elongation) / dist; 
  };
  
  /** 
   * The force exerted by the repulsion between two objects at distance dist.
   * Inspired by Columbs law
   */
  var repulsionForce = function (dist, m1, m2) {
    if (dist === 0) {
      dist = 0.01;
    }
    return (PHYSICS.REPULSION * m1 * m2) / (dist * dist);
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
    f = PHYSICS.GRAVITY * v.dimension;
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
  var calculateRepulsionForce = function (v1, v2) {
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
  var solveSpring = function () {
    var cb, cv1, cv2;
    for (var i = 0; i < APP.theObject.bonds.length; i++) {
      cb = APP.theObject.bonds[i]; 
      var springForce = calculateSpringForce(cb);
      cb.second.addForce(springForce);
      cb.first.addForce(springForce.negate());
    }
  };

  APP.physicsEngine = {
  
    applyForces: function () {
      zeroAllForces(); 
      solveGravity();
      solveRepulsion();
      solveSpring();
    }

  };

  TEST.springForce = springForce;  
  TEST.repulsionForce = repulsionForce;  

});
