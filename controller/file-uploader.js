const multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function(req, file, cb) {
		cb(null, `${req.body.name}-${file.originalname}`);
	}
});

const multerFilter = (req, file, cb) => {
	if (
		file.mimetype === 'application/pdf' ||
		file.mimetype === 'application/x-pdf' ||
		file.mimetype === 'application/msword' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	)
		cb(null, true);
	else cb(console.error('Wrong file type!'), false);
};

const upload = multer({
	storage: storage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 5000000,
		files: 5
	}
});

module.exports = upload.array('file', 5);
