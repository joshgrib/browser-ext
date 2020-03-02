export default {
  name: 'BB PR diff totals',
  runFor: function (url) {
    return url.includes('bitbucket.org') && url.includes('/pull-requests/')
  },
  run: function () {
    const selector = '[aria-label="File tree"] a div:last-child>span[data-testid!="file-tree-file__comments"]';
    const diffCounts = $(selector).toArray().map(d => d.innerText);
    const asbSum = (acc, current) => (+acc) + Math.abs(+current);
    const fileTreeButton = $('[aria-label="File tree"] button:first')[0];
    $('#pr-total-counts').remove();
    const deletions = diffCounts.filter(d => d[0] === '-').reduce(asbSum, 0);
    const additions = diffCounts.filter(d => d[0] === '+').reduce(asbSum, 0);
    $(fileTreeButton).find('span>span>span').parent().append(
      `<span id="pr-total-counts">
        <span style="color: red;">-${ deletions } </span>
        <span style="color: green;">+${ additions }</span>
        <span style="color: grey;">(${ (deletions / ( deletions + additions) * 100).toFixed(0) }% removals)</span>
      </span>`
    );
  }
}
