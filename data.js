/*****************************************************************************

* Author : Ludvig Sundström

* File Name : data.js

* Purpose : 

* Creation Date : 24-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.DATA = window.DATA || {};

  var vertexID = -1;

  var vcoptions0 = {
    id: vertexID += 1,
    position: APP.vector2D(350, 150), 
    shape: 'circle', 
    dimension: 20
  };
  var vcoptions1 = {
    id: vertexID += 1,
    position: APP.vector2D(200, 220), 
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
    
  var distanceMatrix0 = [];
  var distanceMatrix1 = [];

  var nvs = vertexID + 1;
  for (var i = 0; i < nvs; i++) {
    distanceMatrix0[i] = []; 
    for (var j = 0; j < nvs; j++) {
      distanceMatrix0[i][j] = 0; 
    }
  }

  var nvs = 3;
  for (var i = 0; i < nvs; i++) {
    distanceMatrix1[i] = []; 
    for (var j = 0; j < nvs; j++) {
      distanceMatrix1[i][j] = 0; 
    }
  }

  //Vertex 0
  distanceMatrix0[0][1] = 1;
  distanceMatrix0[0][2] = 1;
  distanceMatrix0[0][3] = 1;
  distanceMatrix0[0][4] = 2;
  distanceMatrix0[0][5] = -1;
  distanceMatrix0[0][6] = -1;
  distanceMatrix0[0][7] = -1;

  //Vertex 1
  distanceMatrix0[1][0] = 1;
  distanceMatrix0[1][2] = 1;
  distanceMatrix0[1][3] = 2;
  distanceMatrix0[1][4] = 2;
  distanceMatrix0[1][5] = -1;
  distanceMatrix0[1][6] = -1;
  distanceMatrix0[1][7] = -1;
  
  //Vertex 2
  distanceMatrix0[2][0] = 1;
  distanceMatrix0[2][1] = 1;
  distanceMatrix0[2][3] = 2;
  distanceMatrix0[2][4] = 1;
  distanceMatrix0[2][5] = -1;
  distanceMatrix0[2][6] = -1;
  distanceMatrix0[2][7] = -1;

  //Vertex 3
  distanceMatrix0[3][0] = 1;
  distanceMatrix0[3][1] = 2;
  distanceMatrix0[3][3] = 2;
  distanceMatrix0[3][4] = 3;
  distanceMatrix0[3][5] = -1;
  distanceMatrix0[3][6] = -1;
  distanceMatrix0[3][7] = -1;

  //Vertex 4
  distanceMatrix0[4][0] = 2;
  distanceMatrix0[4][1] = 2;
  distanceMatrix0[4][2] = 1;
  distanceMatrix0[4][3] = 3;
  distanceMatrix0[4][5] = -1;
  distanceMatrix0[4][6] = -1;
  distanceMatrix0[4][7] = -1;
  
  //Vertex 5
  distanceMatrix0[5][0] = -1;
  distanceMatrix0[5][1] = -1;
  distanceMatrix0[5][2] = -1;
  distanceMatrix0[5][3] = -1;
  distanceMatrix0[5][4] = -1;
  distanceMatrix0[5][6] = 1;
  distanceMatrix0[5][7] = 2;

  //Vertex 6
  distanceMatrix0[6][0] = -1;
  distanceMatrix0[6][1] = -1;
  distanceMatrix0[6][2] = -1;
  distanceMatrix0[6][3] = -1;
  distanceMatrix0[6][4] = -1;
  distanceMatrix0[6][5] = 1;
  distanceMatrix0[6][7] = 1;

  //Vertex 7
  distanceMatrix0[7][0] = -1;
  distanceMatrix0[7][1] = -1;
  distanceMatrix0[7][2] = -1;
  distanceMatrix0[7][3] = -1;
  distanceMatrix0[7][4] = -1;
  distanceMatrix0[7][5] = 2;
  distanceMatrix0[7][6] = 1;
  
  distanceMatrix1[0][1] = 1;
  distanceMatrix1[0][2] = 1;

  distanceMatrix1[1][0] = 1;
  distanceMatrix1[1][2] = 1;

  distanceMatrix1[2][0] = 1;
  distanceMatrix1[2][1] = 1;

   DATA.vopts0 = 
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
  
   DATA.vopts1 = 
    [
      vcoptions0,
      vcoptions1,
      vcoptions2
    ];

  DATA.dmat0 = distanceMatrix0;
  DATA.dmat1 = distanceMatrix1;

});
