/**
 * User: abhinavsingi
 * Date: 22/09/18
 * Time: 2:40 PM
 * Desc:
 */

import os from 'os';
import fs from 'fs';
import {fork} from 'child_process';
import _times from 'lodash/times';

/**
 * Takes 2 inputs:
 * 1. Absolute JS file path to execute
 * 2. Complete Array of data
 *
 * Based on number of processes ParallelExecutor forks - it passes that data to 1.
 */

// Just randomly picked 2 - we can do it 1 as well.
// Because of the additional resource allocations required, spawning a large number of child Node.js processes is not recommended.
const IN_RESERVE_CPUS = 2;
const CPUS_LENGTH = os.cpus().length;

const NUMBER_OF_PARALLEL_PROCESSES = CPUS_LENGTH - IN_RESERVE_CPUS;

if (NUMBER_OF_PARALLEL_PROCESSES <= 0) {
  throw new Error(`Please run on a machine with cpus more than ${IN_RESERVE_CPUS}`);
}

/**
 * Returns chunked data that can be sent to each parallel process
 * @param dataArray
 * @param numOfParallelProcessesAvailable
 * @returns {*}
 */
function getChunkedData(dataArray, numOfParallelProcessesAvailable) {
  const dataLength = dataArray.length;

  //If we have more cpus available - then send each data to individual cpu
  if (dataLength <= numOfParallelProcessesAvailable) {
    return {
      chunkedDataArray: dataArray,
      numOfParallelProcessesToFork: dataLength,
    };
  }

  const sortedDataArrayBySize = dataArray
    .map(file => ({ file, size: fs.statSync(file).size }))
    .sort((a, b) => b.size - a.size)
    .map(file => file.file);

  const chunkedDataArray = new Array(numOfParallelProcessesAvailable);
  for (let i = 0; i < numOfParallelProcessesAvailable; i += 1) {
    chunkedDataArray[i] = [];
  }

  sortedDataArrayBySize.forEach((file, index) => {
    chunkedDataArray[index % numOfParallelProcessesAvailable].push(file);
  });

  return {
    chunkedDataArray,
    numOfParallelProcessesToFork: numOfParallelProcessesAvailable,
  };
}

// require('v8').setFlagsFromString('--expose_gc');
// global.gc = require('vm').runInNewContext('gc');

export const ParallelExecutor = (absoluteFilePathToExecute, dataArray, extraParams) => new Promise((resolve, reject) => { //eslint-disable-line import/prefer-default-export
  if (!absoluteFilePathToExecute || !dataArray) {
    throw new Error('Please pass arguments correctly');
  }

  const { chunkedDataArray, numOfParallelProcessesToFork } = getChunkedData(dataArray, NUMBER_OF_PARALLEL_PROCESSES);

  const promises = [];

  const execArgvsForProcesses = process.execArgv.slice().reverse(); //do not mutate since that causes issues for child processes which do not receive execArgvs

  _times(numOfParallelProcessesToFork, processIndex => { // processIndex (simple iteration index) is different than proces identifier (PID, given by OS)
    const _promise = new Promise(_resolve => {
      //https://github.com/nodejs/node/issues/2812#issuecomment-139510782
      const compute = fork(absoluteFilePathToExecute, { execArgv: execArgvsForProcesses });

      compute.send({
        data: chunkedDataArray[processIndex],
        processIndex,
        params: extraParams,
      });

      compute.on('message', message => console.log(message));

      compute.on('exit', exitCode => {
        if (exitCode !== 0) {
          throw new Error('Error in parallel execution');
        }
        _resolve();
      });
    });

    promises.push(_promise);
  });

  Promise.all(promises)
    .then(resolve, reject);
});
