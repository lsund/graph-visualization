/*****************************************************************************

* Author : Ludvig Sundström

* File Name : obj.js

* Description: The 'Grand parent' vertex

* Creation Date : 18-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.body = function (options) {

      var obj = window.COMPONENT.vertex(options);

      var dimx, dimy;

      obj.dimension = options.dimension || window.COMPONENT.vector(800, 800);
      obj.center = window.COMPONENT.vector2D(dimx / 2, dimy / 2);

      dimx = obj.dimension.x;
      dimy = obj.dimension.y;

      obj.initialize = function () {
        obj.children = [];
      };

      obj.addVertices = function (vec, useCustomSizes) {
        obj.createChildren(vec, useCustomSizes);
      };
      
      obj.moveVertices = function (vec) {
        for (var i = 0; i < obj.children.length; i += 1) {
          var cv = obj.children[i];
          cv.setPosition(cv.position.add(vec));
        }
      };

      obj.expand = function(factor) {
        for (var i = 0; i < obj.children.length; i += 1) {
          var v = obj.children[i];
          var centerx = window.GLOBALS.PANEL_X / 2;
          var centery = window.GLOBALS.PANEL_Y / 2;
          var center = window.COMPONENT.vector2D(centerx, centery);
          v.setPosition(v.position.sub(center.scalar(factor)));
          v.setPosition(v.position.scalar(1 + factor));
        }
      };

      obj.contract = function(factor) {
        for (var i = 0; i < obj.children.length; i += 1) {
          var v = obj.children[i];
          var centerx = window.GLOBALS.PANEL_X / 2;
          var centery = window.GLOBALS.PANEL_Y / 2;
          var center = window.COMPONENT.vector2D(centerx, centery);
          v.setPosition(v.position.add(center.scalar(factor)));
          v.setPosition(v.position.scalar(1 / (1 + factor)));
        }
      };

      return obj;
    };

  });

}());
