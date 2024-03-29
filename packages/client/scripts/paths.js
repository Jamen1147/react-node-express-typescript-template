const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  componentModule: resolvePackage('../../packages/components'),
  commonModule: resolvePackage('../../packages/common'),
  thisApp: resolvePackage('src'),
};
