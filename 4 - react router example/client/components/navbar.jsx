'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Link = Router.Link;

var Component = React.createClass({
	mixins: [ State ],
	render: function() {
		var that = this;
		function renderTab (routeName) {
			var route = routeName.toLowerCase();
			var isActive = that.isActive(route);
			return (
				<li role="presentation" className={isActive ? 'active' : ''}>
					<Link to={route}> {routeName} </Link>
				</li>
			)
		}
		return (
			<ul className="nav nav-tabs nav-justified">
				{renderTab('Home')}
				{renderTab('About')}
				{renderTab('Profile')}
				{renderTab('Inbox')}
			</ul>
		);
	}
});

module.exports = Component;