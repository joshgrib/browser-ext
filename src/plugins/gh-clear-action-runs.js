export default {
  name: 'Github clear action runs',
  runFor: function (url) {
    const workflowsToDelete = [
      'check-ui-code.yml',
      'Python-workflow.yml',
      'bc-test.yml',
      'Package-File-test.yml',
    ];
    return url.includes('github.com') && workflowsToDelete.filter(w => url.includes(w)).length > 0;
  },
  run: function () {
    document.getElementsByClassName('timeline-comment-action btn-link')[0].click()
    document.getElementsByClassName('dropdown-item btn-link menu-item-danger btn-link')[0].click()
    document.getElementsByClassName('Button--danger Button--medium Button Button--fullWidth')[0].click()
  }
}
