import lib from 'lib';
import {
  ConfigType,
  FinalFormatAnwersType,
} from 'types';

import testConfig from '../fixtures/fullTestConfig.json';

const setup = (
  adjustedAnswers?: Partial<FinalFormatAnwersType> | null,
  adjustedConfig?: Partial<ConfigType>
) => {
  const config: ConfigType = {
    ...testConfig as ConfigType,
    ...adjustedConfig,
  };
  const answers: FinalFormatAnwersType = {
    subject: 'test title',
    body: '0123\n45\n678\n9',
    issues: '123, 456, 789',
    ...adjustedAnswers,
  };

  return {
    config,
    answers,
    prefix: 'See issues: ',
    ansiEllipsis: '\u2026',
  };
}

test('truncates title, formats body with new lines, prepends issues', () => {
  // use very long subject in case terminal is very wide
  const subject = new Array(99999).fill('1').join('');
  const issuesPrefix = 'http://test.com/';
  const { prefix, config, answers, ansiEllipsis } = setup(
    {
      subject,
    },
    {
      issuesPrefix,
    }
  );
  const result = lib.finalFormat(answers, config);
  const expectedSubject = subject.substring(0, 79) + ansiEllipsis;
  const expectedIssues = prefix + answers.issues!
    .split(', ')
    .map((issue) => issuesPrefix + issue)
    .join(', ');
  const expectedResult = [expectedSubject, answers.body, expectedIssues]
    .join('\n\n')
  expect(result).toEqual(expectedResult);
});
