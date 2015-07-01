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
	Page Controllers
*/

app.use(function (req, res, next) {
	res.locals.stores = res.locals.stores || {};
	res.locals.stores.UserStore = sessionUser;
	next();
})

app.get('/inbox', function (req, res, next) {
	res.locals.stores.InboxStore = {
		messages: messages
	};
	next();
});

app.get('/inbox/:id', function (req, res, next) {
	res.locals.stores.InboxStore = {
		messages: messages
	};
	messages.forEach(function (message) {
		if (message.id == req.params.id) {
			res.locals.stores.InboxStore.current_message = message;
		}
	});
	next();
});

app.get('/profile', function (req, res, next) {
	res.locals.stores.ProfileStore = {
		friends : friends
	};
	next();
});

/*
	Renderer
*/
var routes = require('./client/routes');
var Flux = require('./client/flux');

app.use('*', function (req, res, next) {
	var flux = new Flux();
	var iso = new Iso();
	flux.bootstrap(JSON.stringify(res.locals.stores));

	Router.run(routes, req.baseUrl, function (Handler) {
		var html = React.renderToString(
			React.createElement(Handler, {flux: flux})
		);
		iso.add(html, flux.flush());
		res.render('layout', {
			html: iso.render()
		});
	});
});


http.createServer(app).listen(3000, function () {
	console.log('Listening on port : 3000'); 
});

module.exports = app;
