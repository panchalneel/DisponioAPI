let jwt = require('jsonwebtoken');

function Response() {
	/**
	 * @description Middleware to authenticate request
	 * @param byPassEndpoints
	 * @returns {Function}
	 */
	this.authHandler = function (byPassEndpoints) {
		return function (req, res, next) {
			let path = _.find(byPassEndpoints, function (path) {
				let regex = new RegExp(path, 'i');
				return req.path.match(regex);
			});
			if (path === undefined) {
				// Check JWT token
				jwt.verify(req.headers.token, global.config.secretKey, function (err, decode) {
					if (err) {
						logger.warn("Invalid Token : " + req.headers.token);
						res.status(500).send({
							auth: false,
							message: 'Failed to authenticate token. Please login again.'
						});
					} else {
						logger.info("User verified successfully");
						next();
					}
				});
			} else {
				next();
			}
		};
	}
}

module.exports = Response;