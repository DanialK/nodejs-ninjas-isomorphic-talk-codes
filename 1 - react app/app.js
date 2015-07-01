'use strict';

var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('./public'));

http.createServer(app).listen(3000, function () {
	console.log('Listening on port : 3000'); 
});

module.exports = app;
