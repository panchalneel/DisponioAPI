let jwt = require('jsonwebtoken');
let uuidv4 = require('uuid/v4');


module.exports = class RentalController {
	constructor(app) {
		app.get('/rentals', this.getRentals);
		app.post('/rentals', this.createRental);
		app.patch('/rentals/:id', this.updateRental);
		app.delete('/rentals/:id', this.deleteRental);
	}

	/**
	 * @description To get rental details
	 * @param req
	 * @param res
	 */
	getRentals(req, res) {
		res.send({status: 200, message: "Success", data: global.rentals});
	}

	/**
	 * @description To update rental details
	 * @param req
	 * @param res
	 */
	updateRental(req, res) {
		let data = req.body;
		let index = _.findIndex(global.rentals, {id: req.params.id});
		if (index !== -1) {

			if (data.street) {
				global.rentals[index].address.street = data.street;
			}

			if (data.houseNumber) {
				global.rentals[index].address.houseNumber = data.houseNumber;
			}

			if (data.city) {
				global.rentals[index].address.city = data.city;
			}

			if (data.zipCode) {
				global.rentals[index].address.zipCode = data.zipCode;
			}

			if (data.numberRooms) {
				global.rentals[index].numberRooms = data.numberRooms;
			}

			if (data.area) {
				global.rentals[index].area = data.area;
			}

			res.status(200).send({status: 200, message: "Rental details updated successfully"});

		} else {
			res.status(400).send({status: 400, message: "Rental details not found"});

		}
	}

	/**
	 * @description To create rental
	 * @param req
	 * @param res
	 */
	createRental(req, res) {
		let data = req.body;
		let id = uuidv4().replace(/-/g, "").substring(0, 25);

		let rental = {};
		rental.id = id;
		rental.address = {};
		if (data.street) {
			rental.address.street = data.street;
		}

		if (data.houseNumber) {
			rental.address.houseNumber = data.houseNumber;
		}

		if (data.city) {
			rental.address.city = data.city;
		}

		if (data.zipCode) {
			rental.address.zipCode = data.zipCode;
		}

		if (data.numberRooms) {
			rental.numberRooms = data.numberRooms;
		}

		if (data.area) {
			rental.area = data.area;
		}

		global.rentals.unshift(rental);
		res.send({status: 200, message: "Rental created successfully"});
	}

	/**
	 * @description To delete rental details
	 * @param req
	 * @param res
	 */
	deleteRental(req, res) {
		global.rentals = _.reject(global.rentals, {id: req.params.id});
		res.send({status: 200, message: "Record deleted successfully"});
	}
};