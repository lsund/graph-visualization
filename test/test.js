/*****************************************************************************

* Author : Ludvig Sundström

* File Name : test.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

// options: 
// ID
// position 
// shape 
// dimension

document.addEventListener('DOMContentLoaded', function (e) {

  window.TEST = window.TEST || {};
  window.APP = window.APP || {};

  var v1, v2, v3, v4, v5, v6, v7, v8;
  var vertexID = 1;

  APP.theObject = APP.body({});

  var vcoptions1 = {
    id: vertexID++,
    position: APP.vector2D(100, 100), 
    shape: 'circle', 
    dimension: 20,
    force: APP.vector2D(10, 10)
  };
  var vcoptions2 = {
    id: vertexID++,
    position: APP.vector2D(200, 200), 
    shape: 'circle', 
    dimension: 10 
  };
  var vcoptions3 = {
    id: vertexID++,
    position: APP.vector2D(200, 250),
    shape: 'circle',
    dimension: 30  
  };
  var vcoptions4 = {
    id: vertexID++,
    position: APP.vector2D(300, 300),
    shape: 'circle',
    dimension: 20  
  };
  var vcoptions5 = {
    id: vertexID++,
    position: APP.vector2D(270, 270),
    shape: 'circle',
    dimension: 10  
  };
  var vcoptions6 = {
    id: vertexID++,
    position: APP.vector2D(400, 500),
    shape: 'circle',
    dimension: 20  
  };
  var vcoptions7 = {
    id: vertexID++,
    position: APP.vector2D(300, 500),
    shape: 'circle',
    dimension: 20  
  };
  var vcoptions8 = {
    id: vertexID++,
    position: APP.vector2D(200, 500),
    shape: 'circle',
    dimension: 20  
  };
  v1 = APP.vertex(vcoptions1);
  v2 = APP.vertex(vcoptions2);
  v3 = APP.vertex(vcoptions3);
  v4 = APP.vertex(vcoptions4);
  v5 = APP.vertex(vcoptions5);

  v6 = APP.vertex(vcoptions6);
  v7 = APP.vertex(vcoptions7);
  v8 = APP.vertex(vcoptions8);

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
  var boptions6 = {
    first: v6, 
    second: v7
  }
  var boptions7 = {
    first: v7, 
    second: v8
  }

  b1 = APP.bond(boptions1);
  b2 = APP.bond(boptions2);
  b3 = APP.bond(boptions3);
  b4 = APP.bond(boptions4);
  b5 = APP.bond(boptions5);
  b6 = APP.bond(boptions6);
  b7 = APP.bond(boptions7);
  
  describe('Global', function () {
      it('APP should not be empty', function(){
        chai.assert.notEqual({}, APP);
      });
      it('should exist eight vertices and seven bonds', function () {
        chai.assert.equal(8, APP.theObject.vertices.length); 
        chai.assert.equal(7, APP.theObject.bonds.length); 
      });
  });
  describe('physicsEngine', function () {
    describe('springForce()', function () {
      it('should not fail on dist===0', function () {
        chai.assert.equal(false, isNaN(TEST.springForce(0, 0)));
      }); 
    });
    describe('repulsionForce()', function () {
      it('should not fail on dist===0', function () {
        chai.assert.equal(false, isNaN(TEST.repulsionForce(0, 0, 0)));
      }); 
    });
  });

  mocha.checkLeaks();
  mocha.run();

});

