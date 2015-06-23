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

  var v0, v1, v2, v3, v4, v5, v6, v7;
  var vertexID = -1;

  var vcoptions0 = {
    id: vertexID += 1,
    position: APP.vector2D(100, 100), 
    shape: 'rectangle', 
    dimension: { x: 20, y: 20 }
  };
  var vcoptions1 = {
    id: vertexID += 1,
    position: APP.vector2D(200, 200), 
    shape: 'circle', 
    dimension: 10 
  };
  var vcoptions2 = {
    id: vertexID += 1,
    position: APP.vector2D(200, 250),
    shape: 'circle',
    dimension: 30,
  };
  var vcoptions3 = {
    id: vertexID += 1,
    position: APP.vector2D(300, 300),
    shape: 'circle',
    dimension: 20,
    fixed: true
  };
  var vcoptions4 = {
    id: vertexID += 1,
    position: APP.vector2D(270, 270),
    shape: 'circle',
    dimension: 10  
  };
  var vcoptions5 = {
    id: vertexID += 1,
    position: APP.vector2D(400, 500),
    shape: 'circle',
    dimension: 20  
  };
  var vcoptions6 = {
    id: vertexID += 1,
    position: APP.vector2D(300, 500),
    shape: 'circle',
    dimension: 20  
  };
  var vcoptions7 = {
    id: vertexID += 1,
    position: APP.vector2D(200, 500),
    shape: 'circle',
    dimension: 20  
  };
    
  var goptions1 = {
    position: APP.vector2D(300, 300),
    dimension: 50
  }

  v0 = APP.vertex(vcoptions0);
  v1 = APP.vertex(vcoptions1);
  v2 = APP.vertex(vcoptions2);
  v3 = APP.vertex(vcoptions3);
  v4 = APP.vertex(vcoptions4);
  v5 = APP.vertex(vcoptions5);
  v6 = APP.vertex(vcoptions6);
  v7 = APP.vertex(vcoptions7);
  
  c1 = APP.restraint(goptions1, {}); 

  var distanceMat = [];

  APP.dmat = distanceMat;

  for (var i = 0; i < APP.theObject.vertices.length; i++) {
    distanceMat[i] = []; 
    for (var j = 0; j < APP.theObject.vertices.length; j++) {
      distanceMat[i][j] = 0; 
    }
  }

  //Vertex 0
  APP.dmat[0][1] = 1;
  APP.dmat[0][2] = 1;
  APP.dmat[0][3] = 1;
  APP.dmat[0][4] = 2;
  APP.dmat[0][5] = -1;
  APP.dmat[0][6] = -1;
  APP.dmat[0][7] = -1;

  //Vertex 1
  APP.dmat[1][0] = 1;
  APP.dmat[1][2] = 1;
  APP.dmat[1][3] = 2;
  APP.dmat[1][4] = 2;
  APP.dmat[1][5] = -1;
  APP.dmat[1][6] = -1;
  APP.dmat[1][7] = -1;
  
  //Vertex 2
  APP.dmat[2][0] = 1;
  APP.dmat[2][1] = 1;
  APP.dmat[2][3] = 2;
  APP.dmat[2][4] = 1;
  APP.dmat[2][5] = -1;
  APP.dmat[2][6] = -1;
  APP.dmat[2][7] = -1;

  //Vertex 3
  APP.dmat[3][0] = 1;
  APP.dmat[3][1] = 2;
  APP.dmat[3][3] = 2;
  APP.dmat[3][4] = 3;
  APP.dmat[3][5] = -1;
  APP.dmat[3][6] = -1;
  APP.dmat[3][7] = -1;

  //Vertex 4
  APP.dmat[4][0] = 2;
  APP.dmat[4][1] = 2;
  APP.dmat[4][2] = 1;
  APP.dmat[4][3] = 3;
  APP.dmat[4][5] = -1;
  APP.dmat[4][6] = -1;
  APP.dmat[4][7] = -1;
  
  //Vertex 5
  APP.dmat[5][0] = -1;
  APP.dmat[5][1] = -1;
  APP.dmat[5][2] = -1;
  APP.dmat[5][3] = -1;
  APP.dmat[5][4] = -1;
  APP.dmat[5][6] = 1;
  APP.dmat[5][7] = 2;

  //Vertex 5
  APP.dmat[6][0] = -1;
  APP.dmat[6][1] = -1;
  APP.dmat[6][2] = -1;
  APP.dmat[6][3] = -1;
  APP.dmat[6][4] = -1;
  APP.dmat[6][5] = 1;
  APP.dmat[6][7] = 1;

  //Vertex 5
  APP.dmat[7][0] = -1;
  APP.dmat[7][1] = -1;
  APP.dmat[7][2] = -1;
  APP.dmat[7][3] = -1;
  APP.dmat[7][4] = -1;
  APP.dmat[7][5] = 2;
  APP.dmat[7][6] = 1;

  describe('Global', function () {
      it('APP should not be empty', function(){
        chai.assert.notEqual({}, APP);
      });
      //it('should exist eight vertices', function () {
        //chai.assert.equal(8, APP.theObject.vertices.length); 
      //});
  });
  describe('physicsEngine', function () {
    describe('springForce()', function () {
      it('should not fail on dist===0', function () {
        chai.assert.equal(false, isNaN(TEST.springForce(0, 0, 0)));
      }); 
    });
  });

  mocha.checkLeaks();
  mocha.run();

});

