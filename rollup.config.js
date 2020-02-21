import json from '@rollup/plugin-json';

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/content.bundle.js'
  },
  plugins: [json()]
}, {
  input: 'src/background.js',
  output: {
    file: 'dist/background.bundle.js'
  }
}];
