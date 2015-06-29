/*****************************************************************************

* Author: Ludvig Sundström

* File Name: animation.js

* Description: Animation   

* Creation Date: 17-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.OBJECT = window.OBJECT || {};
    window.PENCIL = window.PENCIL || {};
    window.DATA = window.DATA || {};
    window.PHYSICS = window.PHYSICS || {};

    window.APP.ANIMATION_TICK = 100;

    window.APP.PANEL_DIM_X = 800;
    window.APP.PANEL_DIM_Y = 800;
    
    // Standard bond length
    window.PHYSICS.SPRING_LENGTH = 150;
    // Gravity constant
    window.PHYSICS.GRAVITY = 0.01;
    // Stiffness constant
    window.PHYSICS.STIFFNESS = 1 / 2; 
    
    // Animation --------------------------------------------------------------
    
    var variableParagraph = document.getElementById('variables');
    var refreshIntervalID;
    var dmat, vopts, canvas;

    variableParagraph.innerHTML += 'K: ' + window.PHYSICS.STIFFNESS;
    variableParagraph.innerHTML += 'D: ' + window.PHYSICS.SPRING_LENGTH;
    

    window.APP.useSet0 = function () {
      dmat = window.DATA.dmat0;
      vopts = window.DATA.vopts0;
      initialize();
    };
    window.APP.useSet1 = function () {
      dmat = window.DATA.dmat1;
      vopts = window.DATA.vopts1;
      initialize();
    };
    window.APP.useSet2 = function () {
      dmat = window.DATA.dmat2;
      vopts = window.DATA.vopts2;
      initialize();
    };

    var initialize = function () {
      canvas = document.getElementById('canvas');
      canvas.style.width = '' + window.APP.PANEL_DIM_X + 'px';
      canvas.style.height = '' + window.APP.PANEL_DIM_Y + 'px';
      window.OBJECT.head = window.APP.head({});
      window.OBJECT.body = window.APP.body(
        { dimension: window.APP.vector2D(window.APP.PANEL_DIM_X, window.APP.PANEL_DIM_Y) }
      );
      window.OBJECT.body.initialize(vopts, dmat);
      window.APP.draw();
    };

    window.APP.randomPosition = function () {
      window.OBJECT.body.randomPosition();
      window.APP.draw();
    };

    window.APP.gridPosition = function () {
      window.OBJECT.body.gridPosition();
      window.APP.draw();
    };

    window.APP.minimize = function () {
      var fps, fdm, ms, cMinimize, arr32FPS, arr32FDM, arr32MS, nbytesFPS,
        nbytesFDM, nbytesMS, dptrFPS, dptrFDM, dptrMS, dhFPS, dhFDM, dhMS,
        result;

      fps = window.OBJECT.body.getVerticePositions(); 
      fdm = [];  
      fdm = fdm.concat.apply(fdm, dmat);
      ms = window.OBJECT.body.getVerticeMasses();

      cMinimize = Module.cwrap(
        'minimize', 'number', ['number', 'number', 'number', 'number', 'number']
      );

      arr32FPS = new Float32Array(fps);
      arr32FDM = new Float32Array(fdm);
      arr32MS = new Float32Array(ms);

      nbytesFPS = arr32FPS.length * arr32FPS.BYTES_PER_ELEMENT;
      nbytesFDM = arr32FDM.length * arr32FDM.BYTES_PER_ELEMENT;
      nbytesMS = arr32MS.length * arr32FDM.BYTES_PER_ELEMENT;
      dptrFPS = Module._malloc(nbytesFPS);
      dptrFDM = Module._malloc(nbytesFDM);
      dptrMS = Module._malloc(nbytesFDM);

      dhFPS = new Uint8Array(Module.HEAPU8.buffer, dptrFPS, nbytesFPS);
      dhFDM = new Uint8Array(Module.HEAPU8.buffer, dptrFDM, nbytesFDM);
      dhMS = new Uint8Array(Module.HEAPU8.buffer, dptrMS, nbytesMS);

      dhFPS.set(new Uint8Array(arr32FPS.buffer));
      dhFDM.set(new Uint8Array(arr32FDM.buffer));
      dhMS.set(new Uint8Array(arr32MS.buffer));
      cMinimize(
        dhFPS.byteOffset, 
        dhFDM.byteOffset, 
        dhMS.byteOffset, 
        arr32FPS.length, 
        window.PHYSICS.SPRING_LENGTH
      );
      result = new Float32Array(dhFPS.buffer, dhFPS.byteOffset, arr32FPS.length);

      window.OBJECT.body.setVerticePositions(result);
      window.APP.draw();

      Module._free(dhFPS.byteOffset);
      Module._free(dhFDM.byteOffset);
    };


    window.APP.draw = function () {
      window.PENCIL.ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.OBJECT.body.bonds.forEach(function (b) {
        if (b.type === 'r') {
          window.PENCIL.drawBond(b);
        }
      });
      window.OBJECT.body.restraints.forEach(function (r) {
        window.PENCIL.drawRestraint(r);
      });
      window.OBJECT.body.vertices.forEach(function (v) {
        window.PENCIL.drawVertex(v);
      });
    };


  // Moving animation ---------------------------------------------------------

    window.APP.startAnimation = function () {
      var vs = window.OBJECT.body.getVertices();
      refreshIntervalID = setInterval(function () {
        window.APP.draw();
        window.OBJECT.body.getVertices().forEach(function (v) {
          if (!v.fixed) { 
            v.move();
          }
        });
        window.OBJECT.head.physicsEngine.applyForces();
        for (var i = 0; i < vs.length; i += 1) {
          var v = vs[i];  
          v.accelerate();
        }
      }, window.APP.ANIMATION_TICK);
    };
    
    window.APP.stopAnimation = function () { 
      clearInterval(refreshIntervalID);
    };
  // --------------------------------------------------------------------------

    window.APP.useSet0();
    
    var server = function () {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', 'http://localhost:1337/getstring', true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
          var string = xmlhttp.responseText;
          console.log(string);
        }
      };
      xmlhttp.send();
    };

    server();

  }); 

}());
