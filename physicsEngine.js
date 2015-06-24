/*****************************************************************************

* Author : Ludvig Sundström

* File Name : physicsEngine.js

* Purpose : 

* Creation Date : 18-06-2015 * Last Modified : 
*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.TEST = window.TEST || {};
  window.APP = window.APP || {};
  window.PHYSICS = window.PHYSICS || {};
  
  // Stiffness constant
  PHYSICS.STIFFNESS = 5;
  // Standard bond length
  PHYSICS.SPRING_LENGTH = 100;
  // Gravity constant
  PHYSICS.GRAVITY = 0.05;
  
  /** 
   * The force exerted by a spring between two objects.
   * The result is normalized in respect to the distance between the objects.
   * @param dist the distance between the vertices connected by the bond 
   * @param stiffness the spring stiffness constant
   */
  var springForce = function (dist, stiffness, length) {
    if (dist === 0) {
      dist = 0.01;
    }
    var elongation = dist - length;
    return -stiffness * elongation; 
  };
  
  var gravityForce = function (dist, m) {
    return m * PHYSICS.GRAVITY * dist;
  };

  var zeroAllForces = function () {
    for (var i = 0; i < APP.theObject.vertices.length; i++) {
      APP.theObject.vertices[i].zeroForce(); 
    }
  };
  
  /**
   * Calculates the spring force between two nodes.
   */
  var calculateSpringForce = function (b) {
    var r, f, fx, fy;
    r = b.second.getPosition().sub(b.first.getPosition());
    f = springForce(r.abs(), b.stiffness, b.length);
    fx = r.normalize().x * f;
    fy = r.normalize().y * f;
    return APP.vector2D(fx, fy);
  };

  /**
   * Calculates the force on a vertex towards the center of the global object
   */
  var calculateGravityForce = function (v) {
    var r, f, fx, fy;
    r = APP.theObject.center.sub(v.getPosition());
    if (v.shape === 'circle') {
      f = gravityForce(r.abs(), v.dimension);
    }
    else {
      var dim = v.dimension.x + v.dimension.y / 4 
      f = gravityForce(r.abs(), dim);
    }
    fx = (r.normalize().x * f);
    fy = (r.normalize().y * f); 
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

  APP.physicsEngine = {
  
    applyForces: function () {
      zeroAllForces(); 
      solveSpring();
      solveGravity();
    }

  };

  TEST.springForce = springForce;  

});

