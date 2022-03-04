export default {
    name: 'BB hide "Recent Repos"',
    runFor: function (url) {
      return url.includes('bitbucket.org/dashboard/overview');
    },
    run: function () {
      // 'recent repos' is the first 'section' on the page
      const recentRepos = document.querySelector('section');
      recentRepos.style.display = 'none';
      // reduce margin on the PR list header
      const prListHeader = recentRepos.nextElementSibling;
      prListHeader.style.marginTop = '0';
    }
  }
  