let userDetails = require('../../config/users');
let jwt = require('jsonwebtoken');

/**
 * @class AuthController
 * @description To authentic user by login id and password.
 *              After authenticating user generate JWT token and send it in response
 * @type {module.AuthController}
 * @version 1.0
 * @author Nil Panchal
 * @licence MIT
 *
 */
module.exports = class AuthController {
	constructor(app) {
		app.get('/login', this.login);
	}

	/**
	 * @description To authenticate user and generate jwt token
	 * @param req
	 * @param res
	 */
	login(req, res) {
		logger.info("In Login");
		let email = req.query.email;
		let password = req.query.password;

		let response;
		let user = _.find(userDetails.Users, {email: email, password: password});

		if (user) {
			let token = jwt.sign({id: user.id}, global.config.secretKey, {
				expiresIn: 7200 // expires in 2 hours
			});
			logger.info('User authenticated successfully : ' + email);
			res.send({
				status: 200,
				message: 'Success',
				user: {id: user.id, firstName: user.firstName, lastName: user.surname},
				token: token
			});
		} else {
			logger.error("User details not found : " + email);
			response = {};
			response.status = 400;
			response.message = "Invalid Credentials";
			res.send(response);
		}
	}
};