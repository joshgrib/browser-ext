export default {
  name: 'Github clear action runs',
  runFor: function (url) {
    const workflowsToDelete = [
      'check-ui-code.yml',
      'Python-workflow.yml',
      'bc-test.yml',
      'Package-File-test.yml',
      'azbridge-Deploy.yml',
      'Appconfig-Deploy.yml',
      'component.yml',
      'connectors.yml',
      'Test.yml',
      'TestBuildMVC.yml',
    ];
    return url.includes('github.com') && workflowsToDelete.filter(w => url.includes(w)).length > 0;
  },
  run: function () {
    const selectors = [
      // open menu for latest action
      'timeline-comment-action btn-link',
      // delete workflow run
      'dropdown-item btn-link menu-item-danger btn-link',
      // confirm
      'Button--danger Button--medium Button Button--fullWidth'
    ];
    selectors.forEach(s => document.getElementsByClassName(s)[0].click());
  }
}
