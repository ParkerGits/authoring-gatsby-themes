const fs = require('fs');

exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = 'data';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};
