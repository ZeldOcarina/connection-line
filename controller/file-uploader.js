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
		if (file.fieldname === 'post-image')
			cb(null, sanitize(`${req.body.title.toLowerCase().split(' ').join('-')}-${file.originalname}`));
		else if (file.fieldname === 'avatar')
			cb(
				null,
				sanitize(
					`${Date.now()}-${req.body.name.toLowerCase().split(' ').join('-')}-avatar.${file.originalname.split(
						'.'
					)[1]}`
				)
			);
		else cb(null, sanitize(`${req.body.name}-${file.originalname}`));
	}
});

const multerFilter = (req, file, cb) => {
	if (
		file.mimetype === 'application/pdf' ||
		file.mimetype === 'application/x-pdf' ||
		file.mimetype === 'application/msword' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
		file.mimetype === 'application/vnd.ms-powerpoint' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png'
	)
		cb(null, true);
	else cb(new Error('An error has occurred on uploading the files!'), false);
};

const upload = multer({
	storage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 1024 * 1024 * 10,
		files: 10
	}
});

exports.fileUploader = upload.array('file', 10);
exports.postFileUploader = upload.single('post-image');
exports.avatarFileUploader = upload.single('avatar');

exports.multerErrorChecker = (err, req, res, next) => {
	if (err.name === 'MulterError') {
		console.error(err);
		console.log(req.files, req.body);
		return res.status(400).render('error', {
			title: 'Upload Error',
			msg: 'Please try again or send your files manually to info@connectionlinesagl.com'
		});
	}
	next();
};

exports.cancellaAvatarFoto = (req, res, next) => {
	if (req.file) {
		aws.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION
		});

		const s3 = new aws.S3();

		const key = req.user.avatar.split('/')[req.user.avatar.split('/').length - 1];
		const toBeDeleted = [ { Key: key } ];

		const params = {
			Bucket: process.env.S3_BUCKET,
			Delete: {
				Objects: toBeDeleted
			}
		};

		s3.deleteObjects(params, (err, data) => {
			if (err) {
				console.error(err, err.stack); // an error occurred
			}
		});
	}
	next();
};
