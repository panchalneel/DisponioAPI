/*
 Endpoints which don't require authentication
 */

let byPassEndpoints = ['^/login'];
let fs = require('fs');
let Authentication = require('../libs/response');
let authentication = new Authentication();
module.exports = class Modules {
	constructor(app) {
		// Configure local auth check
		app.use('/', authentication.authHandler(byPassEndpoints));
		this.setupRoutes(app);
	}

	setupRoutes(app) {
		fs.readdirSync(__dirname + '/').filter(function (file) {
			var stats = fs.statSync(__dirname + '/' + file);
			return (file.indexOf('.') !== 0 && stats.isDirectory());
		}).forEach(function (file) {
			let tmpRoute = require(__dirname + '/' + file)
			new tmpRoute(app);
		});
	}
};
