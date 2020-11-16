/**
 * This file has the JS code for the extension popup when you click the icon
 * in the toolbar
 */


/**
 * Get an array of integers [1, 2, ..., n]
 * @param {number} n - The amount of elements in the array
 */
const range = n => new Array(n).fill().map((x, i) => i+1);

/**
 * A helper method to create nested DOM elements
 * @param {string} tag - The tag for the element
 * @param {array} children - The child elements, also passed into this function
 * @param {string} innerText - The innerText property for the element
 * @param {function} click - A `click` event handler
 */
const makeElem = ({tag, innerText, click, children=[]}) => {
  const elem = document.createElement(tag);
  if (innerText) {
    elem.innerText = innerText;
  }
  if (click) {
    elem.addEventListener('click', click);
  }
  children.map(c => {
    const child = makeElem(c);
    elem.append(child);
  })
  return elem;
}

/**
 * Open the tab(s) for a repo
 * @param {string} env - The environment to open (QA01-QA20)
 * @param {string} tab - The tab to open, ('Env' for the deployment, a repo for the pipeline, or 'All')
 * @param {array} repos - The list of repos that there are pipelines for
 */
const openTabs = (env, tab, repos) => {
  const urls = {
    deployment: env => `http://sphereboardqa05.spheredemo.corp/${env}`,
    jenkins: (env, repo) => `http://build-server:8080/blue/organizations/jenkins/mvc%2F${repo}/activity/?branch=${env}`
  };
  if (tab === 'Env') {
    chrome.runtime.sendMessage({
      urls: [urls.deployment(env)]
    })
  } else if (tab === 'All') {
    chrome.runtime.sendMessage({
      urls: [
        urls.deployment(env),
        ...repos.map(r => urls.jenkins(env, r))
      ]
    })
  } else {
    chrome.runtime.sendMessage({
      urls: [urls.jenkins(env, tab)]
    })
  }
}

/**
 * Create the dynamic contents of the popup
 * @param {number} qaSiteCount - The amount of QA sites to make buttons for
 */
const createPopupContent = (qaSiteCount) => {
  const container = document.getElementById('popup-body');
  container.append(makeElem({
    tag: 'button',
    innerText: 'Open extension page to update',
    click: () => {
      chrome.tabs.update({ url: 'chrome://extensions' });
    }
  }));

  const repos = ['mvc', 'sphereengine', 'backend'];
  const cols = ['Env', ...repos, 'All'];
  const qaSites = range(qaSiteCount).map(i => i < 10 ? `QA0${i}` : `QA${i}`);

  container.append(makeElem({
    tag: 'table',
    children: [
      {
        tag: 'tr',
        children: cols.map(innerText => ({ tag: 'th', innerText }))
      },
      ...qaSites.map(env => ({
        tag: 'tr',
        children: cols.map(col => {
          const innerText = col === 'Env' ? env : col;
          return {
            tag: 'td',
            children: [{
              tag: 'button',
              innerText,
              click: () => { openTabs(env, col, repos) }
            }]
          };
        })
      }))
    ]
  }))
}

document.addEventListener('DOMContentLoaded', () => {
  const QA_SITE_COUNT = 20;
  createPopupContent(QA_SITE_COUNT)
})
