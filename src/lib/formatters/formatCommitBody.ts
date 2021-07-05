import wrap from 'wrap-ansi';
import { FormatCommitBodyType } from 'types';

export const formatCommitBody: FormatCommitBodyType = (commitBody = '', terminalColumns) => {
  const hasNewLines = /\n/.exec(commitBody);
  if (hasNewLines) {
    return commitBody.trim();
  }

  return wrap(commitBody.trim(), terminalColumns);
}
