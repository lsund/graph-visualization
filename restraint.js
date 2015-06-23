/*****************************************************************************

* Author : Ludvig Sundström

* File Name : restraint.js

* Purpose : 

* Creation Date : 22-06-2015

* Last Modified : 

*****************************************************************************/

document.addEventListener('DOMContentLoaded', function (e) {
  
  window.APP = window.APP || {};

  APP.restraint = function (options) {

    var that = {};

    that = APP.graphObject(options);
    
    that.shape = 'rectangle';
    that.fixed = 'true';

    APP.theObject.restraints.push(that);
    return that;

  }

});
