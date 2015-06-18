/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : Main   

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

var body = function (options) {

  var that = {};
  that.vertexes = options.vertexes || [];
  that.bonds = options.bonds || [];
  
  return that;
}

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
}

var zeroAllForces = function () {
  for (var i = 0; i < APP.vertices.length; i++) {
    APP.vertices[i].zeroForce(); 
  }
};

// Function is O(V^2)
var solveRepulsion = function (options) {

  var cv1, cv2, nodeDistance;

  nodeDistance = options.nodeDistance;
  zeroAllForces(); 

  for (var i = 0; i < APP.vertices.length - 1; i++) {
    cv1 = APP.vertices[i]; 
    for (var j = i + 1; j < APP.vertices.length; j++) {
      cv2 = APP.vertices[j]; 
      var a = (-2 / 3) / nodeDistance;
      var b = 4 / 3;
      var p1 = cv1.getCenter();
      var p2 = cv2.getCenter();
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > nodeDistance * (4/3)) {
        repulsingForce = 0;
      } else {
        var repulsingForce = a * dist + b; 
      }

      repulsingForce /= dist;
      var fx = dx * repulsingForce; 
      var fy = dy * repulsingForce;
      cv1.addForce(APP.vector2D(-fx, -fy));
      cv2.addForce(APP.vector2D(fx, fy));
    }
  }
}

// Animation ------------------------------------------------------------------

setInterval(function () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawVertex(v1);
  drawVertex(v2);
  drawVertex(v3);
  drawBond(b1);
  drawBond(b2);
  drawBond(b3);
  solveRepulsion({ nodeDistance : 200 });
  v1.move();
  v2.move();
  v3.move();

}, 50);

