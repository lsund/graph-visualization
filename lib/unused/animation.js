/*****************************************************************************

* Author: Ludvig Sundström

* File Name: animation.js

* Description: Animation   

* Creation Date: 17-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

  var refreshIntervalID;
  
  // Moving animation ---------------------------------------------------------

    window.APP.startAnimation = function () {
      var vs = window.OBJECT.body.getVertices();
      refreshIntervalID = setInterval(function () {
        window.APP.draw();
        window.OBJECT.body.getVertices().forEach(function (v) {
          if (!v.fixed) { 
            v.move();
          }
        });
        window.OBJECT.head.physicsEngine.applyForces();
        for (var i = 0; i < vs.length; i += 1) {
          var v = vs[i];  
          v.accelerate();
        }
      }, window.APP.ANIMATION_TICK);
    };
    
    window.APP.stopAnimation = function () { 
      clearInterval(refreshIntervalID);
    };
  // --------------------------------------------------------------------------

  }); 

}());
