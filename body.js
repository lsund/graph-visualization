/*****************************************************************************

* Author : Ludvig Sundström

* File Name : body.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  APP.body = function (options) {

    var that = {};
    that.vertices = options.vertices || [];
    that.bonds = options.bonds || [];
    that.dimension = APP.vector2D(600, 600);

    return that;
  }

});

