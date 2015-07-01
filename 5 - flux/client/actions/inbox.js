'use strict';

var request = require('superagent');

var InboxActions = {
	getMessages: function () {
		var that = this;
		request
		.get('/api/messages')
		.end(function (err, res) {
			that.dispatch(res.body);
		});
	},

	getMessage: function (id) {
		var that = this;
		request
		.get('/api/messages/' + id)
		.end(function (err, res) {
			that.dispatch(res.body);
		});
	},

	closeMessage: function () {
		this.dispatch();
	}
};

module.exports = InboxActions;
