var exec = require("child_process").exec;

var _temp = require("@actions/core");

var getInput = _temp.getInput;
var setOutput = _temp.setOutput;
var setFailed = _temp.setFailed;

try {
  var urlPrefix = getInput('url-prefix');
  var apiToken = getInput('api-token');
  exec('git diff --name-only HEAD~1', function (error, stdout, stderr) {
    if (error) {
      throw 'exec error:' + error.message;
    }

    if (stderr) {
      throw 'error running git diff: ' + stderr;
    }

    var diffFiles = stdout.split('\n').filter(function (x) {
      return x.length;
    });
    setOutput("purged_file_count", diffFiles.length);
  });
} catch (error) {
  setFailed(error.message);
}
