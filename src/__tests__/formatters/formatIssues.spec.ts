import lib from 'lib';
import { ConfigType } from 'types';

import testConfig from '../fixtures/fullTestConfig.json';

const setup = (adjustedConfig?: Partial<ConfigType>) => {
  const config: ConfigType = {
    ...testConfig as ConfigType,
    ...adjustedConfig,
  };

  return {
    config,
    prefix: 'See issues: ',
  };
}

test('returns an empty string if no string was provided', () => {
  const url = 'https://test.com';
  const { config } = setup({
    issuesPrefix: url
  })
  expect(lib.formatIssues(undefined, config)).toEqual('');
})

test('returns an empty string if issues are empty', () => {
  const url = 'https://test.com';
  const { config } = setup({
    issuesPrefix: url
  })
  const testIssues = '';
  expect(lib.formatIssues(testIssues, config)).toEqual(testIssues);
})

test('returns issues numbers without prefix (user uses coma)', () => {
  const { config, prefix } = setup()
  const testIssues = '13123-asf123, 123123, ass1jJiasd123';
  expect(lib.formatIssues(testIssues, config)).toEqual(prefix + testIssues);
})

test('returns issues numbers without prefix (user uses blank space)', () => {
  const { config, prefix } = setup()
  const testIssues = '13123-asf123 123123 ass1jJiasd123';
  expect(lib.formatIssues(testIssues, config))
    .toEqual(prefix + testIssues.split(' ').join(', '));
})

test('returns issues numbers prepended with a prefix as a valid url (from root)', () => {
  const url = 'https://test.com';
  const { config, prefix } = setup({
    issuesPrefix: url
  })
  const testIssues = '13123-asf123 123123 ass1jJiasd123';
  expect(lib.formatIssues(testIssues, config))
    .toEqual(
      prefix + testIssues
        .split(' ')
        .map((issue) => url + '/' + issue)
        .join(', ')
    );
})

test('returns issues numbers prepended with a prefix as a valid url (in query params)', () => {
  const url = 'https://test.com?jql=';
  const { config, prefix } = setup({
    issuesPrefix: url
  })
  const testIssues = '13123-asf123 123123 ass1jJiasd123';
  expect(lib.formatIssues(testIssues, config))
    .toEqual(
      prefix + testIssues
        .split(' ')
        .map((issue) => url.split('?').join('/?') + issue)
        .join(', ')
    );
})

test('returns issues numbers prepended with a non-url string', () => {
  const customString = 'test-';
  const { config, prefix } = setup({
    issuesPrefix: customString
  })
  const testIssues = '13123-asf123 123123 ass1jJiasd123';
  expect(lib.formatIssues(testIssues, config))
    .toEqual(
      prefix + testIssues
        .split(' ')
        .map((issue) => customString + issue)
        .join(', ')
    );
})
