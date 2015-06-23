/*****************************************************************************

* Author : Ludvig Sundström

* File Name : graphObject.js

* Purpose : 

* Creation Date : 22-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  APP.graphObject = function (options, secret) {

    secret = secret || {};
    
    var that = {};

    secret.force       = options.force || APP.vector2D(0, 0); 
    secret.acceleration  = secret.acceleration || APP.vector2D(0, 0); 
    secret.velocity      = options.velocity || APP.vector2D(0, 0); 
    secret.position      = options.position || APP.vector2D(0, 0);

    that.shape         = options.shape || 'circle';
    that.dimension     = options.dimension || 20;
    that.bonds         = options.bonds || [];
    that.fixed         = options.fixed || false;
    that.color         = options.color || 'grey';

    if (that.fixed) that.color = 'black';

    that.attachBond = function (bond) {
      that.bonds.push(bond);  
    };

    that.setPosition = function (vec) {
      secret.position = vec;
    }
    
    that.contains = function (vec) {
      if (that.shape === 'circle') {
        return util.distance(vec, secret.position).abs < that.dimension;
      }
      else {
        var dx = secret.position.x + that.dimension.x - vec.x;
        var dy = secret.position.y + that.dimension.y - vec.y; 
        return dx > 0 && dy > 0;
      }
    };

    that.getCenter = function () {
      if (that.shape === 'circle') {
        return secret.position;
      } else {
        var vec = APP.vector2D(that.dimension.x / 2, that.dimension.y / 2);
        return secret.position.add(vec);
      }
    }

    return that;
    
  };

});

