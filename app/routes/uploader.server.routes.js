'use strict';

module.exports = function(app) {
	var uploader = require('../../app/controllers/uploader.server.controller');
	var users = require('../../app/controllers/users.server.controller');

	// Categories Routes
	app.route('/uploader')
		.post(users.requiresLogin, uploader.uploadImage);


};
