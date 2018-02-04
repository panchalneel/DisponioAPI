let should = require("should");
let assert = require("assert");
let app = require('../app');
const request = require('supertest');
let jwtToken = "";
let emailID = "cornelialott@emtrak.com";
let password = "44d6aec6-5d67-47d3-a9ec-2754dba27d6b";

// Test cases
describe('GET /login', function () {
	let body;
	this.timeout(500000);
	before("HTTP request to login", function (done) {
		setTimeout(function () {

			return request(app)
				.get('/login?email=' + emailID + "&password=" + password)
				.set('Accept', 'application/json')
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return JWT token', function () {
		should.exist(body);
		assert(body.status, 'Success');
		body.token.should.not.null();
		jwtToken = body.token;
	});
});


describe('GET /login', function () {
	let body;
	this.timeout(500000);
	before("HTTP request to login", function (done) {
		setTimeout(function () {
			return request(app)
				.get('/login?email=panchal2207nil@gmail.com&password=wrong_password')
				.set('Accept', 'application/json')
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return invalid credential', function () {
		should.exist(body);
		assert(body.status, 400);
		assert(body.message, 'Invalid Credential');
	});
});

describe('GET /rentals', function () {
	let body;
	this.timeout(500000);
	before("HTTP request to get rentals list", function (done) {
		setTimeout(function () {

			return request(app)
				.get('/rentals')
				.set('Accept', 'application/json')
				.set('token', jwtToken)
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return wish list', function () {
		should.exist(body);
		assert(body.message, 'Success');
		body.data.should.not.have.length(0);
	});
});


describe('POST /rentals', function () {
	let body;
	this.timeout(500000);

	let rentalDetails = {
		"street": "Rose Street",
		"houseNumber": 219,
		"city": "Coral",
		"zipCode": 10384,
		"numberRooms": 10,
		"area": 10
	}
	before("HTTP request to create rental", function (done) {
		setTimeout(function () {
			return request(app)
				.post('/rentals')
				.send(rentalDetails)
				.set('Accept', 'application/json')
				.set('token', jwtToken)
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return 200 status after crreating rental', function () {
		should.exist(body);
		assert(body.message, 'Rental created successfully');
		assert(body.status, 200);
	});
});


describe('PATCH /rentals/:id', function () {
	let body;
	this.timeout(500000);

	let rentalDetails = {
		"street": "Pink Street",
		"houseNumber": 450,
		"city": "Duisburg",
		"zipCode": 10545,
		"numberRooms": 20,
		"area": 30
	}
	before("HTTP request to update rental details", function (done) {
		setTimeout(function () {
			return request(app)
				.patch('/rentals/59777c092a1248e5fd42ab48')
				.send(rentalDetails)
				.set('Accept', 'application/json')
				.set('token', jwtToken)
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return 200 status after crreating rental', function () {
		should.exist(body);
		assert(body.message, 'Rental details updated successfully');
		assert(body.status, 200);
	});
});


describe('DELETE /rentals/:id', function () {
	let body;
	this.timeout(500000);

	before("HTTP request to delete rental details", function (done) {
		setTimeout(function () {
			return request(app)
				.delete('/rentals/59777c092a1248e5fd42ab48')
				.set('Accept', 'application/json')
				.set('token', jwtToken)
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return 200 status after creating rental', function () {
		should.exist(body);
		assert(body.message, 'Record deleted successfully');
		assert(body.status, 200);
	});
});

describe('POST /upload', function () {
	let body;
	this.timeout(500000);

	let rentalDetails = {
		"street": "Rose Street",
		"houseNumber": 219,
		"city": "Coral",
		"zipCode": 10384,
		"numberRooms": 10,
		"area": 10
	}
	before("HTTP request to upload images", function (done) {
		setTimeout(function () {
			return request(app)
				.post('/upload')
				.set('Accept', 'application/json')
				.set('token', jwtToken)
				.attach('image', 'C:\\Users\\NIL\\Desktop\\sample.png')
				.expect(200)
				.then(response => {
					body = response.body;
					done();
				});
		}, 2500);
	});
	it('Should return 200 status after crreating rental', function () {
		should.exist(body);
		assert(body.message, 'File uploaded successfully');
		assert(body.status, 200);
	});
});
