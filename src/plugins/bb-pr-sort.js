/**
 * Sort PRs to review so they go MVC->DB->Backend
 */
const sortPrsToReview = () => {
  const prsToReview = $('table')[0];
  const prs = $(prsToReview).find('tr[data-qa="pull-request-row"][data-sorted!="true"]');
  for (let i = 0; i<prs.length; i++) {
    const pr = prs[i];
    const subtitle = $(pr).find('small')[0];
    const repoLink = $(subtitle).find('a')[0];
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

/**
 * Sort PRs I opened in alphabetical order so the ticket numbers are grouped together
 */
const sortMyPrs = () => {
  const myPrs = $('table')[1];
  const prs = $(myPrs).find('tr[data-qa="pull-request-row"][data-sorted!="true"]');
  let obj = {};
  for (let i = 0; i<prs.length; i++) {
    const pr = prs[i];
    let link = $(pr).find('a[data-qa="pull-request-row-link"]')[0];
    obj[`${link.innerText}-${link.href}`] = pr;
  }
  Object.keys(obj).sort().map(title => {
    const pr = obj[title];
    $(pr).attr('data-sorted', true);
    $(myPrs).find('tbody').prepend(pr);
  })
}

export default {
  name: 'BB PR sort',
  runFor: function (url) {
    return url === 'https://bitbucket.org/dashboard/overview';
  },
  run: function () {
    sortPrsToReview()
    sortMyPrs();
  }
}
