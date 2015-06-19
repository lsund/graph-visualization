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
        
    var force         = options.force || APP.vector2D(0, 0); 
    var acceleration  = options.acceleration || APP.vector2D(0, 0); 
    var velocity      = options.velocity || APP.vector2D(0, 0); 
    var position      = options.position || APP.vector2D(0, 0);

    var that = {};
    that.id         = options.id || -1;
    that.shape      = options.shape || 'circle';
    that.dimension  = options.dimension || 20;
    that.color      = options.color || 'grey';
    that.bonds      = options.bonds || [];
    that.mass       = that.dimension;

    that.attachBond = function (bond) {
      that.bonds.push(bond);  
    };

    that.setForce = function (vec) {
      force = vec;
    };
    
    that.addForce = function (vec) {
      force = APP.vector2D(force.x + vec.x, force.y + vec.y);
    };

    that.accelerate = function () {
      acceleration = APP.vector2D(force.x, force.y); 
      acceleration = acceleration.scalar(1 / that.mass);
      velocity = velocity.add(acceleration);
      velocity = velocity.scalar(0.8);
    };

    that.setPosition = function (pos) {
      that.position = pos;
    };

    that.moveTo = function (vec) { 
      position = vec;
    };
    
    that.zeroForce = function() {
      force.x = 0;
      force.y = 0;
    };

    that.contains = function (vec) {
      return util.distance(vec, position).abs < that.dimension;
    };

    that.getPosition = function () { return position };
    that.getVelocity = function () { return velocity };
    that.getKineticEnergy = function () { 
      return 0.5 * that.mass * velocity.cross(velocity).abs();
    };

    APP.theObject.vertices.push(that); 
    return that;

  };

});
