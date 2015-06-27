/*****************************************************************************

* Author : Ludvig Sundström

* File Name : bond.js

* Purpose : Describes a bond 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {

  window.OBJECT = window.OBJECT || {};
  window.PHYSICS = window.PHYSICS || {};

  APP.bond = function (options) {

    var bond = {};    

    bond.first = options.first; 
    bond.second = options.second;
    bond.color =  options.color || 'blue';
    bond.type = options.type || 'r'; 
    
    return bond;

  };

});
