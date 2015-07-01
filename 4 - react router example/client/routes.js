'use strict';

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var App = require('./App.jsx');
var About = require('./components/about.jsx');
var Home = require('./components/home.jsx');
var Profile = require('./components/profile.jsx');
var NotFound = require('./components/notfound.jsx');
var Inbox = require('./components/inbox.jsx');
var Message = require('./components/message.jsx');

var routes = (
	<Route path="/" name="app" handler={App}>
		<DefaultRoute name="home" handler={Home}/>
		<Route path="/about" name="about" handler={About}/>
		<Route path="/profile" name="profile" handler={Profile}/>
		<Route path="/inbox" name="inbox" handler={Inbox}>
			<Route path="/inbox/:id" name="message" handler={Message}/>
		</Route>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

module.exports = routes;
