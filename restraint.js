/*****************************************************************************

* Author: Ludvig Sundström

* File Name: restraint.js

* Description: 

* Creation Date: 22-06-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    
    window.APP = window.APP || {};

    window.APP.restraint = function (options) {

      var that = {};

      that = window.APP.graphObject(options);
      
      that.shape = 'rectangle';
      that.fixed = 'true';

      window.OBJECT.body.restraints.push(that);
      return that;

    };

  });

}());
