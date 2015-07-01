/*****************************************************************************

* Author : Ludvig Sundström

* File Name : obj.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.body = function (options) {

      var obj = {};

      var dimx, dimy;
      obj.vertices = [];
      obj.bonds = [];
      obj.restraints = [];

      obj.dimension = options.dimension || window.COMPONENT.vector(800, 800);
      obj.center = window.COMPONENT.vector2D(dimx / 2, dimy / 2);

      dimx = obj.dimension.x;
      dimy = obj.dimension.y;

      obj.initialize = function (vec) {
        obj.vertices = [];
        obj.bonds = [];
        obj.restraints = [];
        var i, id;
        id = 0;
        for (i = 0; i < vec.length; i += 2) {
          obj.vertices.push(window.COMPONENT.vertex(
            {
              id: id += 1,
              position: window.COMPONENT.vector2D(vec[i], vec[i + 1]), 
              shape: 'circle', 
              dimension: 3,
              color: '#660033'
            }
          )); 
        }
        addBonds();
      };

      var addBonds = function () {
        var i, j;
        for (i = 0; i < obj.vertices.length - 1; i += 1) {
          for (j = i + 1; j < obj.vertices.length; j += 1) {
            obj.bonds.push(window.COMPONENT.bond(
              { 
                first: obj.vertices[i], 
                second: obj.vertices[j], 
              }
            ));
          }
        }
      };

      obj.moveVertices = function (vec) {
        var i;
        for (i = 0; i < obj.vertices.length; i += 1) {
          var cv = obj.vertices[i];
          cv.setPosition(cv.position.add(vec));
        }
      };

      return obj;
    };

  });

}());
