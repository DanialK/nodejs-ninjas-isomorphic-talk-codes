'use strict';

require('babel/register')(); /* to compile our jsx files required in server*/

var express = require('express');
var http = require('http');
var swig = require('swig');
var React = require('react');

var app = express();

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', './views');
app.use(express.static('./public'));

/* requireing out component */
var AwesomeComponent = require('./client/components/awesome.jsx');

app.use(function (req, res, next) {
	var html = React.renderToString(
		React.createElement(AwesomeComponent)
	);
	res.render('layout', { html: html });
});


http.createServer(app).listen(3000, function () {
	console.log('Listening on port : 3000'); 
});

module.exports = app;
