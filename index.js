/*****************************************************************************

* Author: Ludvig Sundström

* File Name: index.js

* Description: 

* Creation Date: 29-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var canvas, stime, etime, time;

    window.COMPONENT = window.COMPONENT || {};
    window.EXPORTS = window.EXPORTS || {};
    window.OBJECT = window.OBJECT || {};
    window.DATA = window.DATA || {};
    window.GLOBALS = window.GLOBALS || {};

    window.GLOBALS.SPRING_LENGTH = 600;
    window.GLOBALS.GRAVITY = 0.01;

    var initialize = function () {

      canvas = document.getElementById('canvas');

      var panelx = canvas.width;
      var panely = canvas.height;
      window.OBJECT.head = window.COMPONENT.head({});
      window.OBJECT.body = window.COMPONENT.body(
        { 
          dimension: window.COMPONENT.vector2D(panelx, panely),
          dmtsizes: window.DATA.dmtsizes          
        }
      );

      var variableParagraph = document.getElementById('variables');

      variableParagraph.innerHTML += ' Max distance (px): ' + 
        window.GLOBALS.SPRING_LENGTH;

      window.EXPORTS.draw();

    };
    
    var statusParagraph = document.getElementById('status');


    var minimize = function (opts) {

      var fopts = opts.fopts;
      var offset = opts.offset;
      var callback = opts.callback;

      var clusterParagraph = document.getElementById('cluster');
      clusterParagraph.innerHTML = 'N: ' + fopts.nv;

      var cMinimize, arr32, nbytes, dptr, dh, result;

      cMinimize = Module.cwrap(
        'minimize', 'number', 
        [
          'string', 
          'number', 
          'number', 
          'number', 
          'number', 
          'number', 
          'number', 
          'number', 
          'number'
        ]
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
        window.OBJECT.body.dimension.y,
        offset.x, 
        offset.y,
        opts.fact 
      );

      result = new Float32Array(
        dh.buffer, 
        dh.byteOffset, 
        arr32.length
      );

      Module._free(dh.byteOffset);

      callback(result, { par: opts.par, sizes : opts.sizes });
    };


    var sayDone = function (result, opts) {
      etime = new Date().getTime(); 
      time = (etime - stime) / 1000;
      statusParagraph.innerHTML = 'Done: ' + time + ' s';
      
      if (opts.par !== window.OBJECT.body) {
        window.OBJECT.body.children[opts.par - 1].createChildren(result);
      } else {
        window.OBJECT.body.addVertices(result, opts.sizes);
      }
    };

    var calc = function (opts) {
      var offset = opts.offset || window.COMPONENT.vector2D(0, 0);
      setTimeout(function () {
        minimize(
          {
            fopts: window.DATA.fopts[opts.fn], 
            fact: opts.fact,
            offset: offset, 
            callback: sayDone,
            par: opts.par,
            sizes: opts.sizes
          }
        );
        opts.callback();
      }, 20);
      stime = new Date().getTime(); 
      statusParagraph.innerHTML = 'Loading...';
    };

    var drawL0 = function () {
      window.EXPORTS.draw(false);
    };
    var drawL1 = function () {
      window.EXPORTS.drawVertices(false);
    };

    var minimizeSet = function (opts) {
      calc(
        {
          fn: opts.fn,
          fact: opts.fact,
          par: opts.par,
          offset: window.OBJECT.body.lookupPosition(opts.par),
          callback: drawL1 
        }     
      );
    };
    
    initialize();

    var minimizeL0 = function (callback) {
      calc(
        { 
          fn: 0, 
          par: window.OBJECT.body,
          fact: 1,
          sizes: true,
          callback: function () {
            drawL0();
            if (callback) {
              callback();
            }
          }
        }
      );
    };

    var minimizeL1 = function () {
      minimizeL0(function () {
        window.EXPORTS.redraw();
        minimizeSet({ fn: 1, par: 2, fact: 0.2, sizes: false });
        minimizeSet({ fn: 2, par: 3, fact: 0.2, sizes: false });
        minimizeSet({ fn: 3, par: 10, fact: 0.2, sizes: false });
        minimizeSet({ fn: 4, par: 11, fact: 0.2, sizes: false });
        minimizeSet({ fn: 5, par: 56, fact: 0.2, sizes: false });
      });
    };
    
    window.EXPORTS.minimizeL0 = minimizeL0; 
    window.EXPORTS.minimizeL1 = minimizeL1; 

    window.EXPORTS.minimizeSet0 = function () {
      minimizeSet({ fn: 1, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    window.EXPORTS.minimizeSet1 = function () {
      minimizeSet({ fn: 2, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    window.EXPORTS.minimizeSet2 = function () {
      minimizeSet({ fn: 3, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    window.EXPORTS.minimizeSet3 = function () {
      minimizeSet({ fn: 4, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    window.EXPORTS.minimizeSet4 = function () {
      minimizeSet({ fn: 5, par: window.OBJECT.body, fact: 1, sizes: false });
    };


  });
    
}());

