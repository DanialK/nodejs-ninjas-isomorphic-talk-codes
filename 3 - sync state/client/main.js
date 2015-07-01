'use strict';

var React = require('react');
var Iso = require('iso');
var App = require('./App.jsx');


Iso.bootstrap(function (state, _, container) {
	React.render(
		<App
			user={state.user}
			clicksCount={state.clicksCount}
		/>,
		container
	);
});

