/**
 * Rename some labels in a login portal to give them friendlier names
 */
export default {
  name: 'GS NDS Rename',
  runFor: function (url) {
    return url.includes('login.gs.com');
  },
  run: function () {
    const names = document.getElementsByClassName('nds-name ng-binding');
    const rename = {
      'DCNDS0155816': 'Old and full',
      'DCNDS0252123': 'Use me! :D'
    };
    for(let i=0; i<names.length; i++) {
      const n = names[i];
      n.innerText = rename[n.innerText] || n.innerText;
    }
  }
}

