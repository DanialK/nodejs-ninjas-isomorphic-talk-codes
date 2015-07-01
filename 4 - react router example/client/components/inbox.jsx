'use strict';

var React = require('react');
var request = require('superagent');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Component = React.createClass({
	getInitialState: function () {
		return {
			messages: []
		}
	},
	componentDidMount: function () {
		var that = this;
		request
		.get('/api/messages')
		.end(function (err, res) {
			that.setState({
				messages: res.body
			});
		});
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
						<RouteHandler/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Component;
