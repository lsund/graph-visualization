/*****************************************************************************

* Author : Ludvig Sundström

* File Name : draw.js

* Purpose : 

* Creation Date : 19-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.OBJECT = window.OBJECT || {};
    window.EXPORTS = window.EXPORTS || {};
    window.GLOBALS = window.GLOBALS || {};

    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    
    var dragging = false;
    var selection = null;
    
    var getMouse = function (e) {
      var mx, my, offsetX, offsetY;
      var panel = document.getElementById('canvas');
      var rect = panel.getBoundingClientRect();
      offsetX = rect.x;
      offsetY = rect.y;
      mx = e.pageX - offsetX - document.body.scrollLeft;
      my = e.pageY - offsetY - document.body.scrollTop;
      return window.COMPONENT.vector2D(mx, my);
    };

    c.addEventListener('selectstart', function(e) { 
      e.preventDefault(); return false; 
    }, false);

    c.addEventListener('mousedown', function (e) {
      dragging = true;
      var vec = getMouse(e);
      window.OBJECT.body.vertices.forEach(function (v) {
        if (v.contains(vec)) {
          selection = v;  
          selection.color = 'black';
        }
      }); 
    });

    c.addEventListener('mousemove', function (e) {
      if (dragging && selection !== null) {
        var vec = getMouse(e);
        selection.setPosition(vec);
      }
    });

    c.addEventListener('mouseup', function () {
      dragging = false;
      if (selection !== null) {
        selection.color = 'grey';
        selection = null;
      }
    });

    var drawVertex = function (v) {
      ctx.fillStyle = v.color;
      var position = v.position;
      if (v.shape === 'circle') {
        ctx.strokeStyle = v.color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, v.dimension, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = 'black';
        if (v.fixed) {
          ctx.fillStyle = 'white';
        }
        ctx.fillText(v.id, position.x - 2, position.y + 4);
      } else if (v.shape === 'rectangle') {
        ctx.fillRect(position.x, position.y, v.dimension.x, v.dimension.y);
      }
    };

    var drawBond = function (b) {
      var fstCenter = b.first.getCenter();
      var sndCenter = b.second.getCenter();
      ctx.moveTo(fstCenter.x, fstCenter.y);
      ctx.lineTo(sndCenter.x, sndCenter.y);
      ctx.strokeStyle = b.color;
      ctx.stroke();
    };

    var drawRestraint = function (r) {
      var position = r.getCenter();
      ctx.strokeStyle = 'black';
      ctx.rect(position.x, position.y, r.dimension.x, r.dimension.y);
      ctx.stroke(); 
    };

    var randomPosition = function () {
      window.OBJECT.body.randomPosition();
      draw();
    };

    var gridPosition = function () {
      window.OBJECT.body.gridPosition();
      draw();
    };

    var draw = function () {
      ctx.clearRect(0, 0, c.width, c.height);
      window.OBJECT.body.bonds.forEach(function (b) {
        if (b.type === 'r') {
          drawBond(b);
        }
      });
      window.OBJECT.body.restraints.forEach(function (r) {
        drawRestraint(r);
      });
      window.OBJECT.body.vertices.forEach(function (v) {
        drawVertex(v);
      });
    };

    var variableParagraph = document.getElementById('variables');

    variableParagraph.innerHTML += 'K: ' + window.GLOBALS.STIFFNESS;
    variableParagraph.innerHTML += 'D: ' + window.GLOBALS.SPRING_LENGTH;

    window.EXPORTS.draw = draw;
    window.EXPORTS.gridPosition = gridPosition;
    window.EXPORTS.randomPosition = randomPosition;

  }); 

}());
