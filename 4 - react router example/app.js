'use strict';

require('babel/register')(); /* to compile our jsx files required in server*/

var express = require('express');
var http = require('http');
var swig = require('swig');
var React = require('react');
var Router = require('react-router');
var Iso = require('iso');
var Chance = require('chance')
var chance = new Chance();

var app = express();

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', './views');
app.use(express.static('./public'));

/*
	Dummy Data
*/
var sessionUser = {
	name : 'Danial',
	kudos : 69,
	id: 1
};

var friends = [
	{
		name: 'Matt',
		kudos: 23,
		id: 2
	},
	{
		name: 'Peter',
		kudos: 25,
		id: 3
	},
	{
		name: 'Roxy',
		kudos: 21,
		id: 4
	}
];

var messages = [];
/* making some fake messages */
for (var i=1; i < 10 ; i++) {
	messages.push({
		text: chance.paragraph(),
		subject: chance.sentence({words: 3}),
		sender: chance.name(),
		id: i
	});
}

/*
	API
*/
app.get('/api/friends', function (req, res) {
	res.send(friends);
});

app.get('/api/friends/:id', function (req, res) {
	console.log(req.params.id); 
	friends.forEach(function (friend) {
		if (friend.id == req.params.id) {
			return res.send(friend);
		}
	});
});

app.get('/api/messages', function (req, res) { 
	res.send(messages);
});

app.get('/api/messages/:id', function (req, res) {
	messages.forEach(function (message) {
		if (message.id == req.params.id) {
			return res.send(message);
		}
	});
});

/*
	Renderer
*/
var routes = require('./client/routes');

app.use('*', function (req, res, next) {
	var iso = new Iso();

	var state = {
		user: sessionUser
	};

	Router.run(routes, req.baseUrl, function (Handler) {
		var html = React.renderToString(
			React.createElement(Handler, state)
		);
		iso.add(html, state);
		res.render('layout', {
			html: iso.render()
		});
	});
});


http.createServer(app).listen(3000, function () {
	console.log('Listening on port : 3000'); 
});

module.exports = app;
