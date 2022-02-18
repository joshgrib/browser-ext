const densityAdjustments = [{
  classes: 'saved-search-selector',
  elemHandler: e => e.style.padding = 0
}, {
  classes: 'navigator-search query-component generic-styled',
  elemHandler: e => e.style.marginTop = 0
}, {
  classes: 'dashboard-item-title',
  elemHandler: e => e.style.padding = 0
}];

export default {
  name: 'Jira densify',
  runFor: function (url) {
    return url.includes('spheretechnologysolutions.atlassian.net/browse');
  },
  run: function () {
    densityAdjustments.map(({ classes, elemHandler }) => {
      [...document.getElementsByClassName(classes)].map(elemHandler);
    });
  }
}
