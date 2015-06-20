/*****************************************************************************

* Author : Ludvig Sundström

* File Name : bond.js

* Purpose : Describes a bond 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};
  window.PHYSICS = window.PHYSICS || {};

  APP.bond = function (options) {

    var that = {};    
    that.first = options.first; 
    that.second = options.second;
    that.color = 'grey' || options.color;
    that.stiffness = options.stiffness || PHYSICS.STIFFNESS;
    that.length = options.length || PHYSICS.SPRING_LENGTH;
    that.type = options.type || 'r';
    
    that.first.attachBond(that); 
    that.second.attachBond(that); 

    APP.theObject.bonds.push(that); 
    return that;

  }

});
