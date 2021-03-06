import truncate from 'cli-truncate'
import {
  FinalFormatType,
} from 'types';
import {
  formatCommitBody,
  formatIssues,
} from './index'
/**
 * Format the answers as a commit message
 *
 * @param {Object} answers Answers provide by `inquier.js`
 * @return {String} Formated git commit message
 */
export const finalFormat: FinalFormatType = (answers, config) => {
  /* istanbul ignore next */
  const { columns = 80 } = process.stdout

  const head = truncate(answers.subject, columns)
  const body = formatCommitBody(answers.body, columns)
  const breaking = formatCommitBody(
    /* istanbul ignore next */
    answers.breakingBody ? 'BREAKING CHANGE: ' + answers.breakingBody : undefined,
    columns
  )
  const footer = formatIssues(answers.issues, config)

  return [head, body, breaking, footer]
    .filter(Boolean)
    .join('\n\n')
    .trim()
}
