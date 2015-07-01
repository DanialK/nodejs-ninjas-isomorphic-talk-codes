'use strict';

var UserActions = {
	changeName: function (name) {
		this.dispatch(name);
	}
};

module.exports = UserActions;
