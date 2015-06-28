/*****************************************************************************

* Author : Ludvig Sundström

* File Name : data.js

* Purpose : 

* Creation Date : 24-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.window.DATA = window.window.DATA || {};

    var vertexID = -1;
    var clusterDist = 2;

    var vcoptions0 = {
      id: vertexID += 1,
      position: window.APP.vector2D(200, 400), 
      shape: 'circle', 
      dimension: 40
    };
    var vcoptions1 = {
      id: vertexID += 1,
      position: window.APP.vector2D(300, 500), 
      shape: 'circle', 
      dimension: 20 
    };
    var vcoptions2 = {
      id: vertexID += 1,
      position: window.APP.vector2D(800, 0),
      shape: 'circle',
      dimension: 10,
    };
    var vcoptions3 = {
      id: vertexID += 1,
      position: window.APP.vector2D(0, 400),
      shape: 'circle',
      dimension: 10
    };
    var vcoptions4 = {
      id: vertexID += 1,
      position: window.APP.vector2D(400, 400),
      shape: 'circle',
      dimension: 10  
    };
    var vcoptions5 = {
      id: vertexID += 1,
      position: window.APP.vector2D(800, 400),
      shape: 'circle',
      dimension: 20  
    };
    var vcoptions6 = {
      id: vertexID += 1,
      position: window.APP.vector2D(0, 800),
      shape: 'circle',
      dimension: 20  
    };
    var vcoptions7 = {
      id: vertexID += 1,
      position: window.APP.vector2D(400, 800),
      shape: 'circle',
      dimension: 20  
    };
      
    var distanceMatrix0 = [];
    var distanceMatrix1 = [];
    var distanceMatrix2 = [];

    var nvs = vertexID + 1;
    var i = 0;
    var j = 0;

    for (i = 0; i < nvs; i += 1) {
      distanceMatrix0[i] = []; 
      for (j = 0; j < nvs; j += 1) {
        distanceMatrix0[i][j] = 0; 
      }
    }

    nvs = 3;
    for (i = 0; i < nvs; i += 1) {
      distanceMatrix1[i] = []; 
      for (j = 0; j < nvs; j += 1) {
        distanceMatrix1[i][j] = 0; 
      }
    }

    nvs = 2;
    for (i = 0; i < nvs; i += 1) {
      distanceMatrix2[i] = []; 
      for (j = 0; j < nvs; j += 1) {
        distanceMatrix2[i][j] = 0; 
      }
    }

    //Vertex 0
    distanceMatrix0[0][1] = 1;
    distanceMatrix0[0][2] = 1;
    distanceMatrix0[0][3] = 1;
    distanceMatrix0[0][4] = 2;
    distanceMatrix0[0][5] = clusterDist;
    distanceMatrix0[0][6] = clusterDist;
    distanceMatrix0[0][7] = clusterDist;

    //Vertex 1
    distanceMatrix0[1][0] = 1;
    distanceMatrix0[1][2] = 1;
    distanceMatrix0[1][3] = 2;
    distanceMatrix0[1][4] = 2;
    distanceMatrix0[1][5] = clusterDist;
    distanceMatrix0[1][6] = clusterDist;
    distanceMatrix0[1][7] = clusterDist;
    
    //Vertex 2
    distanceMatrix0[2][0] = 1;
    distanceMatrix0[2][1] = 1;
    distanceMatrix0[2][3] = 2;
    distanceMatrix0[2][4] = 1;
    distanceMatrix0[2][5] = clusterDist;
    distanceMatrix0[2][6] = clusterDist;
    distanceMatrix0[2][7] = clusterDist;

    //Vertex 3
    distanceMatrix0[3][0] = 1;
    distanceMatrix0[3][1] = 2;
    distanceMatrix0[3][3] = 2;
    distanceMatrix0[3][4] = 3;
    distanceMatrix0[3][5] = clusterDist;
    distanceMatrix0[3][6] = clusterDist;
    distanceMatrix0[3][7] = clusterDist;

    //Vertex 4
    distanceMatrix0[4][0] = 2;
    distanceMatrix0[4][1] = 2;
    distanceMatrix0[4][2] = 1;
    distanceMatrix0[4][3] = 3;
    distanceMatrix0[4][5] = clusterDist;
    distanceMatrix0[4][6] = clusterDist;
    distanceMatrix0[4][7] = clusterDist;
    
    //Vertex 5
    distanceMatrix0[5][0] = clusterDist;
    distanceMatrix0[5][1] = clusterDist;
    distanceMatrix0[5][2] = clusterDist;
    distanceMatrix0[5][3] = clusterDist;
    distanceMatrix0[5][4] = clusterDist;
    distanceMatrix0[5][6] = 1;
    distanceMatrix0[5][7] = 2;

    //Vertex 6
    distanceMatrix0[6][0] = clusterDist;
    distanceMatrix0[6][1] = clusterDist;
    distanceMatrix0[6][2] = clusterDist;
    distanceMatrix0[6][3] = clusterDist;
    distanceMatrix0[6][4] = clusterDist;
    distanceMatrix0[6][5] = 1;
    distanceMatrix0[6][7] = 1;

    //Vertex 7
    distanceMatrix0[7][0] = clusterDist;
    distanceMatrix0[7][1] = clusterDist;
    distanceMatrix0[7][2] = clusterDist;
    distanceMatrix0[7][3] = clusterDist;
    distanceMatrix0[7][4] = clusterDist;
    distanceMatrix0[7][5] = 2;
    distanceMatrix0[7][6] = 1;
    
    distanceMatrix1[0][1] = 1;
    distanceMatrix1[0][2] = 1;

    distanceMatrix1[1][0] = 1;
    distanceMatrix1[1][2] = 1;

    distanceMatrix1[2][0] = 1;
    distanceMatrix1[2][1] = 1;

    distanceMatrix2[0][1] = 1;
    distanceMatrix2[1][0] = 1;

     window.DATA.vopts0 = 
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
    
     window.DATA.vopts1 = 
      [
        vcoptions0,
        vcoptions1,
        vcoptions2
      ];

     window.DATA.vopts2 = 
      [
        vcoptions0,
        vcoptions1,
      ];

    window.DATA.dmat0 = distanceMatrix0;
    window.DATA.dmat1 = distanceMatrix1;
    window.DATA.dmat2 = distanceMatrix2;

  });

}());
