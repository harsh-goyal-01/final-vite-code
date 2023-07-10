/**
 * User: abhinavsingi
 * Date: 22/09/18
 * Time: 4:12 PM
 * Desc:
 */

import fse from 'fs-extra';
import zlib from 'zlib';

import _castArray from 'lodash/castArray';

const getCompressedAssetsPath = (file, params) => ({
  compressedAssetsPath: file.replace(new RegExp(`${params.source}/+?`, 'g'), `${params.destination}/`),
});

const getFileStreams = (file, params) => {
  const { compressedAssetsPath } = getCompressedAssetsPath(file, params);

  fse.ensureFileSync(compressedAssetsPath);

  const assetsInputStream = fse.createReadStream(file);

  const assetsOutputStream = fse.createWriteStream(compressedAssetsPath);

  return { assetsInputStream, assetsOutputStream };
};

const compressUsingLegacy = (assetsInputStream, assetsOutputStream) => callback => {
  const assetsCompressor = zlib.createGzip({
    level: 9,
  });

  assetsInputStream
    .pipe(assetsCompressor)
    .pipe(assetsOutputStream)
    .on('error', () => {
      throw new Error('Error in compressUsingLegacy');
    })
    .on('finish', () => {
      console.log(`Compression by ZLib - ${assetsInputStream.path}`);
      callback();
    });
};

const compressAssetAndCopyFromLegacy = ({ assetsInputStream, assetsOutputStream }) =>
  new Promise((resolve, reject) => {
    compressUsingLegacy(assetsInputStream, assetsOutputStream)(() => {
      // fse.copySync(legacyAssetsOutputStream.path, assetsOutputStream.path);
      resolve();
    });
  });

const enhancedCompressAsset = (file, params) => {
  const fileParams = getFileStreams(file, params);

  return compressAssetAndCopyFromLegacy(fileParams);
};

const compressGivenAssets = (files, params) =>
  new Promise((resolve, reject) => {
    const promises = [];
    const _files = _castArray(files);

    _files.forEach(file => promises.push(enhancedCompressAsset(file, params)));

    Promise.all(promises).then(
      () => {
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });

process.on('message', ({ data, processIndex, params }) => {
  compressGivenAssets(data, params).then(
    () => {
      process.send(`Compression completed for processIndex: ${processIndex}`);
      process.exit(0);
    },
    error => {
      console.log({ error });
      process.exit(1);
    }
  );
});
