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

document.addEventListener('DOMContentLoaded', function (e) {

  window.APP = window.APP || {};

  var v1, v2, v3, v4, v5;

  APP.theObject = APP.body({});

  var vcoptions1 = {
    center: APP.vector2D(0, 0), 
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
  var vcoptions4 = {
    center: APP.vector2D(600, 300),
    shape: 'circle',
    dimensions: 20  
  };
  var vcoptions5 = {
    center: APP.vector2D(400, 600),
    shape: 'circle',
    dimensions: 20  
  };
  v1 = APP.vertex(vcoptions1);
  v2 = APP.vertex(vcoptions2);
  v3 = APP.vertex(vcoptions3);
  v4 = APP.vertex(vcoptions4);
  v5 = APP.vertex(vcoptions5);

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
  var boptions4 = {
    first: v1, 
    second: v4
  }
  var boptions5 = {
    first: v3, 
    second: v5
  }

  APP.bond(boptions1);
  APP.bond(boptions2);
  APP.bond(boptions3);
  APP.bond(boptions4);
  APP.bond(boptions5);

  describe('Global', function () {

    it('APP should not be empty', function(){
      chai.assert.notEqual({}, APP);
    });

    it('should exist three vertices and three bonds', function () {
      chai.assert.equal(5, APP.body.vertices.length); 
      chai.assert.equal(5, APP.body.bonds.length); 
    });
  });
});

