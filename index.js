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

    window.GLOBALS.ANIMATION_TICK = 100;
    window.GLOBALS.PANEL_DIM_X = 800;
    window.GLOBALS.PANEL_DIM_Y = 800;
    
    window.GLOBALS.SPRING_LENGTH = 300;
    window.GLOBALS.GRAVITY = 0.01;
    window.GLOBALS.STIFFNESS = 1 / 2; 

    var initialize = function () {

      canvas = document.getElementById('canvas');
      canvas.style.width = '' + window.GLOBALS.PANEL_DIM_X + 'px';
      canvas.style.height = '' + window.GLOBALS.PANEL_DIM_Y + 'px';
      window.OBJECT.head = window.COMPONENT.head({});
      window.OBJECT.body = window.COMPONENT.body(
        { 
          dimension: window.COMPONENT.vector2D(
            window.GLOBALS.PANEL_DIM_X, 
            window.GLOBALS.PANEL_DIM_Y) 
        }
      );

      window.EXPORTS.draw();

    };
    
    var minimize = function (fopts) {

      var ms, cMinimize, arr32FPS, arr32MS, nbytesFPS,
        nbytesFDM, nbytesMS, dptrFPS, dptrMS, dhFPS, dhMS,
        result;

      cMinimize = Module.cwrap(
        'minimize', 'number', 
        ['string', 'number', 'number', 'number', 'number']
      );

      //ms = window.OBJECT.body.getVerticeMasses();
      ms = [];
      arr32FPS = new Float32Array(fopts.nv * 2);
      arr32MS = new Float32Array(ms);

      nbytesFPS = arr32FPS.length * arr32FPS.BYTES_PER_ELEMENT;
      nbytesMS = arr32MS.length * arr32MS.BYTES_PER_ELEMENT;
      dptrFPS = Module._malloc(nbytesFPS);
      dptrMS = Module._malloc(nbytesFDM);

      dhFPS = new Uint8Array(Module.HEAPU8.buffer, dptrFPS, nbytesFPS);
      dhMS = new Uint8Array(Module.HEAPU8.buffer, dptrMS, nbytesMS);

      dhFPS.set(new Uint8Array(arr32FPS.buffer));
      dhMS.set(new Uint8Array(arr32MS.buffer));
      cMinimize(
        fopts.name,
        dhFPS.byteOffset, 
        dhMS.byteOffset, 
        arr32FPS.length, 
        window.GLOBALS.SPRING_LENGTH
      );
      result = new Float32Array(
        dhFPS.buffer, 
        dhFPS.byteOffset, 
        arr32FPS.length
      );
      window.OBJECT.body.initialize(result);

      window.EXPORTS.draw();

      Module._free(dhFPS.byteOffset);
      Module._free(dhMS.byteOffset);

    };
  
    window.EXPORTS.minimizeSet0 = function () {
      minimize(
        {
          name: 'data/dmt_12_7.csv',
          nv: 7  
        }
      );
    };

    window.EXPORTS.minimizeSet1 = function () {
      minimize(
        {
          name: 'data/dmt_14_10.csv',
          nv: 10  
        }
      );
    };

    window.EXPORTS.minimizeSet2 = function () {
      minimize(
        {
          name: 'data/dmt_22_10.csv',
          nv: 10  
        }
      );
    };

    initialize();

  });
    
}());
