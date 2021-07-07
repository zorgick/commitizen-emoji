import wrap from 'wrap-ansi';
import { FormatCommitBodyType } from 'types';

export const formatCommitBody: FormatCommitBodyType = (commitBody = '', terminalColumns) => {
  const hasNewLines = /\n/.exec(commitBody);
  // preserve user new lines 
  if (hasNewLines) {
    return commitBody.trim();
  }

  // wrap according to the terminal width
  return wrap(commitBody.trim(), terminalColumns);
}
