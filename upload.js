const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { awsKeys } = require("./config");
const { secret, accessKey, region } = awsKeys;

aws.config.update({
  secretAccessKey: secret,
  accessKeyId: accessKey,
  region: region,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3,
  bucket: "foodfeed",
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
});

const upload = multer({
  fileFilter,
  storage: multerS3Config,
});

module.exports = upload;
