/**
 * This file has the JS code for the extension popup when you click the icon
 * in the toolbar
 */

const openTabs = {
  /**
   * Open a URL in the current rab
   * @param {string} url The URL to open
   */
  current (url) {
    chrome.tabs.update({ url });
  },
  /**
   * Open an array of URLs in new tabs
   * @param {string[]} urls An array of URLs to open
   */
  new (urls) {
    chrome.runtime.sendMessage({ urls });
  }
}

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
 * Create the dynamic contents of the popup
 */
const createPopupContent = () => {
  const container = document.getElementById('popup-body');
  container.append(makeElem({
    tag: 'button',
    innerText: 'Go to extension page to update',
    click: () => {
      openTabs.current('chrome://extensions');
    }
  }));
  container.append(makeElem({
    tag: 'button',
    innerText: 'Open deployment homepage',
    click: () => {
      openTabs.new(['http://sphereboardqa05.spheredemo.corp']);
    }
  }));
}

document.addEventListener('DOMContentLoaded', createPopupContent);
