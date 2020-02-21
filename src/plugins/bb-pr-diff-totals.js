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
    $(fileTreeButton).find('span>span>span').parent().append(
      `<span id="pr-total-counts">
        <span style="color: red;">-${ diffCounts.filter(d => d[0] === '-').reduce(asbSum, 0) } </span>
        <span style="color: green;">+${ diffCounts.filter(d => d[0] === '+').reduce(asbSum, 0) }</span>
      </span>`
    );
  }
}
