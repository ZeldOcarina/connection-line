const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const sanitize = require('sanitize-filename');

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});

const s3 = new aws.S3();

/************************************
 * NORMAL DISK STORAGE UPLOAD CONFIG
 ************************************/

/*const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function(req, file, cb) {
		cb(null, sanitize(`${req.body.name}-${file.originalname}`));
	}
}); */

const storage = multerS3({
	s3,
	bucket: process.env.S3_BUCKET,
	key: function(req, file, cb) {
		cb(null, sanitize(`${req.body.name}-${file.originalname}`));
	}
});

const multerFilter = (req, file, cb) => {
	if (
		file.mimetype === 'application/pdf' ||
		file.mimetype === 'application/x-pdf' ||
		file.mimetype === 'application/msword' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
		file.mimetype === 'application/vnd.ms-powerpoint'
	)
		cb(null, true);
	else {
		req.fileValidationError = 'Forbidden extension';
		return cb(null, false, req.fileValidationError);
	}
};

const upload = multer({
	storage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 5000000,
		files: 5
	}
});

exports.fileUploader = upload.array('file', 5);

exports.multerErrorChecker = (req, res, next) => {
	if (req.fileValidationError)
		return res.status(400).render('error', { title: 'Error!', msg: 'Wrong files uploaded!' });
	next();
};
