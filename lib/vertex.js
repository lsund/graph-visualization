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
      
      var maxSize = 99;

      var obj = window.COMPONENT.graphObject(options);

      obj.children = options.children || [];
      obj.bonds = options.bonds || [];

      obj.dmtsizes = options.dmtsizes;

      obj.lookupPosition = function (k) {
        var i, vs;
        vs = obj.children;
        for (i = 0; i < vs.length; i += 1) {
          if (vs[i].id === k) {
            return vs[i].position;
          }
        }
      };

      var lookupSize = function (k, tpls) {
        var i;
        for (i = 0; i < tpls.length; i += 1) {
          if (tpls[i].n === k) {
            return tpls[i].v;
          }
        }
      };

      obj.createChildren = function (vec, sizes) {
        var sumpos, i, id, csize, color;
        id = 1;
        sumpos = window.COMPONENT.vector2D(0, 0);
        for (i = 0; i < vec.length; i += 2) {
          if (sizes) {
            csize = lookupSize(id, obj.dmtsizes);
            if (csize > 30) {
              csize = 30;
              color = '#006090';
            } else {
              var cc = csize < 10 ? 10 : csize;
              color = '#00' + cc * 2 + '' + cc * 3;
            }
          } else {
            csize = 3;
            color = '#003366';
          }
          sumpos.add(window.COMPONENT.vector2D(vec[i], vec[i + 1])); 
          if (csize < maxSize) {
            obj.children.push(window.COMPONENT.vertex(
              {
                id: id,
                position: window.COMPONENT.vector2D(vec[i], vec[i + 1]), 
                shape: 'circle', 
                dimension: csize,
                color: color
              }
            )); 
          }
          id += 1;
        }
        obj.position = sumpos.scalar(1 / obj.children.length);
        addBonds();
      };

      var addBonds = function () {
        var i, j;
        for (i = 0; i < obj.children.length - 1; i += 1) {
          for (j = i + 1; j < obj.children.length; j += 1) {
            obj.bonds.push(window.COMPONENT.bond(
              { 
                first: obj.children[i], 
                second: obj.children[j], 
              }
            ));
          }
        }
      };

      obj.id  = options.id;

      return obj;

    };

  });

}());
