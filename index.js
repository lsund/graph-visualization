/*****************************************************************************

* Author : Ludvig Sundström

* File Name : index.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

// options: 
// ID
// center 
// shape 
// dimensions

window.APP = window.APP || {};

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

var id = 0;

var vcoptions1 = {
  center: APP.point(100, 50), 
  shape: 'circle', 
  dimensions: 20
};
var vcoptions2 = {
  center: APP.point(200, 50), 
  shape: 'circle', 
  dimensions: 20 
};
var vroptions1 = {
  center: APP.point(300, 50),
  shape: 'rectangle',
  dimensions: { w: 40, h: 40 }  
};

var v1 = APP.vertex(vcoptions1);
var v2 = APP.vertex(vcoptions2);
var v3 = APP.vertex(vroptions1); 

var boptions1 = {
  first: v1, 
  second: v2
}

var b1 = APP.bond(boptions1);

var body = function (options) {

  var that = {};
  that.vertexes = options.vertexes || [];
  that.bonds = options.bonds || [];
  
  return that;
}

var drawVertex = function (v) {
  ctx.fillStyle = v.color;
  var centerx = v.center.x;
  var centery = v.center.y;
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
  ctx.moveTo(b.first.center.x, b.first.center.y);
  ctx.lineTo(b.second.center.x, b.second.center.y);
  ctx.stroke();
}

drawVertex(v1);
drawVertex(v2);
drawVertex(v3);
drawBond(b1);


var objective = function (map) {
  return -99; 
}

try {
} catch(e) {
  console.log('Error: ' + e);
}

