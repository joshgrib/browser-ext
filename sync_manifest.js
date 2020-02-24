const manifest_path = './dist/manifest.json';
var fs = require('fs');

const pkg = require('./package.json');
const manifest = require(manifest_path);

manifest.name = pkg.name;
manifest.version = pkg.version;

fs.writeFile(manifest_path, JSON.stringify(manifest, null, 2), function (err) {
  if (err) {
    console.error('Error writing to manifest.json:', err);
    process.exit(1);
  } else {
    console.log('File saved successfully!');
  }
});