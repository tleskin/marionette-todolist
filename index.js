var express = require('express'),
    app     = express(),
    path    = require('path');

app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(4000);
console.log('Visit the app at http://localhost:4000!');
