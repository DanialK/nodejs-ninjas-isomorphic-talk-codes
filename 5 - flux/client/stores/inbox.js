'use strict';

var Alt = require('alt');

function InboxStore(InboxActions) {
	return {
		state: {
			messages: [],
			current_message: {}
		},
		bindListeners: {
			handleGetMessages: InboxActions.getMessages,
			handleGetMessage: InboxActions.getMessage,
			handleCloseMessage: InboxActions.closeMessage
		},
		handleGetMessages: function (messages) {
			this.setState({messages: messages});
		},
		handleGetMessage: function (message) {
			this.setState({current_message: message});
		},
		handleCloseMessage: function () {
			this.setState({current_message: {}});
		}
	};
}

module.exports = InboxStore;
