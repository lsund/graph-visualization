/*****************************************************************************

* Author: Ludvig Sundström

* File Name: util.js

* Description: Utilities

* Creation Date: 03-07-2015

*****************************************************************************/

(function () {

  'use strict';

  window.EXPORTS = window.EXPORTS || {};
  window.OBJECT = window.OBJECT || {};

  function readSizes(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, true);
    rawFile.setRequestHeader('Content-type', 'application/json');
    rawFile.overrideMimeType('application/json');
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status === 0) {
          var ret = rawFile.responseText;
          window.OBJECT.body.dmtsizes = JSON.parse(ret); 
          callback();
        }
      }
    };
    rawFile.send(null);
  }

  window.EXPORTS.readSizes = readSizes;

}());

