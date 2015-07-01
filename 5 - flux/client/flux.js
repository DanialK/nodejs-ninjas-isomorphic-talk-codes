'use strict';

var Alt = require('alt');

function Flux() {
	Alt.apply(this, arguments);

	/* Register Actions */
	this.addActions('UserActions', require('./actions/user'));
	this.addActions('InboxActions', require('./actions/inbox'));
	this.addActions('ProfileActions', require('./actions/profile'));
	/* Register Stores */
	this.addStore('UserStore',
		require('./stores/user')(this.getActions('UserActions')));
	this.addStore('InboxStore',
		require('./stores/inbox')(this.getActions('InboxActions')));
	this.addStore('ProfileStore',
		require('./stores/profile')(this.getActions('ProfileActions')));
}

Flux.prototype = Object.create(Alt.prototype, {
	constructor: {
		value: Flux,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

Flux.__proto__ = Alt

module.exports = Flux;
