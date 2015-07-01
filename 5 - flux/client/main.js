'use strict';

var React = require('react');
var Router = require('react-router');
var Iso = require('iso');
var App = require('./App.jsx');
var routes = require('./routes');
var Flux = require('./flux');

var flux = new Flux();

Iso.bootstrap(function (state, _, container) {
	flux.bootstrap(state);
	Router.run(routes, Router.HistoryLocation, function (Handler) {
		var node = React.createElement(Handler, {flux: flux});
		React.render(node, container);
	});
});

