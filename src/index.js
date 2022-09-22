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
    setInterval(p.run, p.runInterval || 2000);
  });
  console.groupEnd(`${name} v${version}`);
}

// handle initial page load
chrome.storage.sync.get(['pluginsEnabled'], ({pluginsEnabled}) => {
  if (pluginsEnabled) {
    runPlugins();
  }
});
// handle state toggle
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== 'sync') return;

  const { pluginsEnabled } = changes;
  if (pluginsEnabled === undefined) return;

  if (pluginsEnabled.newValue === true) {
    runPlugins();
  }
});
// handle page change
chrome.runtime.onMessage.addListener(request => {
  if (request.message === messages.URL_CHANGE) {
    runPlugins();
  }
});
