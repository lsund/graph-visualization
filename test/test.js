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
  
  var dmat = DATA.dmat1;
  var vopts = DATA.vopts1;


  OBJECT.head = APP.head({});
  OBJECT.body = APP.body({});
  OBJECT.body.initialize(vopts, dmat);

  var flatDmat = [];  
  flatDmat = flatDmat.concat.apply(flatDmat, dmat);
  var flatPositions = OBJECT.body.verticePositions();

  describe('Global', function () {
      it('APP should not be empty', function(){
        chai.assert.notEqual({}, APP);
      });
  });
  describe('physicsEngine', function () {
    describe('springForce()', function () {
      it('should not fail on dist===0', function () {
        chai.assert.equal(false, isNaN(TEST.springForce(0, 0, 0)));
      }); 
    });
  });

  mocha.checkLeaks();
  mocha.run();
  
  APP.testMinimize = function () {
    // Emscripten interaction  ------------------------------------------------

    var flatPositions = OBJECT.body.verticePositions();

    // Import function from Emscripten generated file
    var minimize = Module.cwrap(
      'minimize', 'number', ['number', 'number', 'number']
    );

    // Create example data to test float_multiply_array
    var data = new Float32Array(flatPositions);
    var data2 = new Float32Array(flatDmat);

    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    var nDataBytes2 = data2.length * data2.BYTES_PER_ELEMENT;
    var dataPtr = Module._malloc(nDataBytes);
    var dataPtr2 = Module._malloc(nDataBytes2);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
    var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
    var dataHeap2 = new Uint8Array(Module.HEAPU8.buffer, dataPtr2, nDataBytes2);
    dataHeap.set(new Uint8Array(data.buffer));
    dataHeap2.set(new Uint8Array(data2.buffer));
    // Call function and get result
    minimize(dataHeap.byteOffset, dataHeap2.byteOffset, data.length);
    //var result = new Float32Array(dataHeap.buffer, dataHeap.byteOffset, 
      //data.length);
    //var result2 = new Float32Array(dataHeap2.buffer, dataHeap2.byteOffset, 
      //data2.length);

    // Free memory
    Module._free(dataHeap.byteOffset);
    
    // ------------------------------------------------------------------------
  };

});

