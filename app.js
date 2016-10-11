
var ref        = require('ref');
var express    = require('express');
var fs         = require('fs');
var ffi        = require('ffi');
var path       = require('path');

var librarypath = 'lib/libminimizer.so';
var fname = 'data/test25.json';
var port = 3000;
var hostname = '127.0.0.1'; 

var run_minimizer = function (callback) {
    fs.readFile(path.join(__dirname, fname), function (err, data) {
        if (err) {
            console.log('Could not read file: ' + fname); 
            throw err; 
        }
        var json_data    = JSON.parse(data.toString());
        var nv           = json_data.vertices.length;
        var type = {
            size: 1000,
            indirection: 1,
            get: function (buffer, offset) {
                return buffer.readFloatLE(offset);
            },
            set: function (buffer, offset, value) {
            }
        };
        var ptr = ref.refType(type);
        var buf          = ref.alloc(type);
        var libminimizer = ffi.Library(librarypath, {
        'Minimizer_run': [ 'void', [ 'string', ptr ] ]
        });
        var floatsize = ref.alloc('float').length;

        libminimizer.Minimizer_run(fname, buf);
        
        var points = [];

        for (var i = 0; i < nv * 2; i += 2) {
            var point = {
                x: ref.get(buf, floatsize * i),
                y: ref.get(buf, floatsize * (i + 1)),
            }
            points.push(point);
        }
        callback({ points: points, bonds: json_data.bonds });
    });
};

var app = express();

app.use('/', express.static(path.join(__dirname + '/vis')));
app.set('views', __dirname + '/vis');
app.listen(3000, function() { 
    console.log('listening!')
});

app.get('/', function(req, res) {
    console.log('requested /'); 
    var points = run_minimizer(function (result) {
        var response_data = { 
            data : { 
                points: result.points,
                bonds: result.bonds 
            } 
        }
        res.render('index.pug', response_data);
    });
});

