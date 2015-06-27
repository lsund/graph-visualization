/*****************************************************************************

* Author : Ludvig Sundström

* File Name : animation.js

* Purpose : Animation   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.OBJECT = window.OBJECT || {};
  window.PENCIL = window.PENCIL || {};

  APP.ANIMATION_TICK = 100;

  APP.PANEL_DIM_X = 800;
  APP.PANEL_DIM_Y = 800;
  
  // Standard bond length
  PHYSICS.SPRING_LENGTH = 150;
  // Gravity constant
  PHYSICS.GRAVITY = 0.01;
  // Stiffness constant
  PHYSICS.STIFFNESS = 1 / 2; 
  

  // Animation ----------------------------------------------------------------
  
  var ticks = 0;
  var variableParagraph = document.getElementById('variables');
  var refreshIntervalID;
  var dmat, vops;

  variableParagraph.innerHTML += 'K: ' + PHYSICS.STIFFNESS;
  variableParagraph.innerHTML += ', Spring length: ' + PHYSICS.SPRING_LENGTH;
  
  APP.useSet0 = function () {
    dmat = DATA.dmat0;
    vopts = DATA.vopts0;
    initialize();
  };
  APP.useSet1 = function () {
    dmat = DATA.dmat1;
    vopts = DATA.vopts1;
    initialize();
  };
  APP.useSet2 = function () {
    dmat = DATA.dmat2;
    vopts = DATA.vopts2;
    initialize();
  };

  var initialize = function () {
    var canvas = document.getElementById('canvas');
    canvas.style.width = '' + APP.PANEL_DIM_X + 'px';
    canvas.style.height = '' + APP.PANEL_DIM_Y + 'px';
    OBJECT.head = APP.head({});
    OBJECT.body = APP.body(
      { dimension: APP.vector2D(APP.PANEL_DIM_X, APP.PANEL_DIM_Y) }
    );
    OBJECT.body.initialize(vopts, dmat);
    APP.draw();
  };
  
  APP.randomPosition = function () {
    OBJECT.body.randomPosition();
    APP.draw();
  }

  APP.gridPosition = function () {
    OBJECT.body.gridPosition();
    APP.draw();
  }

  APP.minimize = function () {
    var fps, fdm, ms, c_minimize, arr32FPS, arr32FDM, nbytesFPS, nbytesFDM,
      dptrFPS, dptrFDM, dhFPS, dhFDM, result;

    fps = OBJECT.body.getVerticePositions(); 
    fdm = [];  
    fdm = fdm.concat.apply(fdm, dmat);
    ms = OBJECT.body.getVerticeMasses();

    c_minimize = Module.cwrap(
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
    c_minimize(
      dhFPS.byteOffset, 
      dhFDM.byteOffset, 
      dhMS.byteOffset, 
      arr32FPS.length, 
      PHYSICS.SPRING_LENGTH
    );
    result = new Float32Array(dhFPS.buffer, dhFPS.byteOffset, arr32FPS.length);

    OBJECT.body.setVerticePositions(result);
    APP.draw();

    Module._free(dhFPS.byteOffset);
    Module._free(dhFDM.byteOffset);
  };


  APP.draw = function () {
    PENCIL.ctx.clearRect(0, 0, canvas.width, canvas.height);
    OBJECT.body.getBonds().forEach(function (b) {
      if (b.type === 'r') PENCIL.drawBond(b);
    });
    OBJECT.body.getRestraints().forEach(function (r) {
      PENCIL.drawRestraint(r);
    });
    OBJECT.body.getVertices().forEach(function (v) {
      PENCIL.drawVertex(v);
    });
  };


// Moving animation -----------------------------------------------------------

  APP.startAnimation = function () {
    var vs = OBJECT.body.getVertices();
    var s = document.getElementById('statusText');
    refreshIntervalID = setInterval(function () {
      APP.draw();
      OBJECT.body.getVertices().forEach(function (v) {
        if (!v.fixed) v.move();
      });
      OBJECT.head.physicsEngine.applyForces();
      for (var i = 0; i < vs.length; i++) {
        var v = vs[i];  
        v.accelerate();
      }
    }, APP.ANIMATION_TICK);
  }
  
  APP.stopAnimation = function () { 
    clearInterval(refreshIntervalID);
  }

});

