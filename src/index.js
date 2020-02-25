import plugins from './plugins/index.js';
import { name, version } from '../package.json';
import messages from './messages.js';

const runPlugins = () => {
  const pluginsToRun = plugins.filter(p => p.runFor(document.URL));
  if (pluginsToRun.length === 0) return;
  console.group(`${name} v${version}`);
  pluginsToRun.map(p => {
    console.log(`Running '${p.name}'...`)
    p.run()
    setInterval(p.run, 2000);
  });
  console.groupEnd(`${name} v${version}`);
}
runPlugins();

chrome.runtime.onMessage.addListener(request => {
  if (request.message === messages.URL_CHANGE) {
    runPlugins();
  }
});
