import { FormatIssuesType } from 'types';

export const formatIssues: FormatIssuesType = (issues = '', config) => {
  if (issues.length === 0) {
    return '';
  }
  const hasCommas = /,\s/.test(issues);
  let issuesItems = hasCommas ? issues.split(', ') : issues.split(' ');

  if (config.issuesPrefix) {
    try {
      // if issuesPrefix is a valid url, use its href 
      const { href } = new URL(config.issuesPrefix);
      issuesItems = issuesItems.map((issue) => href + issue)
    } catch (error) {
      // if issuesPrefix wasn't validated by URL constructor
      // the just prepend it to issue
      issuesItems = issuesItems.map((issue) => config.issuesPrefix + issue)
    }

  }

  return 'See issues: ' + issuesItems.join(', ');
}
