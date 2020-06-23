export default {
    name: 'BB diff total',
    runFor: function (url) {
      return url.includes('bitbucket.org') && url.includes('#diff');
    },
    run: function () {
      const selector = '.lines-added, .lines-removed';
      const diffCounts = $(selector).toArray().map(d => d.innerText);
      const asbSum = (acc, current) => (+acc) + Math.abs(+current);
      const deletions = diffCounts.filter(d => d[0] === '-').reduce(asbSum, 0);
      const additions = diffCounts.filter(d => d[0] === '+').reduce(asbSum, 0);
      $('#diff-total-counts').remove();
      $('#commit-files-summary').prepend(
        `<b id="diff-total-counts">
          <span style="color: red;">-${ deletions } </span>
          <span style="color: green;">+${ additions }</span>
          <span style="color: grey;">(${ additions - deletions } Δ)</span>
        </b>`
      );
    }
  }