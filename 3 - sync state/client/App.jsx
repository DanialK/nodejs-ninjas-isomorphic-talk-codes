'use strict';

var React = require('react');
var Awesome = require('./components/Awesome.jsx');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<h1>Awesome App</h1>
				<h3>Welcome, {this.props.user.name}!</h3>
				<Awesome clicksCount={this.props.clicksCount}/>
			</div>
		);
	}
});


module.exports = App