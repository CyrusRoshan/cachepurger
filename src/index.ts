import { getInput, setOutput, setFailed } from '@actions/core'

try {
  const urlPrefix = getInput('url-prefix');
  const apiToken = getInput('api-token');

  setOutput("purged_file_count", 0);
} catch (error) {
  setFailed(error.message);
}
