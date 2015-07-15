/*****************************************************************************

* Author: Ludvig Sundström

* File Name: index.js

* Description: 

* Creation Date: 29-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    var canvas, stime, etime, time, 
      statusParagraph, variableParagraph, clusterParagraph;

    var initialize, minimize, buildGraph, calc, draw, minimizeSet, minimizeL0,
      minimizeL1, minimizeL2, minimizeL3, minimizeSet0, minimizeSet1,
      minimizeSet2, minimizeSet3, minimizeSet4;

    window.COMPONENT = window.COMPONENT || {};
    window.EXPORTS = window.EXPORTS || {};
    window.OBJECT = window.OBJECT || {};
    window.DATA = window.DATA || {};
    window.GLOBALS = window.GLOBALS || {};

    window.GLOBALS.SPRING_LENGTH = 500;

    statusParagraph = document.getElementById('status');
    variableParagraph = document.getElementById('variables');
    clusterParagraph = document.getElementById('cluster');

    variableParagraph.innerHTML += ' Max distance (px): ' + 
      window.GLOBALS.SPRING_LENGTH;

    initialize = function () {
      
      canvas = document.getElementById('canvas');
      window.EXPORTS.panelx = canvas.width;
      window.EXPORTS.panely = canvas.height;

      window.OBJECT.head = window.COMPONENT.head({});
      window.OBJECT.body = window.COMPONENT.body(
        { 
          dimension: window.COMPONENT.vector2D(
            window.EXPORTS.panelx, window.EXPORTS.panely
          )
        }
      );
    };

    minimize = function (opts) {
      var cMinimize;
      cMinimize = Module.cwrap('minimize', 'number', ['string']);
      cMinimize(
        opts.fopts.name
      );
    };
    
    buildGraph = function (opts) {
      etime = new Date().getTime(); 
      time = (etime - stime) / 1000;
      statusParagraph.innerHTML = 'Done: ' + time + ' s';
      window.OBJECT.body.addVertices(opts.varr);
      window.OBJECT.body.addBonds(opts.barr);
    };

    window.EXPORTS.processCdata = function (cvarr, cbarr, vlen, blen) {
      var opts, dh1, dh2;
      opts = {}; 
      dh1 = new Uint8Array(Module.HEAPU8.buffer, cvarr, 
      Float32Array.BYTES_PER_ELEMENT * vlen);
      opts.varr = new Float32Array(
        dh1.buffer, 
        dh1.byteOffset, 
        vlen
      );
      dh2 = new Uint8Array(Module.HEAPU8.buffer, cbarr, 
      Int32Array.BYTES_PER_ELEMENT * blen);
      opts.barr = new Int32Array(
        dh2.buffer,
        dh2.byteOffset,
        blen
      );
      buildGraph(opts);
      window.EXPORTS.draw();
    };


    calc = function (opts) {
      window.OBJECT.body.initialize();
      setTimeout(function () {
        minimize(
          {
            fopts: window.DATA.fopts[opts.fn], 
          }
        );
      }, 20);

      stime = new Date().getTime(); 
      statusParagraph.innerHTML = 'Loading...';
    };

    minimizeSet = function (opts) {
      calc(
        {
          fn: opts.fn,
          fact: opts.fact,
          par: opts.par,
          callback: window.EXPORTS.draw
        }     
      );
    };
    
    minimizeSet0 = function () {
      minimizeSet({ fn: 0, par: window.OBJECT.body, fact: 1 });
    };
    minimizeSet1 = function () {
      minimizeSet({ fn: 1, par: window.OBJECT.body, fact: 1 });
    };
    minimizeSet2 = function () {
      minimizeSet({ fn: 2, par: window.OBJECT.body, fact: 1 });
    };
    minimizeL0 = function () {
      calc(
        { 
          fn: 5, 
          ssfn: 0,
          par: window.OBJECT.body,
          fact: 1,
          callback: function () {
            draw();
          }
        }
      );
    };
    minimizeL1 = function () {
      calc(
        { 
          fn: 6, 
          ssfn: 1,
          par: window.OBJECT.body,
          fact: 1,
          callback: function () {
            draw();
          }
        }
      );
    };
    minimizeL2 = function () {
      calc(
        { 
          fn: 7, 
          ssfn: 2,
          par: window.OBJECT.body,
          fact: 1,
          callback: function () {
            draw();
          }
        }
      );
    };
    minimizeL3 = function () {
      calc(
        { 
          fn: 8, 
          ssfn: 3,
          par: window.OBJECT.body,
          fact: 1,
          callback: function () {
            draw();
          }
        }
      );
    };

    var minimizetest = function () {
      calc(
        { 
          fn: 9, 
          ssfn: 4,
          par: window.OBJECT.body,
          fact: 1,
          callback: function () {
            draw();
          }
        }
      );
    };

    window.EXPORTS.minimizeL0 = minimizeL0; 
    window.EXPORTS.minimizeL1 = minimizeL1; 
    window.EXPORTS.minimizeL2 = minimizeL2; 
    window.EXPORTS.minimizeL3 = minimizeL3; 

    window.EXPORTS.minimizeSet0 = minimizeSet0; 
    window.EXPORTS.minimizeSet1 = minimizeSet1; 
    window.EXPORTS.minimizeSet2 = minimizeSet2; 
    window.EXPORTS.minimizeSet3 = minimizeSet3; 
    window.EXPORTS.minimizeSet4 = minimizeSet4; 

    window.EXPORTS.minimizetest = minimizetest;
    
    initialize();

  });

}());

