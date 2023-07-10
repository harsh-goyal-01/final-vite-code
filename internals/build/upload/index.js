import { uploadFile as uploadFileToS3, S3_BUCKET } from './s3uploader';
import { uploadFile as uploadFileToGCP, GCP_STORAGE_BUCKET } from './gcpUploader';
import { uploadDir } from './util';
import { getUploadUrl } from './helper';

const CDN_URL = process.env.VITE_CDN_URL; // Keep prod0 - middle of prod and qa

export default async (params) => {
  if (GCP_STORAGE_BUCKET) {
    await uploadDir({
      ...params,
      uploadFile: uploadFileToGCP,
    });
  }
  else if (S3_BUCKET) {
    await uploadDir({
      ...params,
      uploadFile: uploadFileToS3
    });
  } else {
    throw Error('No upload config present');
  }
  return `https://${CDN_URL}/${getUploadUrl(params.dirToUpload, params.dirToUpload, params.uploadUrl)}`;
};
