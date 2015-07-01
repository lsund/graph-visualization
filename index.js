/*****************************************************************************

* Author: Ludvig Sundström

* File Name: index.js

* Description: 

* Creation Date: 29-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var canvas;

    window.COMPONENT = window.COMPONENT || {};
    window.EXPORTS = window.EXPORTS || {};
    window.OBJECT = window.OBJECT || {};
    window.DATA = window.DATA || {};
    window.GLOBALS = window.GLOBALS || {};

    window.GLOBALS.SPRING_LENGTH = 300;
    window.GLOBALS.GRAVITY = 0.01;

    var initialize = function () {

      canvas = document.getElementById('canvas');

      var panelx = canvas.width;
      var panely = canvas.height;

      window.OBJECT.head = window.COMPONENT.head({});
      window.OBJECT.body = window.COMPONENT.body(
        { dimension: window.COMPONENT.vector2D(panelx, panely) }
      );

      var variableParagraph = document.getElementById('variables');

      variableParagraph.innerHTML += ' Max distance (px): ' + 
        window.GLOBALS.SPRING_LENGTH;

      window.EXPORTS.draw();

    };
    
    var statusParagraph = document.getElementById('status');


    var minimize = function (fopts, callback) {

      var clusterParagraph = document.getElementById('cluster');
      clusterParagraph.innerHTML = 'N: ' + fopts.nv;

      var cMinimize, arr32, nbytes, dptr, dh, result;

      cMinimize = Module.cwrap(
        'minimize', 'number', 
        ['string', 'number', 'number', 'number', 'number', 'number', 'number']
      );

      arr32= new Float32Array(fopts.nv * 2);
      nbytes= arr32.length * arr32.BYTES_PER_ELEMENT;
      dptr= Module._malloc(nbytes);
      dh= new Uint8Array(Module.HEAPU8.buffer, dptr, nbytes);
      dh.set(new Uint8Array(arr32.buffer));

      cMinimize(
        fopts.name,
        dh.byteOffset, 
        arr32.length,
        window.GLOBALS.SPRING_LENGTH,
        window.OBJECT.body.dimension.x,
        window.OBJECT.body.dimension.y
      );

      result = new Float32Array(
        dh.buffer, 
        dh.byteOffset, 
        arr32.length
      );

      window.OBJECT.body.initialize(result);
      window.EXPORTS.draw();
      Module._free(dh.byteOffset);

      callback();

    };

    var fopts = 
      [ 
        { name: 'data/dmt_clusters_subset0/dmt_10_106.csv',  nv: 106 }, 
        { name: 'data/dmt_clusters_subset0/dmt_11_43.csv',  nv: 43 }, 
        { name: 'data/dmt_clusters_subset0/dmt_12_7.csv',  nv: 7 }, 
        { name: 'data/dmt_clusters_subset0/dmt_13_9.csv',  nv: 9 }, 
        { name: 'data/dmt_clusters_subset0/dmt_14_10.csv', nv: 10 }, 
        { name: 'data/dmt_clusters_subset0/dmt_15_2.csv', nv: 2 }, 
        { name: 'data/dmt_clusters_subset0/dmt_16_4.csv', nv: 4 }, 
        { name: 'data/dmt_clusters_subset0/dmt_17_9.csv', nv: 9 }, 
        { name: 'data/dmt_clusters_subset0/dmt_18_20.csv', nv: 20 }, 
        { name: 'data/dmt_clusters_subset0/dmt_19_23.csv', nv: 23 },
      ];

    var sayDone = function () {
      statusParagraph.innerHTML = 'Done';
    };

    var calc = function (i) {
      setTimeout(function () {
        minimize(fopts[i], sayDone);
      }, 100);
      statusParagraph.innerHTML = 'Loading...';
    };
    
    window.EXPORTS.minimizeSet0 = function () {
      calc(0);
    };
    window.EXPORTS.minimizeSet1 = function () {
      calc(1);
    };
    window.EXPORTS.minimizeSet2 = function () {
      calc(2);
    };
    window.EXPORTS.minimizeSet3 = function () {
      calc(3);
    };
    window.EXPORTS.minimizeSet4 = function () {
      calc(4);
    };
    window.EXPORTS.minimizeSet5 = function () {
      calc(5);
    };
    window.EXPORTS.minimizeSet6 = function () {
      calc(6);
    };
    window.EXPORTS.minimizeSet7 = function () {
      calc(7);
    };
    window.EXPORTS.minimizeSet8 = function () {
      calc(8);
    };
    window.EXPORTS.minimizeSet9 = function () {
      calc(9);
    };

    initialize();

  });
    
}());


