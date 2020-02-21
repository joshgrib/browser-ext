import plugins from './plugins/index.js';
import { version } from '../package.json';
import messages from './messages.js';

const runPlugins = () => {
  const url = document.URL;
  for (let plugin of plugins) {
    if (plugin.runFor(url)) {
      console.group(`Josh's extension v${version}`);
      console.log(`Running '${plugin.name}'...`)
      plugin.run();
      console.groupEnd(`Josh's extension v${version}`);
    }
  }
}
runPlugins();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === messages.URL_CHANGE) {
      runPlugins();
    }
});
