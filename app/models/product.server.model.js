'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill product name',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please select the image',
		trim: true
	},
	description: {
		type: String,
		default: ''
	},
	price: {
		type: Number,
		default: ''
	},
	quantity: {
		type: Number,
		default: ''
	},
	category: {
		type: Array
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Product', ProductSchema);
