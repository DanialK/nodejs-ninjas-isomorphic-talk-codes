'use strict';

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;

var Component = React.createClass({
	mixins: [ Navigation ],

	getInitialState: function () {
		return this.props.flux.getStore('InboxStore').getState().current_message;
	},
	componentDidMount: function () {
		var InboxStore = this.props.flux.getStore('InboxStore');
		InboxStore.listen(this.onChange);
		if (!InboxStore.getState().current_message.sender) {
			this.props.flux.getActions('InboxActions').getMessage(this.props.params.id);
		}
	},
	componentWillReceiveProps: function (nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.props.flux.getActions('InboxActions').getMessage(nextProps.params.id);
		}
	},
	componentWillUnmount: function() {
		this.props.flux.getStore('InboxStore').unlisten(this.onChange);
	},
	onChange: function (state) {
		this.setState(state.current_message);
	},
	handelClose: function () {
		this.props.flux.getActions('InboxActions').closeMessage();
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
