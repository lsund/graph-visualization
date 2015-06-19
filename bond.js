/*****************************************************************************

* Author : Ludvig Sundström

* File Name : bond.js

* Purpose : Describes a bond 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

window.APP = window.APP || {};

// Stiffness constant
var STIFFNESS = 2;
STIFFNESS *= 0.1; 

APP.bond = function (options) {

  var that = {};    
  that.first = options.first; 
  that.second = options.second;
  that.color = 'grey' || options.color;
  that.stiffness = STIFFNESS;
  
  that.first.attachBond(that); 
  that.second.attachBond(that); 

  APP.theObject.bonds.push(that); 
  return that;

}

