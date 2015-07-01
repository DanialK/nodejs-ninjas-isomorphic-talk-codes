'use strict';

require('babel/register')(); /* to compile our jsx files required in server*/

var express = require('express');
var http = require('http');
var swig = require('swig');
var React = require('react');
var Iso = require('iso');

var app = express();

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', './views');
app.use(express.static('./public'));

var App = require('./client/App.jsx');

var sessionUser = {
	name : 'Danial'
};

var clicksCount = 0;

app.post('/click', function (req, res) {
	clicksCount++; 
	res.status(200).send({clicksCount: clicksCount});
});

app.use(function (req, res, next) {
	var iso = new Iso();

	var state = {
		user: sessionUser,
		clicksCount: clicksCount
	};

	var html = React.renderToString(
		React.createElement(App, state)
	);
	
	iso.add(html, state);

	res.render('layout', { html: iso.render() });
});


http.createServer(app).listen(3000, function () {
	console.log('Listening on port : 3000'); 
});

module.exports = app;
