export default {
  name: 'BB show all PRs on home page',
  runFor: function (url) {
    return url === 'https://bitbucket.org/dashboard/overview';
  },
  run: function () {
    $('button:contains(more...)').click();
  }
}
