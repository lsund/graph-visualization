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
  var springLength = 100;
  var vertexDistance = 200;
  
  var zeroAllForces = function () {
    for (var i = 0; i < APP.theObject.vertices.length; i++) {
      APP.theObject.vertices[i].zeroForce(); 
    }
  };

  /**
   * This function calculates the repulsion forces over two nodes.
   */
  var calculateRepulsionForce = function (v1, v2, vertexDistance) {
    var repulsingForce, a, b, p1, p2, dx, dy, dist, fx, fy;
    a = (-2 / 3) / vertexDistance;
    b = 4 / 3;
    p1 = v1.getCenter();
    p2 = v2.getCenter();
    dist = util.distance(p1, p2);
    if (dist.abs > vertexDistance * (4/3)) {
      repulsingForce = 0;
    } else {
      repulsingForce = a * dist.abs + b; 
    }
    repulsingForce /= dist.abs;
    fx = dist.x * repulsingForce; 
    fy = dist.y * repulsingForce;
    return { x: fx, y: fy };
  };

  /**
   * This function applies repulsion forces to the nodes.
   * Function is O(V^2)
   */
  var solveRepulsion = function (vertexDistance) {
    var cv1, cv2;

    for (var i = 0; i < APP.theObject.vertices.length - 1; i++) {
      cv1 = APP.theObject.vertices[i]; 
      for (var j = i + 1; j < APP.theObject.vertices.length; j++) {
        cv2 = APP.theObject.vertices[j]; 
        
        var repulsingForce = calculateRepulsionForce(cv1, cv2, vertexDistance);
        cv1.addForce(APP.vector2D(-repulsingForce.x, -repulsingForce.y));
        cv2.addForce(APP.vector2D(repulsingForce.x, repulsingForce.y));
      }
    }
  };


  /**
   * This function calculates the spring force between two nodes.
   */
  var calculateSpringForce = function (b, bondLength) {
    var p1, p2, dx, dy, dist, k, fx, fy;
    p1 = b.first.getCenter();
    p2 = b.second.getCenter();
    dist = util.distance(p1, p2);
    k = 0.05;

    // the 1/distance is so the fx and fy can be 
    // calculated without sine or cosine.
    var springForce = k * (bondLength - dist.abs) / dist.abs;

    fx = dist.x * springForce;
    fy = dist.y * springForce;
    return { x: fx, y: fy };

  };


  var solveSpring = function (springLength) {
    var cb, cv1, cv2;

    for (var i = 0; i < APP.theObject.bonds.length; i++) {
      cb = APP.theObject.bonds[i]; 
      var springForce = calculateSpringForce(cb, springLength);

      cb.first.addForce(APP.vector2D(-springForce.x, -springForce.y));
      cb.second.addForce(APP.vector2D(springForce.x, springForce.y));
    }
  };

  var applyForces = function () {
    zeroAllForces(); 
    solveRepulsion(vertexDistance);
    solveSpring(springLength);
  };

  // Animation ----------------------------------------------------------------
  //
  
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
      applyForces();
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
