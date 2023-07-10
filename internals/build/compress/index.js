/**
 * User: abhinavsingi
 * Date: 22/09/18
 * Time: 4:22 PM
 * Desc:
 */

import fse from 'fs-extra';
import recursive from 'recursive-readdir';
import path from 'path';

import { ParallelExecutor } from '../tools/ParallelExecutor';

export default function compress(source, destination) {
  return new Promise((resolve, reject) => {
    //eslint-disable-line import/prefer-default-export
    console.time('Total time taken for compressing all files');
    recursive(source, (err, files) => {
      ParallelExecutor(require.resolve('./compressWorker.js'), files, {source, destination})
        .then(() => {
          console.log('==> ✅ All files compressed successfully.');
          fse.removeSync(path.resolve(source, 'temp'));
          console.timeEnd('Total time taken for compressing all files');
          resolve();
        })
        .catch(error => {
          console.log('Error in compression.', error);
          reject(error);
        });
    })
  });
}
