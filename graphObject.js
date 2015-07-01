/*****************************************************************************

* Author : Ludvig Sundström

* File Name : graphObject.js

* Purpose : 

* Creation Date : 22-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.graphObject = function (options) {

      var obj = {};

      obj.force       = options.force || window.COMPONENT.vector2D(0, 0); 
      obj.acceleration  = options.acceleration || 
        window.COMPONENT.vector2D(0, 0); 
      obj.velocity      = options.velocity || window.COMPONENT.vector2D(0, 0); 
      obj.position      = options.position || window.COMPONENT.vector2D(0, 0);

      obj.shape         = options.shape || 'circle';
      obj.dimension     = options.dimension || 20;
      obj.bonds         = options.bonds || [];
      obj.fixed         = options.fixed || false;
      obj.color         = options.color || 'green';

      if (obj.fixed) { 
        obj.color = 'black';
      }

      obj.attachBond = function (bond) {
        obj.bonds.push(bond);  
      };

      obj.setPosition = function (vec) {
        obj.position = vec;
      };
      
      obj.contains = function (vec) {
        if (obj.shape === 'circle') {
          return obj.position.sub(vec).abs() < obj.dimension;
        }
        else {
          var dx = obj.position.x + obj.dimension.x - vec.x;
          var dy = obj.position.y + obj.dimension.y - vec.y; 
          return dx > 0 && dy > 0;
        }
      };

      obj.getCenter = function () {
        if (obj.shape === 'circle') {
          return obj.position;
        } else {
          var vec = window.COMPONENT.vector2D(
            obj.dimension.x / 2, obj.dimension.y / 2
          );
          return obj.position.add(vec);
        }
      };

      return obj;
      
    };
  });

}());
