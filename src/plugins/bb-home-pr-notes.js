export default {
  name: 'BB home page PR notes',
  runFor: function (url) {
    return url === 'https://bitbucket.org/dashboard/overview';
  },
  run () {
    const storageKey = 'bb-pr-notes-local-storage-key';
    const dataKey = 'data-pr-notes-key';

    const loadFromLocalStorage = () => {
      let savedValue = localStorage.getItem(storageKey);
      if (savedValue === null) {
        savedValue = '{}';
        localStorage.setItem(storageKey, savedValue);
      }
      return JSON.parse(savedValue);
    };
    const saveToLocalStorage = notes => {
      if (typeof notes != 'object' || notes === null) {
        throw 'Not saving to localStorage: notes must be an object';
      }
      localStorage.setItem(storageKey, JSON.stringify(notes));
    };
    const getNoteTemplate = ({ text, updated }, link) => {
      const d = new Date(updated);
      const style = 'border-bottom: 1px dashed orange;background-color: lightyellow;';
      return `
        <tr ${dataKey}="${link}" style="${ style }">
          <td colspan="12">
            <p>
              <b>Notes:</b> ${ text }
            </p>
            <p style="font-size: 0.75em; margin-top: 0;">
              <i>Updated ${ d.toLocaleDateString() } ${ d.toLocaleTimeString() }</i>
            </p>
          </td>
        </tr>
      `
    }
    function refreshNotes () {
      const noteRowSelector = `tr[${dataKey}]`;
      // clear current notes containers
      $(noteRowSelector).remove();
      // reload saved notes
      let notes = loadFromLocalStorage();
      // find the existing PRs, add the notes display row
      const prs = $('tr[data-qa="pull-request-row"]');
      for (let i = 0; i<prs.length; i++) {
        const pr = prs[i];;
        const link = $(pr).find('a[data-qa="pull-request-row-link"]').attr('href');
        // get the existing notes or add a new record
        if (notes[link] === undefined) {
          notes[link] = { text: '', updated: new Date() };
        }
        // add the PR notes containers
        $(getNoteTemplate(notes[link], link)).insertAfter(pr);
      }
      // add click listeners to update notes
      $(noteRowSelector).click(e => {
        const key = $(e.target).closest(noteRowSelector).attr(dataKey);
        let note = notes[key];
        const text = prompt(`Change note "${note.text}"`);
        const updated = new Date();
        notes[key] = { text, updated };
        saveToLocalStorage(notes);
        refreshNotes();
      });
      saveToLocalStorage(notes);
    }
    window.addEventListener('load', refreshNotes);
  }
}