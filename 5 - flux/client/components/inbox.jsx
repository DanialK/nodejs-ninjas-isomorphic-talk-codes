'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Component = React.createClass({

	getInitialState: function() {
		return this.props.flux.getStore('InboxStore').getState();
	},
	componentDidMount: function() {
		var InboxStore = this.props.flux.getStore('InboxStore');
		if (!InboxStore.getState().messages.length) {
			this.props.flux.getActions('InboxActions').getMessages();
		}
		InboxStore.listen(this.onChange);
	},
	componentWillUnmount: function() {
		var InboxStore = this.props.flux.getStore('InboxStore');
		InboxStore.unlisten(this.onChange);
		this.props.flux.recycle(InboxStore);
	},
	onChange: function (state) {
		this.setState(state);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">				
					<h4>Inbox</h4>
					<div className="col-xs-6 col-md-4">
						<div className="list-group">
							{
								this.state.messages.map(function (message) {
									return (
										<Link key={message.id} to="message" params={{id: message.id}} className="list-group-item">
											<h4 className="list-group-item-heading">
												<strong>{message.sender}</strong> - {message.subject}
											</h4>
											<p className="list-group-item-text">
												{message.text.substr(0, 100)}
											</p>
										</Link>
									);
								})
							}					
						</div>
					</div>
					<div className="col-xs-12 col-md-8">
						<RouteHandler {...this.props}/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Component;
