/*****************************************************************************

* Author : Ludvig Sundström

* File Name : test.js

* Purpose : 

* Creation Date : 17-06-2015

* Last Modified : 

*****************************************************************************/

var assert = require("assert")

describe('Objective', function(){

  var index = require('../index.js');
  describe('#objective()', function(){
    it('Should return a value > 0', function(){
      assert(index.objective(5, 5) > 0);
    });
  });
});
