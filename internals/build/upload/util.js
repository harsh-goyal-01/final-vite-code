import recursive from 'recursive-readdir';
import path from "path";
import mime from 'mime-types';
import { getUploadUrl } from './helper';

export const uploadDir = ({ dirToUpload, uploadUrl, shouldCacheFile, uploadFile, compression }) => {
  return new Promise((resolve, reject) => {
    const promises = [];

    console.time('Total time taken for uploading all files');
    recursive(dirToUpload, (err, files) => {
      files.forEach(async file => {
        /*
         * Setting encoding and cdn path params for a file using its path
         * I/P : x/y/compressed-assets/assets-s3/a/b/c/myFile
         *       OR
         *       x/y/compressed-assets/assets-s3-legacy/a/b/c/myFile
         * O/P : {
         *         key : edge/myVersion/a/b/c/myFile,
         *         encoding : gzip/br, (depending on the file type)
         *       }
         *       OR
         *       {
         *         key : edge/myVersion/legacy/a/b/c/myFile,
         *         encoding : gzip,
         *       }
         * */
        const shouldCache = !!shouldCacheFile(file);
        const destination = path.join(uploadUrl, path.relative(dirToUpload, file));
        const uploadParams =  {
          cacheControl: shouldCache ? 'max-age=31536000, no-transform, public' : 'no-cache, max-age=0, must-revalidate',
          contentEncoding: compression ? 'gzip' : '',
          contentType: mime.lookup(file) || 'application/octet-stream',
          key: getUploadUrl(file, dirToUpload, uploadUrl),
          shouldCache,
        };
        promises.push(uploadFile({ destination, file, params: uploadParams }));
      });

      Promise.all(promises).then(
        () => {
          console.log('==> ✅  All static assets uploaded');
          console.timeEnd('Total time taken for uploading all files');
          resolve();
        },
        error => {
          console.error('Error while uploading static assets');
          reject(error);
        }
      );
    });
  })
};
