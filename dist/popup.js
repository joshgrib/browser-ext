document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById("update-btn")
  btn.addEventListener('click', () => {
    chrome.tabs.update({ url: 'chrome://extensions' })
  })
})
