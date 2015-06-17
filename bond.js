/*****************************************************************************

* Author : Ludvig Sundström

* File Name : edge.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

APP.bond = function (options) {

  var that = {};    
  that.first = options.first; 
  that.second = options.second;
  
  that.first.attachBond(that); 
  that.second.attachBond(that); 

  return that;

}
