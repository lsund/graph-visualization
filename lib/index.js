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

    var initialize, minimize, sayDone, calc, draw, minimizeSet, minimizeL0,
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
      
      var panelx, panely;

      canvas = document.getElementById('canvas');
      panelx = canvas.width;
      panely = canvas.height;

      window.OBJECT.head = window.COMPONENT.head({});
      window.OBJECT.body = window.COMPONENT.body(
        { 
          dimension: window.COMPONENT.vector2D(panelx, panely)
        }
      );

      window.EXPORTS.draw();
    };

    minimize = function (opts) {
      
      var cMinimize, arr32, nbytes, dptr, dh, vsarr, bsarr, barr32,
      bnbytes, bdptr, bdh, maxbonds;

      maxbonds = (opts.fopts.nv * (opts.fopts.nv - 1)) / 2;
      opts.ssfopts = opts.ssfopts || { name: 'noCustomSizes' };

      clusterParagraph.innerHTML = 'N: ' + opts.fopts.nv;

      cMinimize = Module.cwrap(
        'minimize', 'number', 
        [
          'string', 
          'string',
          'number', 
          'number', 
          'number', 
          'number', 
          'number', 
          'number'
        ]
      );

      arr32 = new Float32Array(opts.fopts.nv * 2);
      nbytes = arr32.length * arr32.BYTES_PER_ELEMENT;
      dptr = Module._malloc(nbytes);
      dh = new Uint8Array(Module.HEAPU8.buffer, dptr, nbytes);
      dh.set(new Uint8Array(arr32.buffer));

      barr32 = new Int32Array(maxbonds * 2 + 2);
      bnbytes = barr32.length * barr32.BYTES_PER_ELEMENT;
      bdptr = Module._malloc(bnbytes);
      bdh = new Uint8Array(Module.HEAPU8.buffer, bdptr, bnbytes);
      bdh.set(new Uint8Array(barr32.buffer));

      cMinimize(
        opts.fopts.name,
        opts.ssfopts.name,
        dh.byteOffset, 
        bdh.byteOffset,
        arr32.length,
        opts.fact 
      );

      vsarr = new Float32Array(
        dh.buffer, 
        dh.byteOffset, 
        arr32.length
      );

      bsarr = new Int32Array(
        bdh.buffer,
        bdh.byteOffset,
        barr32.length
      );

      Module._free(bdh.byteOffset);
      Module._free(dh.byteOffset);

      opts.callback(
        { varr: vsarr, barr: bsarr, par: opts.par, sizes : opts.sizes }
      );
    };

    sayDone = function (opts) {

      etime = new Date().getTime(); 
      time = (etime - stime) / 1000;

      statusParagraph.innerHTML = 'Done: ' + time + ' s';

      if (opts.par !== window.OBJECT.body) {
        window.OBJECT.body.children[opts.par - 1].createChildren(opts.varr);
      } else {
        window.OBJECT.body.addVertices(opts.varr, opts.sizes);
        window.OBJECT.body.addBonds(opts.barr);
      }
    };

    calc = function (opts) {
      var ssfopts;

      window.OBJECT.body.initialize();
      opts.offset = opts.offset || window.COMPONENT.vector2D(0, 0);
       
      if (opts.ssfn !== undefined) {
        ssfopts = window.DATA.ssfopts[opts.ssfn];
      } else {
        ssfopts = undefined;
      }
      setTimeout(function () {
        minimize(
          {
            fopts: window.DATA.fopts[opts.fn], 
            ssfopts: ssfopts,
            fact: opts.fact,
            offset: opts.offset, 
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

    draw = function () {
      window.EXPORTS.draw(true);
    };

    minimizeSet = function (opts) {
      calc(
        {
          fn: opts.fn,
          fact: opts.fact,
          par: opts.par,
          offset: window.OBJECT.body.lookupPosition(opts.par),
          callback: draw
        }     
      );
    };
    
    minimizeSet0 = function () {
      minimizeSet({ fn: 0, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    minimizeSet1 = function () {
      minimizeSet({ fn: 1, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    minimizeSet2 = function () {
      minimizeSet({ fn: 2, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    minimizeSet3 = function () {
      minimizeSet({ fn: 3, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    minimizeSet4 = function () {
      minimizeSet({ fn: 4, par: window.OBJECT.body, fact: 1, sizes: false });
    };
    minimizeL0 = function () {
      window.EXPORTS.readSizes('/data/c_32/dmt_sizes.json', function () {
        calc(
          { 
            fn: 5, 
            ssfn: 0,
            par: window.OBJECT.body,
            fact: 1,
            sizes: true,
            callback: function () {
              draw();
            }
          }
        );
      });
    };
    minimizeL1 = function () {
      window.EXPORTS.readSizes('/data/c_64/dmt_sizes.json', function () {
        calc(
          { 
            fn: 6, 
            ssfn: 1,
            par: window.OBJECT.body,
            fact: 1,
            sizes: true,
            callback: function () {
              draw();
            }
          }
        );
      });
    };
    minimizeL2 = function () {
      window.EXPORTS.readSizes('/data/c_128/dmt_sizes.json', function () {
        calc(
          { 
            fn: 7, 
            ssfn: 2,
            par: window.OBJECT.body,
            fact: 1,
            sizes: true,
            callback: function () {
              draw();
            }
          }
        );
      });
    };
    minimizeL3 = function () {
      window.EXPORTS.readSizes('/data/c_256/dmt_sizes.json', function () {
        calc(
          { 
            fn: 8, 
            ssfn: 3,
            par: window.OBJECT.body,
            fact: 1,
            sizes: true,
            callback: function () {
              draw();
            }
          }
        );
      });
    };

    var minimizetest = function () {
      window.EXPORTS.readSizes('/data/testsizes.json', function () {
        calc(
          { 
            fn: 9, 
            ssfn: 4,
            par: window.OBJECT.body,
            fact: 1,
            sizes: false,
            callback: function () {
              draw();
            }
          }
        );
      });
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

