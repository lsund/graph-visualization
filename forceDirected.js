/*****************************************************************************

* Author : Ludvig Sundström

* File Name : forceDirected.js

* Purpose : 

* Creation Date : 23-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function (){

    window.window.APP = window.window.APP || {};

    window.APP.forceDirected = function (obj) {

      obj.setForce = function (vec) {
        obj.force = vec;
      };

      obj.addForce = function (vec) {
        obj.force = window.APP.vector2D(obj.force.x + vec.x, 
          obj.force.y + vec.y);
      };

      obj.accelerate = function () {
        obj.acceleration = window.APP.vector2D(obj.force.x, obj.force.y); 
        obj.acceleration = obj.acceleration.scalar(1 / obj.mass);
        obj.velocity = obj.velocity.add(obj.acceleration);
        obj.velocity = obj.velocity.scalar(0.8);
      };

      obj.move = function () {
        obj.position = obj.position.add(obj.velocity);
      };

      obj.zeroForce = function() {
        obj.force.x = 0;
        obj.force.y = 0;
      };

      obj.getVelocity = function () { return obj.velocity; };

      obj.getKineticEnergy = function () { 
        return 0.5 * obj.mass * obj.velocity.cross(obj.velocity).abs();
      };
      obj.getPotentialEnergy = function () {
        var dist = obj.position.sub(window.OBJECT.body.center).abs();
        return obj.mass * window.PHYSICS.GRAVITY * dist;
      };

      return obj;

    };

  });

}());
