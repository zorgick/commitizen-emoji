import utils from 'utils';
import {
  TYPE_NAMES,
} from 'consts'

test('returns default emoji codes if user emoji codes are not given', () => {
  const result = utils.mapSelectedCodes()
  const preferredCodes = result.map(([code]) => code);
  const defaultCodes = TYPE_NAMES.map(([code]) => code);
  expect(preferredCodes).not.toEqual([...defaultCodes, ':lala:']);
  expect(preferredCodes).toEqual(defaultCodes);
})

test('returns default emoji codes if user emoji codes are not in a list', () => {
  // @ts-ignore
  const result = utils.mapSelectedCodes({ ':art:': 'cool', ':test:': 'test' })
  const preferredCodes = result.map(([code]) => code);
  const defaultCodes = TYPE_NAMES.map(([code]) => code);
  expect(preferredCodes).not.toEqual([...defaultCodes, ':lala:']);
  expect(preferredCodes).toEqual(defaultCodes);
})

test('returns selected emoji codes', () => {
  const result = utils.mapSelectedCodes([':art:', ':coffin:', ':zap:'])
  const preferredCodes = result.map(([code]) => code);
  const defaultCodes = TYPE_NAMES
    .map(([code]) => code)
    .filter((code) =>
      code === ':art:' ||
      code === ':coffin:' ||
      code === ':zap:'
    );
  expect(preferredCodes).not.toEqual([...defaultCodes, ':lala:']);
  expect(preferredCodes).toEqual(defaultCodes);
})

test('returns selected emoji codes, ignores non-matching', () => {
  const result = utils.mapSelectedCodes([':art', ':coffin:', ':zap:', 'bug:', 'bag'])
  const preferredCodes = result.map(([code]) => code);
  const defaultCodes = TYPE_NAMES
    .map(([code]) => code)
    .filter((code) =>
      code === ':coffin:' ||
      code === ':zap:'
    );
  expect(preferredCodes).not.toEqual([...defaultCodes, ':lala:']);
  expect(preferredCodes).toEqual(defaultCodes);
})

test('returns selected emoji codes, ignores with a wrong format', () => {
  const result = utils.mapSelectedCodes([1, ':coffin:', ':zap:', true, []])
  const preferredCodes = result.map(([code]) => code);
  const defaultCodes = TYPE_NAMES
    .map(([code]) => code)
    .filter((code) =>
      code === ':coffin:' ||
      code === ':zap:'
    );
  expect(preferredCodes).not.toEqual([...defaultCodes, ':lala:']);
  expect(preferredCodes).toEqual(defaultCodes);
})
