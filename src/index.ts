import core from '@actions/core'

try {
  const urlPrefix = core.getInput('url-prefix');
  const apiToken = core.getInput('api-token');

  core.setOutput("purged_file_count", 0);
} catch (error) {
  core.setFailed(error.message);
}
