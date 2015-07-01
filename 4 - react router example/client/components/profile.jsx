'use strict';

var React = require('react');
var request = require('superagent');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Component = React.createClass({
	getInitialState: function () {
		return {
			friends: []
		}
	},
	componentDidMount: function () {
		var that = this;
		request
		.get('/api/friends')
		.end(function (err, res) {
			that.setState({
				friends: res.body
			});
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">				
					<h4>Profile</h4>
					<div className="jumbotron">
						<div className="row">
							<div className="col-md-4">				
								<img src="http://placehold.it/240x200"/>
							</div>
							<div className="col-md-4">				
								<h1>{this.props.user.name}</h1>
								<p>{this.props.user.kudos} Kudos</p>
							</div>
						</div>
					</div>
					<div className="row">
						<h4>Friends</h4>
						{
							this.state.friends.map(function (friend) {
								return (
									<div className="col-sm-6 col-md-4">
										<div className="thumbnail">
											<img src="http://placehold.it/240x200"/>
											<div className="caption">
												<h3>{friend.name}</h3>
												<p>{friend.kudos} Kudos</p>
											</div>
										</div>
									</div>

								);
							})
						}	
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Component;
