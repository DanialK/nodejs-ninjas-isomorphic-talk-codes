'use strict';

var Alt = require('alt');

function UserStore(UserActions) {
	return {
		state: {
			name : '',
			kudos : null,
			id: null
		},
		bindListeners: {
			handleChangeName: UserActions.changeName
		},
		handleChangeName: function (name) {
			this.setState({name: name});
		}
	};
}

module.exports = UserStore;
