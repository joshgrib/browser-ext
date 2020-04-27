export default {
  name: 'BB close PR source branch',
  runFor: function (url) {
    return url.includes('bitbucket.org') && url.includes('/pull-requests/');
  },
  run: function () {
    setInterval(() => {
      const btn = $('input[name="close-source-branch-checkbox"]')[0];
      console.log({ btn });
      if (btn && !btn.checked) {
        $(btn).click();
      }
    }, 250);
  }
}