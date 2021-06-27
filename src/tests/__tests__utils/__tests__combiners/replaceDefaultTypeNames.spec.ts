import utils from 'utils';
import {
  GitmojiObjectType,
} from 'types'
import {
  TYPE_NAMES,
  ERROR_TYPE_NAME_FORMAT,
  ERROR_MISSING_EMOJI_CODE,
} from 'consts'

import testFile from '../../fixtures/testFile.json'

test('returns default type names if user type names are not given', () => {
  const result = utils.replaceDefaultTypeNames(TYPE_NAMES)
  expect(result).not.toBeNull();
  const newNames = Array.from(result.values());
  const preferedNames = TYPE_NAMES.map(([_, name]) => name);
  expect(newNames).not.toEqual([...preferedNames, 'lala']);
  expect(newNames).toEqual(preferedNames);
});

test('throws if one of user type names is not a string', () => {
  expect(() => utils.replaceDefaultTypeNames(
    TYPE_NAMES.slice(0, 2),
    {
      ':art:': 'style',
      // @ts-ignore
      ':zap:': false
    }
  )).toThrowError(ERROR_TYPE_NAME_FORMAT(false))
})

test('throws if one of user emoji codes is not present in gitmoji set', () => {
  expect(() => utils.replaceDefaultTypeNames(
    TYPE_NAMES.slice(0, 2),
    {
      ':art:': 'style',
      'zap:': 'zap'
    }
  )).toThrowError(ERROR_MISSING_EMOJI_CODE('zap:'))
  expect(() => utils.replaceDefaultTypeNames(
    TYPE_NAMES.slice(0, 2),
    {
      ':art:': 'style',
      ':sth:': 'zap'
    }
  )).toThrowError(ERROR_MISSING_EMOJI_CODE(':sth:'))
})

test('user type names, that are out of the range of a selected set, must preserve\
author\'s type names', () => {
  const result = utils.replaceDefaultTypeNames(
    TYPE_NAMES.slice(0, 2),
    {
      ':art:': 'style',
      ':coffin:': 'zap'
    }
  )
  expect(result).not.toBeNull();
  const newNames = Array.from(result.entries());
  expect(newNames).toHaveLength(2);
  const [artEmojiCode, artEmojiName] = TYPE_NAMES.find(([code]) => code === ':art:')!;
  const [zapEmojiCode, zapEmojiName] = TYPE_NAMES.find(([code]) => code === ':zap:')!;
  expect(newNames[0][0]).toEqual(artEmojiCode);
  expect(newNames[0][1]).not.toEqual(artEmojiName);
  // user type names out of range of a selected set must preserve
  // author's type name
  expect(newNames[1][0]).toEqual(zapEmojiCode);
  expect(newNames[1][1]).toEqual(zapEmojiName);
})
