/*****************************************************************************

* Author : Ludvig Sundström

* File Name : vertex.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

window.APP = window.APP || {};

APP.vertex = function (options) {
  
  var that = {};
  that.id         = id += 1; 
  that.center     = options.center || APP.point(0, 0);
  that.shape      = options.shape || 'circle';
  that.dimensions = options.dimensions || 1;
  that.color      = options.color || 'grey';
  that.bonds      = options.bonds || [];
  
  that.attachBond = function (bond) {
    that.bonds.push(bond);  
  }

  return that;

}

