/*****************************************************************************

* Author : Ludvig Sundström

* File Name : body.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  APP.body = function (options) {
    var dimx = 600;
    var dimy = 600;
    var that = {};
    that.vertices = options.vertices || [];
    that.bonds = options.bonds || [];
    that.dimension = APP.vector2D(dimx, dimy);
    that.center = APP.vector2D(dimx / 2, dimy / 2);

    return that;
  }

});

