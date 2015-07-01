'use strict';

var Alt = require('alt');

function ProfileStore(ProfileActions) {
	return {
		state: {
			friends: []
		},
		bindListeners: {
			handleGeFriends: ProfileActions.getFriends
		},
		handleGeFriends: function (friends) {
			this.setState({friends: friends});
		}
	};
}

module.exports = ProfileStore;
