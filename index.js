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

  APP.ANIMATION_TICK = 100;

  var ENERGY_TRESHOLD = 20;

  var systemEnergy = function (vs) {
    APP.physicsEngine.applyForces();
    var e = 0;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i];  
      v.accelerate();
      e += v.getKineticEnergy();
    }
    return e;
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
      PENCIL.drawBond(b);
    });
    APP.theObject.vertices.forEach(function (v) {
      PENCIL.drawVertex(v);
    });
  }
  
  APP.startAnimation = function () {
    var s = document.getElementById('statusText');
    refreshIntervalID = setInterval(function () {
      PENCIL.ctx.clearRect(0, 0, canvas.width, canvas.height);
      APP.theObject.bonds.forEach(function (b) {
        PENCIL.drawBond(b);
      });
      var energy = systemEnergy(APP.theObject.vertices);
      APP.theObject.vertices.forEach(function (v) {
        var pos = v.getPosition();
        var vel = v.getVelocity();
        v.setPosition(pos.add(vel));
        PENCIL.drawVertex(v);
      });
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
  
  // How to punish this? 
  //var checkBonds = function () {
    //var cb1, cb2;
    //for (var i = 0; i < APP.theObject.bonds.length - 1; i++) {
      //cb1 = APP.theObject.bonds[i]; 
      //for (var j = i + 1; j < APP.theObject.bonds.length; j++) {
        //cb2 = APP.theObject.bonds[j]; 
        //if(APP.doLineSegmentsIntersect(cb1.first.getPosition(), 
          //cb1.second.getPosition(), 
          //cb2.first.getPosition(), 
          //cb2.second.getPosition())) {
          //console.log('b1:' + cb1.first.id + ' b2: ' + cb1.second.id);
        //}
      //}
    //}
  //}

});
