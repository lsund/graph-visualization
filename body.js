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

      obj.addVertices = function (vec, useCustomSizes) {
        if (useCustomSizes) {
          obj.createChildren(vec, options.dmtsizes);
        } else {
          obj.createChildren(vec, undefined);
        }
      };
      
      // TBI
      //obj.moveVertices = function (vec) {
        //var i;
        //for (i = 0; i < obj.vertices.length; i += 1) {
          //var cv = obj.vertices[i];
          //cv.setPosition(cv.position.add(vec));
        //}
      //};

      return obj;
    };

  });

}());
