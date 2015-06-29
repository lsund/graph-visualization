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
    res.status('200').send('200', string);
  });

  server.listen('1337', 'localhost');


}());
