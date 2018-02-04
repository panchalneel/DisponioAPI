var express = require('express');
var app = express();
global.Utils = require('./libs/utils.js');
global.ROOT_PATH = __dirname;
var config = require('./config/environments');
global.config = config;
var path = require('path');
var fs = require('fs');
var index = fs.readFileSync(path.join(ROOT_PATH, '.', 'public', 'index.html'));
global._ = require('lodash');
//Configure application
require('./config/express')(app);

var request = require("request");
const rentalAPI_URL = 'https://s3.eu-central-1.amazonaws.com/tasks-interview-disponio/Backend/rentals.json';

// To get rental details and store it in memory
getRentals();

var Module = require('./modules');
new Module(app);

function getRentals() {
	var options = {
		method: 'GET',
		url: rentalAPI_URL,
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		console.log("Rental details stored successfully");
		global.rentals = JSON.parse(body)
	});
}

module.exports = app;