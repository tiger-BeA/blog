const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const path2ChildrenFileName = {};
glob(path.join(__dirname, './**/sidebar-menu.js'), (err, files) => {
  files.forEach((filePath) => {
    const dirName = path.relative(path.join(__dirname, './docs'), path.dirname(filePath));
    const childFiles = glob.sync(`${path.dirname(filePath)}/*.md`);
    const childIndexFiles = glob.sync(`${path.dirname(filePath)}/*/*.md`);

    path2ChildrenFileName[`/${dirName}/`] = [
      ...(path2ChildrenFileName[dirName] || []),
      ...childFiles.map((childFilePath) => path.relative(path.dirname(filePath), childFilePath).replace(/README\.md/, '').replace('\.md', '')),
      ...childIndexFiles.map((childFilePath) => path.relative(path.dirname(filePath), childFilePath).replace(/README\.md/, '').replace('\.md', '')),
    ].sort((a, b) => b.includes(a) ? -1 : 0);
  });
  const orderPath2ChildrenFileName = {};
  Object.entries(path2ChildrenFileName).sort((a, b) => a[0].includes(b[0]) ? -1 : 0).forEach(([key, value]) => {
    orderPath2ChildrenFileName[key] = value;
  })
  fs.writeFileSync(
    path.join(__dirname, './docs/.vuepress/config/sidebar.js'),
    `module.exports = ${JSON.stringify(orderPath2ChildrenFileName, null, 2)}\n`
  );
})
//
// `module.exports = {
// };
// `
