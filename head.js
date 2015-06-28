/*****************************************************************************

* Author : Ludvig Sundström

* File Name : head.js

* Purpose : 

* Creation Date : 24-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

  window.APP = window.APP || {};

    window.APP.head = function () {
      var obj = {};
      obj.physicsEngine = window.APP.physicsEngine;
      return obj;
    };

  });

}());
