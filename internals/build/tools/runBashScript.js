import { exec } from 'child_process';

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    const start = new Date();
    console.log(`[${format(start)}] Starting '${cmd}'...`);
    exec(cmd, (err, stdout, stderr) => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      if (err) {
        console.error(`[${format(end)}] Error in '${cmd}' -`);
        console.error(err);
        reject(err);
      } else {
        console.log(`[${format(end)}] Finished '${cmd}' after ${time} ms`);
        if(stdout) console.log(stdout);
        if(stderr) console.error(stderr);
        resolve(stdout);
      }
    });
  });
}

export default sh;
