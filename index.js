/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : Main   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.OBJECT = window.OBJECT || {};
  window.PENCIL = window.PENCIL || {};

  APP.ANIMATION_TICK = 1000;
  var ENERGY_TRESHOLD = 0;

  // Animation ----------------------------------------------------------------
  
  var ticks = 0;
  var variableParagraph = document.getElementById('variables');
  var refreshIntervalID;

  variableParagraph.innerHTML += 'dT: ' + APP.ANIMATION_TICK;
  variableParagraph.innerHTML += ', Gravity: ' + PHYSICS.GRAVITY;
  variableParagraph.innerHTML += ', K: ' + PHYSICS.STIFFNESS;
  variableParagraph.innerHTML += ', Spring length: ' + PHYSICS.SPRING_LENGTH;

  APP.startAnimation = function () {
    var vs = OBJECT.body.getVertices();
    var s = document.getElementById('statusText');
    refreshIntervalID = setInterval(function () {
      console.log(OBJECT.body.verticePositions());
      PENCIL.ctx.clearRect(0, 0, canvas.width, canvas.height);
      OBJECT.body.getVertices().forEach(function (v) {
        if (!v.fixed) v.move();
        PENCIL.drawVertex(v);
      });
      OBJECT.body.getBonds().forEach(function (b) {
        if (b.dist === 1) PENCIL.drawBond(b);
      });
      OBJECT.body.getRestraints().forEach(function (r) {
        PENCIL.drawRestraint(r);
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

