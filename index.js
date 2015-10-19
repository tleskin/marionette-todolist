var express = require('express'),
    app     = express(),
    path    = require('path'),
    http    = require('http');

app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
                 .listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });
