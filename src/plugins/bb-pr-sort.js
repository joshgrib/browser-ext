export default {
  name: 'BB PR sort',
  runFor: function (url) {
    return url === 'https://bitbucket.org/dashboard/overview';
  },
  run: function () {
    const prsToReview = $('table')[0]
    const prs = $(prsToReview).find('tr[data-qa="pull-request-row"][data-sorted!="true"]');
    for (let i = 0; i<prs.length; i++) {
      const pr = prs[i];
      const subtitle = $(pr).find('small')[0];
      const repoLink = $(subtitle).find('a')[1];
      const repoName = repoLink.innerText.toLowerCase();

      if (repoName === 'mvc') {
        $(prsToReview).find('tbody').prepend(pr);
      }
      if (repoName === 'backend') {
        $(prsToReview).find('tbody').append(pr);
      }

      $(pr).attr('data-sorted', true);
    }
  }
}
