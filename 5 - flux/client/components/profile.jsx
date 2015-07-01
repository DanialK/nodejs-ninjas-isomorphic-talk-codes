'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Component = React.createClass({
	getInitialState: function () {
		return this.getStateFromStores();
	},
	getStateFromStores: function () {
		return {
			profile: this.props.flux.getStore('ProfileStore').getState(),
			user: this.props.flux.getStore('UserStore').getState()
		}
	},
	componentDidMount: function() {
		var ProfileStore = this.props.flux.getStore('ProfileStore');
		var UserStore = this.props.flux.getStore('UserStore');
		if (!ProfileStore.getState().friends.length) {
			this.props.flux.getActions('ProfileActions').getFriends();
		}
		ProfileStore.listen(this.onChange);
		UserStore.listen(this.onChange);
	},
	componentWillUnmount: function() {
		var ProfileStore = this.props.flux.getStore('ProfileStore');
		var UserStore = this.props.flux.getStore('UserStore');
		ProfileStore.unlisten(this.onChange);
		UserStore.listen(this.onChange);
		this.props.flux.recycle(ProfileStore);
	},
	onChange: function () {
		this.setState(this.getStateFromStores());
	},
	handleSave: function (e) {
		e.preventDefault();
		var name = this.refs.name.getDOMNode().value;
		this.props.flux.getActions('UserActions').changeName(name);
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
								<h1>{this.state.user.name}</h1>
								<p>{this.state.user.kudos} Kudos</p>
							</div>
							<div className="col-md-4">
								<form>
									<div className="form-group">
										<label>Name</label>
										<input
											type="text"
											ref="name" 
											defaultValue={this.state.user.name}
											className="form-control"/>
									</div>
									<button
										type="submit"
										className="btn btn-default"
										onClick={this.handleSave}
									>
										Save
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">				
							<h4>Friends</h4>
							{
								this.state.profile.friends.map(function (friend) {
									return (
										<div key={friend.id} className="col-sm-6 col-md-4">
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
			</div>
		);
	}
});

module.exports = Component;
