/*****************************************************************************

* Author: Ludvig Sundström

* File Name: server.js

* Description: 

* Creation Date: 28-06-2015


*****************************************************************************/

/* jshint browser: false, node: true */

(function () {

  'use strict';

  var http, fs, url, express, app, path, server;

  http = require('http');
  fs = require('fs');
  url = require('url');
  express = require('express');
  path = require('path');

  app = express();

  server = http.Server(app);

  app.use(express.static(path.join(__dirname)));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'mocha.html'));
  });
  
  app.get('/getstring', function (req, res) {
    var string = 'Hello world';
    res.status('200').send(string);
  });

  var streamData2 = function () {

    var stream = fs.createReadStream('../../data/dimt.csv');

    var mat = [];
    var arr = [];
    var chunk = '';

    stream.on('readable', function () {
      var bte;
      while (null !== (bte = stream.read(1))) {
        var c = bte.toString('utf8');
        chunk += c;
        if (c === ',') {
          arr.push(parseFloat(chunk));
          chunk = '';
        } else if (c === '\n') {
          mat.push(arr);
          arr = [];
        }
      }
    });

    stream.on('error', function () {
      throw 'There was an error streaming data';
    });

    stream.on('end', function () {
      console.log(mat.length);
      process.exit();
    });

  };

  var streamData = function () {

    var ret = [];
    
    var Transform = require('stream').Transform; 
    
    //var csv = require('csv-streamify');
    //var JSONStream = require('JSONStream');
    //var csvToJson = csv({ objectMode: true });
    var parser = new Transform({ objectMode: true });

    parser._transform = function (data, encoding, done) {
      this.push(data);
      done();
    };


    //var jsonToStrings = JSONStream.stringify(false);

    process.stdin
      //.pipe(csvToJson)
      .pipe(parser)
      //.pipe(jsonToStrings)
      .pipe(process.stdout);

    process.stdout.on('error', process.exit);
    
    console.log(ret);
  };

  streamData();

  server.listen('1337', 'localhost');

}());
