'use strict';

var React = require('react');

var Component = React.createClass({
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
			<div className="row">
				<div className="col-md-12">				
					<h4>Welcome {this.state.name}</h4>
					<p>
						Explore !!
					</p>
				</div>				
			</div>
		);
	}
});


module.exports = Component;
