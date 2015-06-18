/*****************************************************************************

* Author : Ludvig Sundström

* File Name : test.js

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

APP.vertices = [];
APP.bonds = [];

var vcoptions1 = {
  center: APP.vector2D(350, 300), 
  shape: 'circle', 
  dimensions: 20,
  force: APP.vector2D(10, 10)
};
var vcoptions2 = {
  center: APP.vector2D(300, 300), 
  shape: 'circle', 
  dimensions: 20 
};
var vcoptions3 = {
  center: APP.vector2D(330, 400),
  shape: 'circle',
  dimensions: 20  
};
v1 = APP.vertex(vcoptions1);
v2 = APP.vertex(vcoptions2);
v3 = APP.vertex(vcoptions3);

var boptions1 = {
  first: v1, 
  second: v2
}
var boptions2 = {
  first: v2, 
  second: v3
}
var boptions3 = {
  first: v1, 
  second: v3
}

b1 = APP.bond(boptions1);
b2 = APP.bond(boptions2);
b3 = APP.bond(boptions3);

describe('Global', function () {

  it('APP should not be empty', function(){
    chai.assert.notEqual({}, APP);
  });

  it('should exist three vertices and three bonds', function () {
    chai.assert.equal(3, APP.vertices.length); 
    chai.assert.equal(3, APP.bonds.length); 
  });
  
});


