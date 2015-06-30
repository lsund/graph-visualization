/*****************************************************************************

* Author : Ludvig Sundström

* File Name : point.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  window.COMPONENT = window.COMPONENT || {};

  window.COMPONENT.vector2D = function (x, y) {

    var obj = {};
    obj.x = x;
    obj.y = y;
    
    obj.add = function (vec) {
      return window.COMPONENT.vector2D(obj.x + vec.x, obj.y + vec.y);
    };

    obj.sub = function (vec) {
      return window.COMPONENT.vector2D(obj.x - vec.x, obj.y - vec.y);
    };

    obj.negate = function () {
      return window.COMPONENT.vector2D(-obj.x, -obj.y);
    };

    obj.scalar = function (c) {
      return window.COMPONENT.vector2D(obj.x * c, obj.y * c);
    };

    obj.abs = function () {
      return Math.sqrt(obj.x * obj.x + obj.y * obj.y);
    };

    obj.cross = function (vec) {
      return window.COMPONENT.vector2D(obj.x * vec.y,  -obj.y * vec.x);
    };

    obj.normalize = function () {
      var norm = obj.abs();
      return window.COMPONENT.vector2D(obj.x / norm, obj.y / norm);
    };

    obj.perpendicular = function () {
      return window.COMPONENT.vector2D(obj.y, -obj.x);
    };

    obj.isZero = function () {
      return obj.x === 0 && obj.y === 0;
    };

    obj.equal = function (vec) {
      return obj.x === vec.x && obj.y === vec.y;
    };

    return obj;

  };

}());
