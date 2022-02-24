import plugins from './plugins/index.js';
import { name, version } from '../package.json';
import messages from './messages.js';

const runPlugins = () => {
  const pluginsToRun = plugins.filter(({ runFor }) => {
    switch (typeof runFor) {
      case 'function': return runFor(document.URL);
      case 'string': return document.URL.includes(runFor);
      default: throw `Expected [string, function] for \`runFor\`, recieved '${typeof runFor}'.`
    }
  });
  if (pluginsToRun.length === 0) return;
  console.group(`${name} v${version}`);
  pluginsToRun.map(p => {
    console.log(`Running '${p.name}'...`)
    try {
      p.run()
    } catch (e) {
      console.error(e);
    }
    setInterval(p.run, 2000);
  });
  console.groupEnd(`${name} v${version}`);
}

chrome.runtime.onMessage.addListener(request => {
  if (request.message === 'plugins-enabled') {
    runPlugins();
  }
  if (request.message === messages.URL_CHANGE) {
    runPlugins();
  }
});
