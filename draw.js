/*****************************************************************************

* Author : Ludvig Sundström

* File Name : draw.js

* Purpose : 

* Creation Date : 19-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.PENCIL = window.PENCIL || {};

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
      mx = e.pageX - offsetX - document.body.scrollLeft;
      my = e.pageY - offsetY - document.body.scrollTop;
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

  PENCIL.drawVertex = drawVertex;
  PENCIL.drawBond = drawBond;
  PENCIL.ctx = ctx;

}); 
