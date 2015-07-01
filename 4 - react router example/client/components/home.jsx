'use strict';

var React = require('react');

var Component = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">				
					<h4>Welcome {this.props.user.name}</h4>
					<p>
						Explore !!
					</p>
				</div>				
			</div>
		);
	}
});


module.exports = Component;
