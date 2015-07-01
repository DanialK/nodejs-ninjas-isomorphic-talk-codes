'use strict';

var request = require('superagent');

var ProfileActions = {
	getFriends: function () {
		var that = this;
		request
		.get('/api/friends')
		.end(function (err, res) {
			that.dispatch(res.body);
		});
	}
};

module.exports = ProfileActions;
