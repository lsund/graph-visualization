/*****************************************************************************

* Author : Ludvig Sundström

* File Name : forceDirected.js

* Purpose : 

* Creation Date : 23-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  APP.forceDirected = function (object, secret) {

    object.setForce = function (vec) {
      secret.force = vec;
    };

    object.addForce = function (vec) {
      secret.force = APP.vector2D(secret.force.x + vec.x, 
        secret.force.y + vec.y);
    };

    object.accelerate = function () {
      secret.acceleration = APP.vector2D(secret.force.x, secret.force.y); 
      secret.acceleration = secret.acceleration.scalar(1 / object.mass);
      secret.velocity = secret.velocity.add(secret.acceleration);
      secret.velocity = secret.velocity.scalar(0.8);
    };

    object.move = function () {
      secret.position = secret.position.add(secret.velocity);
    };

    object.zeroForce = function() {
      secret.force.x = 0;
      secret.force.y = 0;
    };

    object.getVelocity = function () { return secret.velocity };

    object.getKineticEnergy = function () { 
      return 0.5 * object.mass * secret.velocity.cross(secret.velocity).abs();
    };
    object.getPotentialEnergy = function () {
      var dist = secret.position.sub(OBJECT.body.center).abs();
      return object.mass * PHYSICS.GRAVITY * dist;
    }

    return object;

  }

});
