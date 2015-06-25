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

    vertices = [];
    bonds = [];
    restraints = [];

    that.initialize = function (verticeOpts, dmat) {
      verticeOpts.forEach(function (o) {
        vertices.push(APP.vertex(o)); 
      });
      that.dmat = dmat;
      addBonds();
    };

    var addBonds = function () {
      var cv1, cv2;
      for (var i = 0; i < vertices.length - 1; i++) {
        for (var j = i + 1; j < vertices.length; j++) {
          bonds.push(APP.bond(
            { 
              first: vertices[i], 
              second: vertices[j], 
            }
          ));
        }
      }
    };

    that.dimension = APP.vector2D(dimx, dimy);
    that.center = APP.vector2D(dimx / 2, dimy / 2);

    that.verticePositions = function () {
      var i, vec, rtn = [];
      for (i = 0; i < vertices.length; i++) {
        vec = vertices[i].getPosition();
        rtn.push(vec.x);
        rtn.push(vec.y);
      } 
      return rtn;
    };
    
    that.setVerticePositions = function (vec) {
      var i, vec;
      for (i = 0; i < vertices.length; i++) {
        var cpos = APP.vector2D(vec[i * 2], vec[i * 2 + 1]);
        vertices[i].setPosition(cpos); 
      } 
    };

    that.getVertices   = function () { return vertices; }
    that.getBonds      = function () { return bonds; }
    that.getRestraints = function () { return restraints; }

    return that;
  };

});

