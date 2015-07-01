'use strict';

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var request = require('superagent');

var Component = React.createClass({
	mixins: [ Navigation ],

	getInitialState: function () {
		return {
			sender: '',
			subject: '',
			text: '',
			id: 0
		};
	},
	componentDidMount: function () {
		var that = this;
		request
		.get('/api/messages/' + this.props.params.id)
		.end(function (err, res) {
			that.setState(res.body);
		});
	},
	componentWillReceiveProps: function (nextProps) {
		var that = this;
		request
		.get('/api/messages/' + nextProps.params.id)
		.end(function (err, res) {
			console.log('here'); 
			that.setState(res.body);
		});
	},
	handelClose: function () {
		this.transitionTo('inbox');
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<button onClick={this.handelClose} className="close">
					<span>&times;</span>
				</button>
				<div className="panel-heading">
					<h5>From: {this.state.sender}</h5>
					Subject: <strong>{this.state.subject}</strong>
				</div>
				<div className="panel-body">
					{this.state.text}
				</div>
			</div>
		);
	}
});


module.exports = Component;
