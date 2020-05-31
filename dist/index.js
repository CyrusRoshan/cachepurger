var _temp = require("@actions/core");

var getInput = _temp.getInput;
var setOutput = _temp.setOutput;
var setFailed = _temp.setFailed;

try {
  var urlPrefix = getInput('url-prefix');
  var apiToken = getInput('api-token');
  setOutput("purged_file_count", 0);
} catch (error) {
  setFailed(error.message);
}
