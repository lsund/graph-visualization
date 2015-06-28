/*****************************************************************************

* Author : Ludvig Sundström

* File Name : obj.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.window.APP.body = function (options) {

      var obj = {};

      var dimx, dimy;

      obj.vertices = [];
      obj.bonds = [];
      obj.restraints = [];

      obj.dimension = options.dimension || window.APP.vector(800, 800);
      obj.center = window.APP.vector2D(dimx / 2, dimy / 2);

      dimx = obj.dimension.x;
      dimy = obj.dimension.y;

      obj.initialize = function (verticeOpts, dmat) {
        verticeOpts.forEach(function (o) {
          obj.vertices.push(window.APP.vertex(o)); 
        });
        obj.dmat = dmat;
        addBonds();
      };

      var addBonds = function () {
        var i, j;
        for (i = 0; i < obj.vertices.length - 1; i += 1) {
          for (j = i + 1; j < obj.vertices.length; j += 1) {
            obj.bonds.push(window.APP.bond(
              { 
                first: obj.vertices[i], 
                second: obj.vertices[j], 
                type: obj.dmat[i][j] === 1 ? 'r' : 'i'
              }
            ));
          }
        }
      };

      obj.randomPosition = function () {
        var i, ps;
        ps = [];
        for (i = 0; i < obj.vertices.length; i += 1) {
          ps.push(Math.random() * dimx);
          ps.push(Math.random() * dimy);
        }
        obj.setVerticePositions(ps);
      };

      obj.gridPosition = function () {
        var i, j, n, vdim, gapx, gapy, offsetx, offsety, ps;
        n = obj.vertices.length;
        while (Math.sqrt(n) !== parseInt(Math.sqrt(n), 10)) {
          n += 1;
        }
        vdim = Math.sqrt(n);
        gapx = dimx / vdim;
        gapy = dimy / vdim;
        offsetx = gapx / 2;
        offsety = gapy / 2;
        ps = [];
        for (i = 0; i < vdim; i += 1) {
          for (j = 0; j < vdim; j += 1) {
            ps.push(j * gapx + offsetx); 
            ps.push(i * gapy + offsetx); 
          }
        }
        obj.setVerticePositions(ps);
      };

      obj.getVerticePositions = function () {
        var i, vec, rtn = [];
        for (i = 0; i < obj.vertices.length; i += 1) {
          vec = obj.vertices[i].position;
          rtn.push(vec.x);
          rtn.push(vec.y);
        } 
        return rtn;
      };
      
      obj.getVerticeMasses = function () {
        var i, rtn = [];
        for (i = 0; i < obj.vertices.length; i += 1) {
          rtn.push(obj.vertices[i].mass);
        }
        return rtn;
      };

      obj.setVerticePositions = function (vec) {
        var i, cpos;
        for (i = 0; i < obj.vertices.length; i += 1) {
          cpos = window.APP.vector2D(vec[i * 2], vec[i * 2 + 1]);
          obj.vertices[i].setPosition(cpos); 
        } 
      };

      return obj;
    };

  });

}());
