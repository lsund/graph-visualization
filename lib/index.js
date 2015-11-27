/*****************************************************************************

* Author: Ludvig Sundström

* File Name: index.js

* Description: 

* Creation Date: 29-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    window.COMPONENT = window.COMPONENT || {};
    window.EXPORTS = window.EXPORTS || {};
    window.OBJECT = window.OBJECT || {};
    window.DATA = window.DATA || {};
    window.GLOBALS = window.GLOBALS || {};

    window.GLOBALS.PANEL_X = 1000;
    window.GLOBALS.PANEL_Y = 1000;

    window.GLOBALS.SCALE = 1;

    var canvas, stime, etime, time, 
      statusParagraph, variableParagraph, clusterParagraph;

    statusParagraph = document.getElementById('status');
    variableParagraph = document.getElementById('variables');
    clusterParagraph = document.getElementById('cluster');

    var initialize, minimize, buildGraph, minimizeNext;

    initialize = function () {

      var cLoad = Module.cwrap('Minimizer_load_files', 'number', []);
      cLoad();
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
      cMinimize = Module.cwrap('Minimizer_run', 'number', ['string']);
      cMinimize(
        opts.fopts.name
      );
    };

    minimizeNext = function () {
      var cMinimize;
      cMinimize = Module.cwrap('Minimizer_run_next', 'number', []);
      cMinimize();
    };
    
    buildGraph = function (opts) {
        etime = new Date().getTime(); 
        time = (etime - stime) / 1000;
        statusParagraph.innerHTML = 'Done: ' + time + ' s';
        window.OBJECT.body.addVertices(opts.varr);
        window.OBJECT.body.addBonds(opts.barr);
        window.OBJECT.body.addZones(opts.zarr);
        Module._free(opts.dh1.byteOffset);
        Module._free(opts.dh2.byteOffset);
        Module._free(opts.dh3.byteOffset);
    };

    window.EXPORTS.processCdata = 
    function (cvarr, cbarr, czarr, vlen, blen, zlen) {
        var opts = {}; 

        opts.dh1 = new Uint8Array(Module.HEAPU8.buffer, cvarr, 
        Float32Array.BYTES_PER_ELEMENT * vlen);
        opts.varr = new Float32Array(
            opts.dh1.buffer, 
            opts.dh1.byteOffset, 
            vlen
        );

        opts.dh2 = new Uint8Array(Module.HEAPU8.buffer, cbarr, 
        Int32Array.BYTES_PER_ELEMENT * blen);
        opts.barr = new Int32Array(
            opts.dh2.buffer,
            opts.dh2.byteOffset,
            blen
        );

        opts.dh3 = new Uint8Array(Module.HEAP8.buffer, czarr, 
        Int32Array.BYTES_PER_ELEMENT * zlen);
        opts.zarr = new Int32Array(
            opts.dh3.buffer,
            opts.dh3.byteOffset,
            zlen
        );
        buildGraph(opts);
        window.EXPORTS.draw();
    };

    var calc = function (opts) {
        window.OBJECT.body.initialize();
        if (opts.fn === -1) {
            setTimeout(function () {
                minimizeNext();
            }, 20);
        } else {
            setTimeout(function () {
                minimize({ fopts: window.DATA.fopts[opts.fn] });
            }, 20);
        }
        stime = new Date().getTime(); 
        statusParagraph.innerHTML = 'Loading...';
    };

    var zoomIn = function () {
      var factor = 0.2;
      window.OBJECT.body.expand(factor);
      window.EXPORTS.draw();
    };
    var zoomOut = function () {
      var factor = 0.2;
      window.OBJECT.body.contract(factor);
      window.EXPORTS.draw();
    };
    var zoomClose = function () {
        for(var i = 0; i < 14; i++) {
            zoomIn()
        }
    }

    var next = function () {
        calc({ fn: -1});
    };

    var minimizeSet0, minimizeSet1, minimizeSet2, minimizeSet3, minimizeSet4,
        minimizeSet5, minimizeSet6, minimizeSet7, minimizeSet8, minimizeSet9,
        minimizeSet10, minimizeSet11, minimizeSet12;

    minimizeSet0 = function () {
      calc({ fn: 0 });
    };
    minimizeSet1 = function () {
      calc({ fn: 1 });
    };
    minimizeSet2 = function () {
      calc({ fn: 2 });
    };
    minimizeSet3 = function () {
      calc({ fn: 3 });
    };
    minimizeSet4 = function () {
      calc({ fn: 4 });
    };
    minimizeSet5 = function () {
      calc({ fn: 5 });
    };
    minimizeSet6 = function () {
      calc({ fn: 6 });
    };
    minimizeSet7 = function () {
      calc({ fn: 7 });
    };
    minimizeSet8 = function () {
      calc({ fn: 8 });
    };
    minimizeSet9 = function () {
      calc({ fn: 9 });
    };
    minimizeSet10 = function () {
      calc({ fn: 10 });
    };
    minimizeSet11 = function () {
      calc({ fn: 11 });
    };
    minimizeSet12 = function () {
      calc({ fn: 12 });
    };

    window.EXPORTS.minimizeNext = minimizeNext;

    window.EXPORTS.minimizeSet0 = minimizeSet0; 
    window.EXPORTS.minimizeSet1 = minimizeSet1; 
    window.EXPORTS.minimizeSet2 = minimizeSet2; 
    window.EXPORTS.minimizeSet3 = minimizeSet3; 
    window.EXPORTS.minimizeSet4 = minimizeSet4; 
    window.EXPORTS.minimizeSet5 = minimizeSet5; 
    window.EXPORTS.minimizeSet6 = minimizeSet6; 
    window.EXPORTS.minimizeSet7 = minimizeSet7; 
    window.EXPORTS.minimizeSet8 = minimizeSet8; 
    window.EXPORTS.minimizeSet9 = minimizeSet9; 
    window.EXPORTS.minimizeSet10 = minimizeSet10; 
    window.EXPORTS.minimizeSet11 = minimizeSet11; 
    window.EXPORTS.minimizeSet12 = minimizeSet12; 

    window.EXPORTS.zoomIn = zoomIn;
    window.EXPORTS.zoomOut = zoomOut;
    window.EXPORTS.zoomClose = zoomClose;

    initialize();

  });

}());

