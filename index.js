const core = require('@actions/core');
const github = require('@actions/github');
const { spawn } = require('child_process');

try {
  const project = core.getInput('project');
  const password = core.getInput('password');
  const profile = core.getInput('publish-profile');
  const config = core.getInput('configuration');
  
  const msbuild = spawn("MSBuild.exe", [
    '-p:DeployOnBuild=True',
    `-p:Configuration=${config}`,
    `-p:PublishProfile="${profile}"`,
    `-p:Password=${password}`
  ]);
  
  msbuild.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} catch (error) {
  core.setFailed(error.message);
}
