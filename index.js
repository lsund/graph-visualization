/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : Main   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  var animationTick = 50;
  
  // Animation ----------------------------------------------------------------
  
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');

  var canvasState = function(canvas) {

    var that = {};

    var valid = false;
    var dragging = false;
    var selection = null;
    var dragoffx = 0;
    var dragoffy = 0;
    
    var getMouse = function (e) {
      var mx, my, offsetX, offsetY;
      var panel = document.getElementById('canvas');
      var rect = panel.getBoundingClientRect();
      offsetX = rect.x;
      offsetY = rect.y;
      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;
      return APP.vector2D(mx, my);
    };

    canvas.addEventListener('selectstart', function(e) { 
      e.preventDefault(); return false; 
    }, false);

    canvas.addEventListener('mousedown', function (e) {
      dragging = true;
      var vec = getMouse(e);
      APP.theObject.vertices.forEach(function (v) {
        if (v.contains(vec)) {
          selection = v;  
          selection.color = 'black';
        }
      }); 
    });

    canvas.addEventListener('mousemove', function (e) {
      if (dragging && selection !== null) {
        var vec = getMouse(e);
        selection.moveTo(vec)   
      }
    });

    canvas.addEventListener('mouseup', function (e) {
      dragging = false;
      if (selection !== null) {
        selection.color = 'grey';
        selection = null;
      }
    });
  } 

  var s = canvasState(c);

  var drawVertex = function (v) {
    ctx.fillStyle = v.color;
    var position = v.getPosition();
    var positionx = position.x;
    var positiony = position.y;
    if (v.shape === 'circle') {
      ctx.strokeStyle = v.color;
      ctx.beginPath();
      ctx.arc(positionx, positiony, v.dimension, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.font = "bold 14px Arial";
      ctx.fillStyle = 'black';
      ctx.fillText(v.id, position.x - 2, position.y + 4);
    } else if (v.shape === 'rectangle') {
      ctx.fillRect(positionx, positiony, v.dimension.w, v.dimension.h);
    }
  };

  var drawBond = function (b) {
    var fstCenter = b.first.getPosition();
    var sndCenter = b.second.getPosition();
    ctx.moveTo(fstCenter.x, fstCenter.y);
    ctx.lineTo(sndCenter.x, sndCenter.y);
    ctx.strokeStyle = b.color;
    ctx.stroke();
  };

  var refreshIntervalID;

  APP.initializeDrawing = function () { 
    APP.theObject.bonds.forEach(function (b) {
      drawBond(b);
    });
    APP.theObject.vertices.forEach(function (v) {
      drawVertex(v);
    });
  }
  
  APP.startAnimation = function () {
    var s = document.getElementById('statusText');
    s.innerHTML = 'running';
    refreshIntervalID = setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      checkBonds();
      APP.theObject.bonds.forEach(function (b) {
        drawBond(b);
      });
      APP.theObject.vertices.forEach(function (v) {
        drawVertex(v);
      });
      APP.physicsEngine.applyForces();
      APP.theObject.vertices.forEach(function (v) {
        v.move();
      });
    }, animationTick);
  }
  
  // How to punish this? 
  var checkBonds = function () {
    var cb1, cb2;
    for (var i = 0; i < APP.theObject.bonds.length - 1; i++) {
      cb1 = APP.theObject.bonds[i]; 
      for (var j = i + 1; j < APP.theObject.bonds.length; j++) {
        cb2 = APP.theObject.bonds[j]; 
        if(APP.doLineSegmentsIntersect(cb1.first.getPosition(), 
          cb1.second.getPosition(), 
          cb2.first.getPosition(), 
          cb2.second.getPosition())) {
          console.log('b1:' + cb1.first.id + ' b2: ' + cb1.second.id);
        }
      }
    }
  }

  APP.stopAnimation = function () { 
    var s = document.getElementById('statusText');
    s.innerHTML = 'Stopped';
    clearInterval(refreshIntervalID) 
  }
  
});
