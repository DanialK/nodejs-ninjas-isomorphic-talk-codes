'use strict';

var React = require('react');

var AwesomeComponent = React.createClass({
	getInitialState: function () {
		return {click: 0};
	},
	handleClick: function (e) {
		this.setState({click : this.state.click + 1 });
	},
	render: function () {
		return (
			<div>
				<h1>Awesome App</h1>
				<p>Click count: {this.state.click}</p>

				<button onClick={this.handleClick}>
					Click!
				</button>
			</div>
		);
	}
});

module.exports = AwesomeComponent