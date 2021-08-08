const aws = require("aws-sdk");
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  REGION,
  BUCKET_NAME,
  SIGNATURE_VERSION,
} = require("../config").s3;
const { v4: uuidv4 } = require("uuid");

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: REGION,
  signatureVersion: SIGNATURE_VERSION,
});

module.exports = {
  uploadImage: (bucketFolder, buffer, mimetype) => {
    let imageId = uuidv4();
    let imageKey = `${bucketFolder}/${imageId}`;
    return new Promise((resolve, reject) =>
      s3.putObject(
        {
          Bucket: BUCKET_NAME,
          ContentType: mimetype,
          Key: imageKey,
          Body: buffer,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) return reject(err);
          console.log(data);
          return resolve(imageKey);
        }
      )
    );
  },
  getPublicUri: (key) => {
    return `https://s3-${REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;
  },
};
