import lib from 'lib';

test('returns empty string if scope is empty', () => {
  expect(lib.formatScopeOption('')).toEqual('');
})

test('returns empty string if scope consists of blank spaces or new lines', () => {
  expect(lib.formatScopeOption('       ')).toEqual('');
  expect(lib.formatScopeOption('\n\n')).toEqual('');
  expect(lib.formatScopeOption('\r\r')).toEqual('');
})

test('returns scope in parentheses, if scope is specified', () => {
  expect(lib.formatScopeOption('test')).toEqual('(test)');
})

test('trims blank spaces aroung scope', () => {
  expect(lib.formatScopeOption('   test   ')).toEqual('(test)');
})
