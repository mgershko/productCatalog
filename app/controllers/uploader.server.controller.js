'use strict';

/**
 * Upload Image tp public/image folder
 */
exports.uploadImage = function(req, res) {
	var formidable = require('formidable');
	var uploadLocation = '/images';

	// parse a file upload
	var form = new formidable.IncomingForm();
	form.uploadDir = global.appRoot + '/public' + uploadLocation;

	form.on('fileBegin', function(name, file) {
		file.path = form.uploadDir + '/' + file.name;
	});
	form.parse(req, function(err, fields, files) {
		res.json(200, {
			imageUrl:  uploadLocation + '/' + files.file.name
		});
	});

	return;
};
