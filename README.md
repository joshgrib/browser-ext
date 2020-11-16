# browser-ext

A browser extension for me to run my own scripts on web pages to add utilities

I started with [this guide](https://thoughtbot.com/blog/how-to-make-a-chrome-extension)

To bundle and update the extension:

1. Make sure `brave.exe` is available in the system PATH variable
2. Update the path to your directory in `package.json`
3. Run `yarn deploy`

## Folder structure

* `/dist` - The directory that the extension is loaded into the browser from
    * `manifest.json` - the extension meta-data for the browser
    * `jqeury-3.4.1.slim.min.js` - adds jQuery for use in the extension
    * `*.bundle.js` - bundled extension code, generated with `rollup`
    * `popup.html` - The DOM content for the extension popup in the toolbar
    * `popup.js` - JS code for the extention popup
* `/src` - Source code for the extension
    * `index.js` - entry point
    * `background.js` - background code with access to more the browser APIs
    * `/plugins` - individual scripts which run depending on the URL

## Functionality

### Extension Popup

Has buttons to open deployment environments and build pipelines, like bookmarks but one button can open multiple tabs

### Plugins

> These are all in `./src/plugins`

* **bb-close-pr-branch** - When merging a branch in bitbucket this auto-clicks the checkbox to close the source branch
* **bb-diff-total** - Adds up the lines added/removed on a diff page and shows the total count of each
* **bb-hide-archived-repos** - This looks for repos with `(Archived)` prepended and hides them from the home page
* **bb-home-pr-notes** - Adds notes sections under pull requests on the Bitbucket home page, notes are stored in `localStorage`
* **bb-home-show-all-prs** - Expands the pull requests on the home page to show them all
* **bb-pr-diff-totals** - In the newer PR view of Bitbucket, add the total line diff counts and display total lines added and removed
* **bb-pr-sort** - Sorts the pull requests for me to review to prioritize the repos I'm most familiar with
* **jenkins-hide-favorites** - On the Jenkins Blue Ocean home page, hide the table of "favorite" pipelines
