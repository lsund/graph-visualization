
var fs = require('fs');

fs.readFile( __dirname + '/data/data.json', function (err, data) {
  if (err) {
    throw err; 
  }
  console.log(data.toString());
});
