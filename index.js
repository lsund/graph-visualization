/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : Main   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  //var energy = 0.5 * mass * (vel * vel)

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
    var center = v.getCenter();
    var centerx = center.x;
    var centery = center.y;
    if (v.shape === 'circle') {
      ctx.strokeStyle = v.color;
      ctx.beginPath();
      ctx.arc(centerx, centery, v.dimensions, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } else if (v.shape === 'rectangle') {
      ctx.fillRect(centerx, centery, v.dimensions.w, v.dimensions.h);
    }
  };

  var drawBond = function (b) {
    var fstCenter = b.first.getCenter();
    var sndCenter = b.second.getCenter();
    ctx.moveTo(fstCenter.x, fstCenter.y);
    ctx.lineTo(sndCenter.x, sndCenter.y);
    ctx.stroke();
  };
  
  var refreshIntervalID;

  APP.initializeDrawing = function () { 
    APP.theObject.vertices.forEach(function (v) {
      drawVertex(v);
    });
    APP.theObject.bonds.forEach(function (b) {
      drawBond(b);
    });
  }
  
  APP.startAnimation = function () {
    var s = document.getElementById('statusText');
    s.innerHTML = 'running';
    refreshIntervalID = setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      APP.theObject.vertices.forEach(function (v) {
        drawVertex(v);
      });
      APP.theObject.bonds.forEach(function (b) {
        drawBond(b);
      });
      APP.physicsEngine.applyForces();
      APP.theObject.vertices.forEach(function (v) {
        v.move();
      });
    }, animationTick);
  }

  APP.stopAnimation = function () { 
    var s = document.getElementById('statusText');
    s.innerHTML = 'Stopped';
    clearInterval(refreshIntervalID) 
  }
  
});
