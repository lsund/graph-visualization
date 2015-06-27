/*****************************************************************************
* Author : Ludvig Sundström

* File Name : vertex.js

* Purpose : Describes a vertex 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.OBJECT = window.OBJECT || {};

  APP.vertex = function (options) {

    var secret = {};
    var that = APP.graphObject(options, secret);
        
    that.id  = options.id;

    if (that.shape === 'circle') {
      secret.mass = that.dimension / 10;
    } else {
      secret.mass = that.dimension.x + that.dimension.y / 40;
    }  

    that.getPosition = function () { return secret.position };
    that.getMass     = function () { return secret.mass };

    that = APP.forceDirected(that, secret);

    return that;

  };


});
