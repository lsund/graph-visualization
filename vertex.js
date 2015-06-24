/*****************************************************************************
* Author : Ludvig Sundström

* File Name : vertex.js

* Purpose : Describes a vertex 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  APP.vertex = function (options) {

    var secret = {};
    var that = APP.graphObject(options, secret);
        
    that.id  = options.id;

    if (that.shape === 'circle') {
      that.mass = that.dimension;
    } else {
      that.mass = that.dimension.x + that.dimension.y / 4;
    }  

    that.getPosition = function () { return secret.position };

    that = APP.forceDirected(that, secret);

    APP.theObject.vertices.push(that); 

    return that;

  };


});
