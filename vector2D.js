/*****************************************************************************

* Author : Ludvig Sundström

* File Name : point.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

window.TEST = window.TEST || {};
window.APP = window.APP || {};

APP.vector2D = function (x, y) {

  var that = {};
  that.x = x;
  that.y = y;
  
  that.add = function (vec) {
    return APP.vector2D(that.x + vec.x, that.y + vec.y);
  }

  that.sub = function (vec) {
    return APP.vector2D(that.x - vec.x, that.y - vec.y);
  }

  that.negate = function () {
    return APP.vector2D(-that.x, -that.y);
  }

  that.scalar = function (c) {
    return APP.vector2D(that.x * c, that.y * c);
  }

  that.abs = function () {
    return Math.sqrt(that.x * that.x + that.y * that.y);
  }

  that.cross = function (vec) {
    return APP.vector2D(that.x * vec.y,  -that.y * vec.x);
  }

  that.normalize = function () {
    var norm = that.abs();
    return APP.vector2D(that.x / norm, that.y / norm);
  }

  that.perpendicular = function () {
    return APP.vector2D(that.y, -that.x);
  }

  that.isZero = function () {
    return that.x === 0 && that.y === 0;
  }

  return that;

}

