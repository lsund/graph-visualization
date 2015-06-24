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
  window.OBJECT = window.OBJECT || {};

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
    
  var verticeOpts = 
    [
      vcoptions0,
      vcoptions1,
      vcoptions2,
      vcoptions3,
      vcoptions4,
      vcoptions5,
      vcoptions6,
      vcoptions7
    ];
  
  var distanceMatrix = [];

  var nvs = verticeOpts.length;
  for (var i = 0; i < nvs; i++) {
    distanceMatrix[i] = []; 
    for (var j = 0; j < nvs; j++) {
      distanceMatrix[i][j] = 0; 
    }
  }

  //Vertex 0
  distanceMatrix[0][1] = 1;
  distanceMatrix[0][2] = 1;
  distanceMatrix[0][3] = 1;
  distanceMatrix[0][4] = 2;
  distanceMatrix[0][5] = -1;
  distanceMatrix[0][6] = -1;
  distanceMatrix[0][7] = -1;

  //Vertex 1
  distanceMatrix[1][0] = 1;
  distanceMatrix[1][2] = 1;
  distanceMatrix[1][3] = 2;
  distanceMatrix[1][4] = 2;
  distanceMatrix[1][5] = -1;
  distanceMatrix[1][6] = -1;
  distanceMatrix[1][7] = -1;
  
  //Vertex 2
  distanceMatrix[2][0] = 1;
  distanceMatrix[2][1] = 1;
  distanceMatrix[2][3] = 2;
  distanceMatrix[2][4] = 1;
  distanceMatrix[2][5] = -1;
  distanceMatrix[2][6] = -1;
  distanceMatrix[2][7] = -1;

  //Vertex 3
  distanceMatrix[3][0] = 1;
  distanceMatrix[3][1] = 2;
  distanceMatrix[3][3] = 2;
  distanceMatrix[3][4] = 3;
  distanceMatrix[3][5] = -1;
  distanceMatrix[3][6] = -1;
  distanceMatrix[3][7] = -1;

  //Vertex 4
  distanceMatrix[4][0] = 2;
  distanceMatrix[4][1] = 2;
  distanceMatrix[4][2] = 1;
  distanceMatrix[4][3] = 3;
  distanceMatrix[4][5] = -1;
  distanceMatrix[4][6] = -1;
  distanceMatrix[4][7] = -1;
  
  //Vertex 5
  distanceMatrix[5][0] = -1;
  distanceMatrix[5][1] = -1;
  distanceMatrix[5][2] = -1;
  distanceMatrix[5][3] = -1;
  distanceMatrix[5][4] = -1;
  distanceMatrix[5][6] = 1;
  distanceMatrix[5][7] = 2;

  //Vertex 6
  distanceMatrix[6][0] = -1;
  distanceMatrix[6][1] = -1;
  distanceMatrix[6][2] = -1;
  distanceMatrix[6][3] = -1;
  distanceMatrix[6][4] = -1;
  distanceMatrix[6][5] = 1;
  distanceMatrix[6][7] = 1;

  //Vertex 7
  distanceMatrix[7][0] = -1;
  distanceMatrix[7][1] = -1;
  distanceMatrix[7][2] = -1;
  distanceMatrix[7][3] = -1;
  distanceMatrix[7][4] = -1;
  distanceMatrix[7][5] = 2;
  distanceMatrix[7][6] = 1;

  OBJECT.head = APP.head({});
  OBJECT.body = APP.body({});
  OBJECT.body.initialize(verticeOpts, distanceMatrix);

  describe('Global', function () {
      it('APP should not be empty', function(){
        chai.assert.notEqual({}, APP);
      });
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

