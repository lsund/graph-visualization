/*****************************************************************************
* Author : Ludvig Sundström

* File Name : obj.js

* Purpose : Describes a obj 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.vertex = function (options) {

      var obj = window.COMPONENT.graphObject(options);
          
      obj.id  = options.id;

      if (obj.shape === 'circle') {
        obj.mass = obj.dimension / 10;
      } else {
        obj.mass = obj.dimension.x + obj.dimension.y / 40;
      }  

      return obj;

    };

  });

}());
