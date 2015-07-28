/*****************************************************************************

* Author: Ludvig Sundström

* File Name: 

* Description: 

* Creation Date: 24-07-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.COMPONENT = window.COMPONENT || {};

    window.COMPONENT.zone2d = function (options) {

      var obj = {};    

      obj.minx = options.minx; 
      obj.miny = options.miny;
      obj.width = options.width;
      obj.height = options.height;

      return obj;

    };
  });
  

}());

