import { getInput, setOutput, setFailed } from '@actions/core';
import { exec } from 'child_process';

try {
  const urlPrefix = getInput('url-prefix');
  const apiToken = getInput('api-token');
  const gitPath = process.env.GITHUB_WORKSPACE || '.';

  exec(`git diff --name-only HEAD~1`,
    {
      cwd: gitPath,
    },
    (error, stdout, stderr) => {
      if (error) {
        throw('exec error:' + error.message)
      }
      if (stderr) {
        throw('error running git diff: ' + stderr);
      }

      const diffFiles = stdout.split('\n').filter((x) => x.length)
      setOutput("purged_file_count", diffFiles.length);
    }
  );
} catch (error) {
  setFailed(error.message);
}
