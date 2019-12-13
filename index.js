const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('child_process').exec;

try {
  const project = core.getInput('project');
  const passwd = core.getInput('password');
  const profile = core.getInput('publish-profile');
  const config = core.getInput('configuration');

  const cmd = `MSBuild.exe ${project} 
  -p:DeployOnBuild=True
  -p:Password=${passwd}
  -p:PublishProfile="${profile}"
  -p:Configuration=${config}`;

  var child = exec(cmd,
    function (error, stdout, stderr) {
      console.log(`stdout: ${stdout}\nstderr: ${stderr}\n`);
      if (error != null) {
        core.setFailed(error.message);
      }
    });
} catch (error) {
  core.setFailed(error.message);
}
