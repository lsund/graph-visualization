/*****************************************************************************

* Author : Ludvig Sundström

* File Name : test.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

// options: 
// ID
// position 
// shape 
// dimension

document.addEventListener('DOMContentLoaded', function (e) {
  
  window.TEST = window.TEST || {};
  window.OBJECT = window.OBJECT || {};
  window.DATA = window.DATA || {};


  APP.useSet0();

  //describe('Global', function () {
      //it('APP should not be empty', function(){
        //chai.assert.notEqual({}, APP);
      //});
  //});
  //describe('physicsEngine', function () {
    //describe('springForce()', function () {
      //it('should not fail on dist===0', function () {
        //chai.assert.equal(false, isNaN(TEST.springForce(0, 0, 0)));
      //}); 
    //});
  //});

  mocha.checkLeaks();
  mocha.run();
  
});

