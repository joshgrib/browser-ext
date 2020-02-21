import plugins from './plugins/index.js';
import { version } from '../package.json';
import messages from './messages.js';

const runPlugins = () => {
  plugins.filter(p => p.runFor(document.URL)).map(p => {
    console.group(`Josh's extension v${version}`);
    console.log(`Running '${p.name}'...`)
    p.run()
    setInterval(p.run, 2000);
    console.groupEnd(`Josh's extension v${version}`);
  });
}
runPlugins();

chrome.runtime.onMessage.addListener(request => {
  if (request.message === messages.URL_CHANGE) {
    runPlugins();
  }
});
