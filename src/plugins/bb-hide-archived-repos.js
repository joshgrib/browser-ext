const archivedSubstring = '(archived)'

export default {
  name: 'BB hide archived repos',
  runFor: function (url) {
    return url === 'https://bitbucket.org/dashboard/overview'
  },
  run: function () {
    const table = $('table')[1];
    const repos = $(table).find('tr')
    for(let i=0; i<repos.length; i++) {
      if (repos[i].innerText.includes(archivedSubstring)) {
        $(repos[i]).hide();
      }
    }
  }
}
