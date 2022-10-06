const authorsToAddTask = [
  'Claudel', 'Anita', 'Josh', 'Nandini', 'Joseph'
];

const alertForMissingTask = () => {
  const authorIcon = document.querySelector('[data-qa="pr-header-author-styles"] img');
  const authorName = authorIcon.attributes.alt.value;

  let isTargetAuthor = false;
  for (let firstName of authorsToAddTask) {
    if (authorName.toLowerCase().includes(firstName.toLowerCase())) {
      isTargetAuthor = true;
    }
  }
  if (!isTargetAuthor) {
    return;
  }

  const tasks = document.querySelectorAll('ul#sidebar-tasks li label');

  let hasQATask = false;
  for (let task of tasks) {
    const [checkbox, label] = task.children;
    const isDone = checkbox.querySelector('input').checked;
    const taskName = label.innerText;
    console.log({ isDone, taskName });
    if (taskName.toLowerCase().includes('qa ')) {
      hasQATask = true;
    }
  }
  if (!hasQATask) {
    alert('No QA task!');
  }
}

export default {
  name: 'BB PR QA task',
  runInterval: 2**30, // long interval so it only runs once
  runFor: function (url) {
    return url.includes('bitbucket.org') && url.includes('/pull-requests/')
  },
  run: function () {
    // timeout to allow time for stuff to load in
    setTimeout(alertForMissingTask, 3000);
  }
}
