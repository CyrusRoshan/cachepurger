import { getInput } from '@actions/core';
import { exec } from 'child_process';

try {
  (async () => {
    const urlPrefix = getInput('url-prefix');
    const apiToken = getInput('api-token');
    const fromCommit = getInput('from-commit') || 'HEAD~1';
    const toCommit = getInput('to-commit') || 'HEAD';
    const gitPath = process.env.GITHUB_WORKSPACE || '.';

    const diffFiles: String[] = await new Promise((resolve, reject) => {
      exec(`git diff --name-only ${fromCommit} ${toCommit}`, { cwd: gitPath },
        (error, stdout, stderr) => {
          if (error) {
            reject('exec error:' + error.message)
          }
          if (stderr) {
            reject('error running git diff: ' + stderr);
          }

          const diffFiles = stdout.split('\n').filter((x) => x.length)
          resolve(diffFiles);
        }
      );
    })

    console.log("Changed files:", diffFiles);

    // split files into groups of 30,
    // make post request
    const chunks = chunk(diffFiles, 30);
    chunks.forEach((chunk) => {
      // fetch(chunk)
      console.log('chunk:', chunk);
    })
  })()
} catch (error) {
  console.error(error.message);
}

function chunk<T>(arr: T[], max: number): T[][] {
  var chunks = [];
  while (arr.length > max) {
    chunks = [...chunks, arr.slice(0, max)];
    arr = arr.slice(max);
  }
  if (arr.length != 0) {
    chunks = [...chunks, arr];
  }
  return chunks;
}