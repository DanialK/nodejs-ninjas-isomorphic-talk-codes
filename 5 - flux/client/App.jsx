'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navbar = require('./components/navbar.jsx');
var Topbar = require('./components/topbar.jsx');

var App = React.createClass({
	render: function() {
		var flux = this.props.flux;
		return (
			<div className="container">
				<Topbar {...this.props}/>
				<Navbar/>
				<RouteHandler {...this.props}/>
			</div>
		);
	}
});


module.exports = App