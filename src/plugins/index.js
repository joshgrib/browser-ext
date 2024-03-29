//FIXME: it'd be nice to not have to edit this file to add a new plugin
import diffTotals from './bb-pr-diff-totals.js';
import diffTotals2 from './bb-diff-total.js';
import prNotes from './bb-home-pr-notes.js';
import showAllPrs from './bb-home-show-all-prs.js';
import prSort from './bb-pr-sort.js';
import hideArchived from './bb-hide-archived-repos.js';
import closeBranch from './bb-close-pr-branch.js';
import jenkinsNoFavs from './jenkins-hide-favorites.js';
import gsNdsRename from './gs-nds-swapname.js';
import jiraDense from './jira-dense.js';
import prQaTask from './bb-pr-qa-task.js'
import ghClearActionRuns from './gh-clear-action-runs.js';

export default [
  diffTotals,
  diffTotals2,
  showAllPrs,
  prSort,
  prNotes,
  hideArchived,
  closeBranch,
  jenkinsNoFavs,
  gsNdsRename,
  jiraDense,
  prQaTask,
  ghClearActionRuns,
];
