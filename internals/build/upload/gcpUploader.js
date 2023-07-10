import { Storage } from '@google-cloud/storage';
import _once from 'lodash/once';

export const GCP_STORAGE_BUCKET =  process.env.GCP_STORAGE_BUCKET_NAME;

const getGCPClient = _once(() => {
  if (GCP_STORAGE_BUCKET) {
    return new Storage().bucket(GCP_STORAGE_BUCKET)
  }
});

const client = getGCPClient();

export async function uploadFile({ file, destination, params }) {
  console.time(`Uploading - ${file}`);
  return new Promise(( resolve, reject) => {
    client.upload(file,  {
      destination,
      metadata: {
        contentEncoding: params.contentEncoding,
        cacheControl: params.cacheControl,
        contentType: params.contentType,
        key: params.key,
      }
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.timeEnd(`Uploading - ${file}`);
        resolve();
      }
  })})
}