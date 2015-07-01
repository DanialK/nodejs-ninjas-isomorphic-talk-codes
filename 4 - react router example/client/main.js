'use strict';

var React = require('react');
var Router = require('react-router');
var Iso = require('iso');
var App = require('./App.jsx');
var routes = require('./routes');


Iso.bootstrap(function (state, _, container) {
	Router.run(routes, Router.HistoryLocation, function (Handler) {
		var node = React.createElement(Handler, state);
		React.render(node, container);
	});
});

