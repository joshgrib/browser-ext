export default {
  name: 'Github clear action runs',
  runFor: function (url) {
    return url.includes('github.com') && url.includes('check-ui-code.yml');
  },
  run: function () {
    document.getElementsByClassName('timeline-comment-action btn-link')[0].click()
    document.getElementsByClassName('dropdown-item btn-link menu-item-danger btn-link')[0].click()
    document.getElementsByClassName('Button--danger Button--medium Button Button--fullWidth')[0].click()
  }
}
