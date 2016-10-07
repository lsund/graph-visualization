
var fs = require('fs');
var ffi = require('ffi');

var librarypath = '/home/lsund/Projects/graph-visualization/lib/libminimizer.so'

var libminimizer = ffi.Library(librarypath, {
  'Minimizer_test': [ 'int', [ 'int' ] ]
});

console.log(libminimizer.Minimizer_test(3));

fs.readFile( __dirname + '/data/data.json', function (err, data) {
  if (err) {
    throw err; 
  }
  //console.log(data.toString());
});
