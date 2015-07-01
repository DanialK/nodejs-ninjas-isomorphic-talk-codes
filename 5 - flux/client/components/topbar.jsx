'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var State = Router.State
var Link = Router.Link;

var Component = React.createClass({
	mixins: [ State ],
	getInitialState: function() {
		return this.props.flux.getStore('UserStore').getState();
	},
	componentDidMount: function() {
		this.props.flux.getStore('UserStore').listen(this.onChange);
	},
	componentWillUnmount: function() {
		this.props.flux.getStore('UserStore').unlisten(this.onChange);
	},
	onChange: function (state) {
		this.setState(state);
	},
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand">Awesome App</a>
					</div>
					<p className="navbar-text">Signed in as {this.state.name}</p>
				</div>
			</nav>
		);
	}
});

module.exports = Component;
