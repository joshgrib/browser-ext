const QA_SITE_COUNT = 20;

const range = n => new Array(n).fill().map((x, i) => i+1);
const QA_SITES = range(QA_SITE_COUNT).map(i => i < 10 ? `QA0${i}` : `QA${i}`);

const makeElem = ({tag, children=[], innerText, click}) => {
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

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('popup-body');
  container.append(makeElem({
    tag: 'botton',
    innerText: 'Open extension page to update',
    click: () => {
      chrome.tabs.update({ url: 'chrome://extensions' });
    }
  }));

  const repos = ['mvc', 'sphereengine', 'backend'];
  const cols = ['Env', ...repos, 'All'];
  container.append(makeElem({
    tag: 'table', children: [
      {
        tag: 'tr', children: cols.map(innerText => ({ tag: 'th', innerText }))
      },
      ...QA_SITES.map(env => ({
        tag: 'tr', children: cols.map(c => {
          const innerText = c === 'Env' ? env : c;
          return {
            tag: 'td', children: [{
              tag: 'button',
              innerText,
              click: () => {
                let urls = [];
                if (c === 'Env') {
                  chrome.runtime.sendMessage({
                    urls: [`http://sphereboardqa05.spheredemo.corp/${env}`]
                  })
                } else if (c === 'All') {
                  const urls = [
                    `http://sphereboardqa05.spheredemo.corp/${env}`,
                    ...repos.map(r =>
                      `http://build-server:8080/blue/organizations/jenkins/mvc%252F${r}/activity/?branch=${env}`
                    )
                  ]
                  chrome.runtime.sendMessage({ urls })
                } else {
                  chrome.runtime.sendMessage({
                    urls: [`http://build-server:8080/blue/organizations/jenkins/mvc%252F${c}/activity/?branch=${env}`]
                  })
                }
              }
            }]
          };
        })
      }))
    ]
  }))
})
