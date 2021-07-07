import lib from 'lib';

test('returns an empty string', () => {
  const testString = '    ';
  expect(lib.formatCommitBody(testString, 3)).toEqual('');
})

test('preserves new lines of commit body', () => {
  const testString = '012 34\n567 89';
  expect(lib.formatCommitBody(testString, 3)).toEqual('012 34\n567 89');
})

test('adds new lines to a commit body according to terminal width', () => {
  const testString = '012 345 67 89';
  expect(lib.formatCommitBody(testString, 3)).toEqual('012\n345\n67\n89');
})

test('removes trailing blank spaces', () => {
  const testString1 = '     012 345 67 89    ';
  const testString2 = '     012 34\n567 89       ';
  expect(lib.formatCommitBody(testString1, 3)).toEqual('012\n345\n67\n89');
  expect(lib.formatCommitBody(testString2, 3)).toEqual('012 34\n567 89');
})
