/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : Main   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/


document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};
  window.PENCIL = window.PENCIL || {};

  APP.ANIMATION_TICK = 50;
  var ENERGY_TRESHOLD = 0;

  APP.theObject = APP.body({});

  var systemEnergy = function (vs) {
    APP.physicsEngine.applyForces();
    var e = 0;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i];  
      v.accelerate();
      e += v.getKineticEnergy();
      e += v.getPotentialEnergy();
    }
    return e;
  };
  
  var addImmaginaryBonds = function () {
    var cv1, cv2;
    for (var i = 0; i < APP.theObject.vertices.length - 1; i++) {
      cv1 = APP.theObject.vertices[i]; 
      for (var j = i + 1; j < APP.theObject.vertices.length; j++) {
        cv2 = APP.theObject.vertices[j]; 
        var cb = APP.bond(
          { 
            first: cv1, 
            second: cv2, 
          }
        );
      }
    }
  };

  // Animation ----------------------------------------------------------------
  
  var ticks = 0;
  var variableParagraph = document.getElementById('variables');
  var refreshIntervalID;

  variableParagraph.innerHTML += 'dT: ' + APP.ANIMATION_TICK;
  variableParagraph.innerHTML += ', Repulsion: ' + PHYSICS.REPULSION;
  variableParagraph.innerHTML += ', Gravity: ' + PHYSICS.GRAVITY;
  variableParagraph.innerHTML += ', K: ' + PHYSICS.STIFFNESS;
  variableParagraph.innerHTML += ', Spring length: ' + PHYSICS.SPRING_LENGTH;

  APP.initializeDrawing = function () { 
    APP.theObject.bonds.forEach(function (b) {
      if (b.dist === 1) PENCIL.drawBond(b);
    });
    APP.theObject.vertices.forEach(function (v) {
      PENCIL.drawVertex(v);
    });
  }
  
  APP.startAnimation = function () {

    APP.TOTALENERGY = 0;
    addImmaginaryBonds();
    var s = document.getElementById('statusText');
    refreshIntervalID = setInterval(function () {
      PENCIL.ctx.clearRect(0, 0, canvas.width, canvas.height);
      APP.theObject.vertices.forEach(function (v) {
        if (!v.fixed) v.move();
        PENCIL.drawVertex(v);
      });
      APP.theObject.bonds.forEach(function (b) {
        if (b.dist === 1) PENCIL.drawBond(b);
      });
      APP.theObject.restraints.forEach(function (r) {
        PENCIL.drawRestraint(r);
      });
      var energy = systemEnergy(APP.theObject.vertices);
      s.innerHTML = 'System energy: ' + energy;
      ticks += 1;
      if (energy < ENERGY_TRESHOLD) {
        clearInterval(refreshIntervalID);
        s.innerHTML += ' ticks: ' + ticks;
      }
    }, APP.ANIMATION_TICK);
  }
  
  APP.stopAnimation = function () { 
    clearInterval(refreshIntervalID);
  }
  
});
