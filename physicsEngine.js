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

  APP.TOTALENERGY = 0;
  
  // Stiffness constant
  PHYSICS.STIFFNESS = 2;
  // Optimal bond length
  PHYSICS.SPRING_LENGTH = 100;
  // Gravity constant
  PHYSICS.GRAVITY = 10;
  //  repulsion constant  
  PHYSICS.REPULSION = 1000;
  PHYSICS.OPTIMAL_DISTANCE = 300;
  
  PHYSICS.GRAVITY *= 0.001;
  PHYSICS.STIFFNESS *= 1; 

  var springEnergy = function (dist, stiffness, length) {
    var es = 0;
    if (dist === 0) {
      dist = 0.01;
    }
    var elongation = length - dist;
    es = 0.5 * (stiffness * (elongation * elongation)); 
    return es;
  }
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
    var elongation = length - dist;
    return (stiffness * elongation); 
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
    var p1, p2, dx, dy, dist, fx, fy;
    p1 = b.first.getPosition();
    p2 = b.second.getPosition();
    dist = util.distance(p1, p2);
    f = springForce(dist.abs, b.stiffness, b.length);
    APP.TOTALENERGY += springEnergy(dist.abs, b.stiffness, b.length);
    fx = dist.ui * f;
    fy = dist.uj * f;
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
      solveSpring();
    }

  };

  TEST.springForce = springForce;  

});
