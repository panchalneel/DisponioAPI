let multer = require('multer');
let fs = require('fs');
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log(file.originalname);
		// Check for uploading png file only
		if (file.originalname.endsWith('.png')) {
			let uploadDir = process.env.UPLOAD_DIR || 'uploads/';
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir);
			}
			console.log('Upload dir : ' + uploadDir);
			cb(null, uploadDir)
		} else {
			console.error('Invalid Format : ' + file.originalname);
			cb('Invalid File', null);
		}
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});

let upload = multer({storage: storage}).single('image');

/**
 * @description To upload file on server
 * @type {module.FileUploadController}
 */
module.exports = class FileUploadController {
	constructor(app) {
		app.post('/upload', this.uploadFile);
	}

	/**
	 * @description To upload file
	 * @param req
	 * @param res
	 */
	uploadFile(req, res) {
		upload(req, res, function (error) {
			if (error) {
				logger.error(error);
				res.status(400).send({
					status: 400,
					message: 'You have selected invalid file. Please upload only .png file'
				});
			} else {
				logger.info("File uploaded successfully");
				res.send({status: 200, message: "File updated successfully"});
			}
		});
	}
}