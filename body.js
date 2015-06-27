/*****************************************************************************

* Author : Ludvig Sundström

* File Name : body.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  APP.body = function (options) {

    var body = {};

    vertices = [];
    bonds = [];
    restraints = [];

    body.dimension = options.dimension || APP.vector(800, 800);
    body.center = APP.vector2D(dimx / 2, dimy / 2);

    var dimx = body.dimension.x;
    var dimy = body.dimension.y;

    body.initialize = function (verticeOpts, dmat) {
      verticeOpts.forEach(function (o) {
        vertices.push(APP.vertex(o)); 
      });
      body.dmat = dmat;
      addBonds();
    };

    var addBonds = function () {
      var i, j, cv1, cv2;
      for (i = 0; i < vertices.length - 1; i++) {
        for (j = i + 1; j < vertices.length; j++) {
          bonds.push(APP.bond(
            { 
              first: vertices[i], 
              second: vertices[j], 
              type: body.dmat[i][j] === 1 ? 'r' : 'i'
            }
          ));
        }
      }
    };

    body.randomPosition = function () {
      var i, ps;
      ps = [];
      for (i = 0; i < vertices.length; i++) {
        ps.push(Math.random() * dimx)
        ps.push(Math.random() * dimy);
      }
      body.setVerticePositions(ps);
    }

    body.gridPosition = function () {
      var i, j, n, vdim, gap;
      n = vertices.length;
      while (Math.sqrt(n) !== parseInt(Math.sqrt(n), 10)) n++;
      vdim = Math.sqrt(n);
      gapx = dimx / vdim;
      gapy = dimy / vdim;
      offsetx = gapx / 2;
      offsety = gapy / 2;
      ps = [];
      for (i = 0; i < vdim; i++) {
        for (j = 0; j < vdim; j++) {
          ps.push(j * gapx + offsetx); 
          ps.push(i * gapy + offsetx); 
        }
      }
      body.setVerticePositions(ps);
    }

    body.getVerticePositions = function () {
      var i, vec, rtn = [];
      for (i = 0; i < vertices.length; i++) {
        vec = vertices[i].getPosition();
        rtn.push(vec.x);
        rtn.push(vec.y);
      } 
      return rtn;
    };
    
    body.getVerticeMasses = function () {
      var i, rtn = [];
      for (i = 0; i < vertices.length; i++) {
        rtn.push(vertices[i].getMass());
      }
      return rtn;
    }

    body.getVertices   = function () { return vertices; }
    body.getBonds      = function () { return bonds; }
    body.getRestraints = function () { return restraints; }

    body.setVerticePositions = function (vec) {
      var i, cpos, vec;
      for (i = 0; i < vertices.length; i++) {
        cpos = APP.vector2D(vec[i * 2], vec[i * 2 + 1]);
        vertices[i].setPosition(cpos); 
      } 
    };

    return body;
  };

});

