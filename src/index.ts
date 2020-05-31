import { getInput, setOutput, setFailed } from '@actions/core';
import { exec } from 'child_process';

try {
  console.log('START');

  (async () => {
    const urlPrefix = getInput('url-prefix');
    const apiToken = getInput('api-token');
    const gitPath = process.env.GITHUB_WORKSPACE || '.';
    console.log('A')

    const diffFiles: String[] = await new Promise((resolve, reject) => {
      exec(`git diff --name-only HEAD~1`, { cwd: gitPath },
        (error, stdout, stderr) => {
          console.log('B')
          if (error) {
            reject('exec error:' + error.message)
          }
          if (stderr) {
            reject('error running git diff: ' + stderr);
          }

          console.log('C')
          const diffFiles = stdout.split('\n').filter((x) => x.length)
          resolve(diffFiles);
        }
      );
    })
    console.log('D')

    setOutput("purged_file_count", diffFiles.length);
  })()
  console.log('E')
} catch (error) {
  setFailed(error.message);
}
