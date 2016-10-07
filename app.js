
var express = require('express');
var fs = require('fs');
var ffi = require('ffi');
var path = require('path');
var bodyparser = require('body-parser');

var librarypath = '/home/lsund/Projects/graph-visualization/lib/libminimizer.so'
var port = 3000;
var hostname = '127.0.0.1'; 

var libminimizer = ffi.Library(librarypath, {
  'Minimizer_test': [ 'int', [ 'int' ] ]
});

console.log(libminimizer.Minimizer_test(3));

fs.readFile( __dirname + '/data/data.json', function (err, data) {
  if (err) {
    throw err; 
  }
});

var app = express();

app.use('/', express.static(path.join(__dirname + '/visualizer')));
app.set('views', __dirname + '/visualizer');
app.listen(3000, function() { 
    console.log('listening!')
});

app.get('/', function(req, res) {
    console.log('requested /'); 
    res.render('index.pug');
});
