import plugins from './plugins/index.js';
import { version } from '../package.json';

const url = document.URL;

for (let plugin of plugins) {
  if (plugin.runFor(url)) {
    console.group(`Josh's extension v${version}`);
    console.log(`Running '${plugin.name}'...`)
    plugin.run();
    console.groupEnd(`Josh's extension`);
  }
}
