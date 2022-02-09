const aws = require("aws-sdk");

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS;

const s3 = new aws.S3({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

module.exports = s3;