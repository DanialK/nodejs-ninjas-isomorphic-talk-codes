'use strict';

var React = require('react');
var request = require('superagent');

var AwesomeComponent = React.createClass({
	getInitialState: function () {
		return {clicks: this.props.clicksCount};
	},
	handleClick: function (e) {
		var that = this;
		request
		.post('/click')
		.end(function (err, res) {
			that.setState({clicks: res.body.clicksCount});
		});
	},
	render: function () {
		return (
			<div className="awesome">
				<p>Clicks count: {this.state.clicks}</p>

				<button onClick={this.handleClick}>
					Click!
				</button>
			</div>
		);
	}
});

module.exports = AwesomeComponent