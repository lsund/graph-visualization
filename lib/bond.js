/*****************************************************************************

* Author : Ludvig Sundström

* File Name : bond.js

* Purpose : Describes a obj 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.bond = function (options) {

      var obj = {};    

      obj.first = options.first; 
      obj.second = options.second;
      obj.color =  options.color || 'blue';
      obj.type = options.type || 'r'; 

      obj.length = function () {
        var dx, dy;
        dx = obj.first.position.x - obj.second.position.x;
        dy = obj.first.position.y - obj.second.position.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      
      return obj;

    };
  });

}());
