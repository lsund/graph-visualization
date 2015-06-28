/*****************************************************************************

* Author : Ludvig Sundström

* File Name : obj.js

* Purpose : Describes a obj 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.APP = window.APP || {};

    window.APP.bond = function (options) {

      var obj = {};    

      obj.first = options.first; 
      obj.second = options.second;
      obj.color =  options.color || 'blue';
      obj.type = options.type || 'r'; 
      
      return obj;

    };
  });

}());
