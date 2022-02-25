import messages from './messages.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage( tabId, {
      message: messages.URL_CHANGE,
      url: changeInfo.url
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.urls) {
          //request.urls is the array of urls from popup.js
          request.urls.map(url => {
            chrome.tabs.create({url})
          })
      }
  }
);