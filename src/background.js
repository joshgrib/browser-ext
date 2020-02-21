import messages from './messages.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage( tabId, {
      message: messages.URL_CHANGE,
      url: changeInfo.url
    });
  }
});
