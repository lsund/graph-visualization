/*****************************************************************************
* Author : Ludvig Sundström

* File Name : vertex.js

* Purpose : Describes a vertex 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  APP.vertex = function (options) {

    var secret = {};
    var that = APP.graphObject(options, secret);
        
    that.id  = options.id;

    if (that.shape === 'circle') {
      that.mass = that.dimension;
    } else {
      that.mass = that.dimension.x + that.dimension.y / 4;
    }  

    that.setForce = function (vec) {
      secret.force = vec;
    };

    that.addForce = function (vec) {
      secret.force = APP.vector2D(secret.force.x + vec.x, 
        secret.force.y + vec.y);
    };

    that.accelerate = function () {
      secret.acceleration = APP.vector2D(secret.force.x, secret.force.y); 
      secret.acceleration = secret.acceleration.scalar(1 / that.mass);
      secret.velocity = secret.velocity.add(secret.acceleration);
      secret.velocity = secret.velocity.scalar(0.8);
    };

    that.move = function () {
      secret.position = secret.position.add(secret.velocity);
    };

    that.zeroForce = function() {
      secret.force.x = 0;
      secret.force.y = 0;
    };

    that.getVelocity = function () { return secret.velocity };

    that.getKineticEnergy = function () { 
      return 0.5 * that.mass * secret.velocity.cross(secret.velocity).abs();
    };
    that.getPotentialEnergy = function () {
      var dcenter = util.distance(APP.theObject.center, secret.position);
      return that.mass * PHYSICS.GRAVITY * dcenter.abs;
    }

    that.getPosition = function () { return secret.position };
    
    APP.theObject.vertices.push(that); 

    return that;

  };


});
