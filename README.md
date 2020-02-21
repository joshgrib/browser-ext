# browser-ext

A browser extension for me to run my own scripts on web pages to add utilities

I started with [this guide](https://thoughtbot.com/blog/how-to-make-a-chrome-extension)

To bundle and update the extension:

1. Run `yarn bundle`
2. Go to `chrome://extensions/`
3. Click `Load unpacked`
4. Select the `dist` directory in this folder

## Folder structure

* `/dist` - The directory that the extension is loaded into chrome from
    * `manifest.json` - the extension meta-data for chrome
    * `jqeury-3.4.1.slim.min.js` - adds jQuery for use in the extension
    * `*.bundle.js` - bundled extension code, generated with `rollup`
* `/src` - Source code for the extension
    * `index.js` - entry point
    * `background.js` - background code with access to more chrome APIs
    * `/plugins` - individual scripts which run depending on the URL

## Existing plugins

* **bb-home-pr-notes** - Adds notes sections under pull requests on the Bitbucket home page, notes are stored in `localStorage`
* **bb-pr-diff-totals** - In the newer PR view of Bitbucket, add the total line diff counts and display total lines added and removed
