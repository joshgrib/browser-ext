export default {
  name: 'Jira densify',
  runFor: function (url) {
    return url.includes('spheretechnologysolutions.atlassian.net/browse');
  },
  run: function () {
    document
      .getElementsByClassName('saved-search-selector')[0]
      .style.padding = 0;
    document
      .getElementsByClassName('navigator-search query-component generic-styled')[0]
      .style.marginTop = 0;
  }
}
