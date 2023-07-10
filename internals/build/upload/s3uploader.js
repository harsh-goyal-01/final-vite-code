import AWS from 'aws-sdk';
import fs from "fs";
import _once from 'lodash/once';

export const S3_BUCKET = process.env.S3_BUCKET;
const S3_SECRET = process.env.S3_SECRET;
const S3_KEY = process.env.S3_KEY;

const getAWSS3Client = _once(() => {
  if (S3_BUCKET) {
    return new AWS.S3({
      accessKeyId: S3_KEY,
      secretAccessKey: S3_SECRET,
    });
  }
});

const client = getAWSS3Client();

export const uploadFile = ({ file, params }) =>
  new Promise((resolve, reject) => {
    const date = new Date();

    const uploadParams = {
      Bucket: S3_BUCKET,
      CacheControl: params.cacheControl,
      ContentEncoding: params.contentEncoding,
      ContentType: params.contentType,
      Expires: params.shouldCache ? new Date(date.setFullYear(date.getFullYear() + 1)) : null,
      Key: params.key,
      Body: fs.createReadStream(file),
    };

    console.time(`Uploading - ${file}`);
    client.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.timeEnd(`Uploading - ${file}`);
        resolve();
      }
    });
  });
