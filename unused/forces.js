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

  PHYSICS.REPULSION = 1000;
  PHYSICS.OPTIMAL_DISTANCE = 300;
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

  var checkBonds = function () {
    var cb1, cb2, p1, p2, q1, q2;
    for (var i = 0; i < APP.theObject.bonds.length - 1; i++) {
      cb1 = APP.theObject.bonds[i]; 
      var count = 0;
      for (var j = i + 1; j < APP.theObject.bonds.length; j++) {
        cb2 = APP.theObject.bonds[j]; 
        p1 = cb1.first.getPosition();
        p2 = cb1.second.getPosition();
        q1 = cb2.first.getPosition();
        q2 = cb2.second.getPosition();
        var intersection = APP.intersectionPoint(p1, p2, q1, q2);
        if (intersection !== null) {
          console.log(cb1.first.id);
          console.log(cb1.second.id);
          console.log(cb2.first.id);
          console.log(cb2.second.id);
          var v1, v2;
          if (intersection.t < 0.5) {
            // Intersection of first line is closer to first vertex
            v1 = cb1.first;
          } else {
            // Intersection of first line is closer to second vertex
            v1 = cb1.second;
          }

          if (intersection.u < 0.5) {
            // Intersection of second line is closer to first vertex
            v2 = cb2.first;
          } else {
            // Intersection of second line is closer to second vertex
            v2 = cb2.second;
          }

          var p = p2.sub(p1).normalize();
          var q = q2.sub(q1).normalize();
          
          var f1 = p.scalar(PHYSICS.EDGEFORCE); 
          var f2 = q.scalar(PHYSICS.EDGEFORCE); 
          v1.addForce(f1);
          v2.addForce(f2);
        }
        else {
          cb2.first.color = 'grey';
          cb2.second.color = 'grey';
        }
      }
    }
  }

  PHYSICS.EDGEFORCE = 300;
  var checkBonds = function () {
    var cb1, cb2, p1, p2, q1, q2;
    for (var i = 0; i < APP.theObject.bonds.length - 1; i++) {
      cb1 = APP.theObject.bonds[i]; 
      var count = 0;
      for (var j = i + 1; j < APP.theObject.bonds.length; j++) {
        cb2 = APP.theObject.bonds[j]; 
        p1 = cb1.first.getPosition();
        p2 = cb1.second.getPosition();
        q1 = cb2.first.getPosition();
        q2 = cb2.second.getPosition();
        var intersection = APP.intersectionPoint(p1, p2, q1, q2);
        if (intersection !== null) {
          console.log(cb1.first.id);
          console.log(cb1.second.id);
          console.log(cb2.first.id);
          console.log(cb2.second.id);
          var v1, v2;
          if (intersection.t < 0.5) {
            // Intersection of first line is closer to first vertex
            v1 = cb1.first;
          } else {
            // Intersection of first line is closer to second vertex
            v1 = cb1.second;
          }

          if (intersection.u < 0.5) {
            // Intersection of second line is closer to first vertex
            v2 = cb2.first;
          } else {
            // Intersection of second line is closer to second vertex
            v2 = cb2.second;
          }

          var p = p2.sub(p1).normalize();
          var q = q2.sub(q1).normalize();
          
          var f1 = p.scalar(PHYSICS.EDGEFORCE); 
          var f2 = q.scalar(PHYSICS.EDGEFORCE); 
          v1.addForce(f1);
          v2.addForce(f2);
        }
        else {
          cb2.first.color = 'grey';
          cb2.second.color = 'grey';
        }
      }
    }
  }

