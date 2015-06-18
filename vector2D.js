/*****************************************************************************

* Author : Ludvig Sundström

* File Name : point.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

window.APP = window.APP || {};

APP.vector2D = function (x, y) {

  var that = {};
  that.x = x;
  that.y = y;

  that.negate = function () {
    that.x = -that.x;  
    that.y = -that.y;  
  }

  that.scalar = function (c) {
    that.x = that.x * c;
    that.y = that.y * c;
  }

  return that;

}



