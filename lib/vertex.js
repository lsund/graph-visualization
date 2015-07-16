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
      
      var obj = window.COMPONENT.graphObject(options);

      obj.id = options.id;

      obj.lookupPosition = function (k) {
        var i, vs;
        vs = obj.children;
        for (i = 0; i < vs.length; i += 1) {
          if (vs[i].id === k) {
            return vs[i].position;
          }
        }
      };

      obj.createChildren = function (vec) {
        obj.children = [];
        var i, id, csize, color;
        id = 0;
        for (i = 0; i < vec.length; i += 2) {
          csize = 3;
          color = '#003366';
          obj.children.push(window.COMPONENT.vertex(
            {
              id: id,
              position: window.COMPONENT.vector2D(vec[i], vec[i + 1]), 
              shape: 'circle', 
              dimension: csize,
              color: color
            }
          )); 
          id += 1;
        }
      };

      obj.addBonds = function (barr) {
        obj.bonds = [];
        var i, first, second;
        for (i = 0; i < barr.length; i += 2) {
          first = getChildById(barr[i]);
          second = getChildById(barr[i + 1]);
          obj.bonds.push(window.COMPONENT.bond(
            { 
              first: first, 
              second: second, 
            }
          ));
        }
      };

      var getChildById = function (index) {
        var i;
        for (i = 0; i < obj.children.length; i += 1) {
          if (obj.children[i].id === index) {
            return obj.children[i];
          }
        }
        return null;
      };
      

      return obj;

    };

  });

}());