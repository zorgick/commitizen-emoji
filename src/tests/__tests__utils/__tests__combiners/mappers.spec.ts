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
  const result = utils.mapTypeNames(testFile.gitmojis as GitmojiObjectType[], null)
  expect(result).not.toBeNull();
  const newNames = result.map(({ name }) => name);
  const preferedNames = TYPE_NAMES.map(([_, name]) => name);
  expect(newNames).not.toEqual([...preferedNames, 'lala']);
  expect(newNames).toEqual(preferedNames);
})

test('throws if one of user type names is not a string', () => {
  expect(() => utils.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    { ':art:': true } as any
  )).toThrowError(ERROR_TYPE_NAME_FORMAT(true))
})

test('throws if one of user emoji codes is not valid', () => {
  expect(() => utils.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    { 'art:': 'name' } as any
  )).toThrowError(ERROR_MISSING_EMOJI_CODE('art:'))
  expect(() => utils.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    { ':sth:': 'name' } as any
  )).toThrowError(ERROR_MISSING_EMOJI_CODE(':sth:'))
})

test('returns user redefined type names', () => {
  const userTypeNames = {
    ':art:': 'voila',
    ':coffin:': 'dead',
  }
  const result = utils.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    userTypeNames
  )
  expect(result).not.toBeNull();
  const newNames = result.filter(({ code, }) =>
    code === ':art:' || code === ':coffin:'
  );
  const artName = newNames.find(({ code }) => code === ':art:')!.name;
  const coffinName = newNames.find(({ code }) => code === ':coffin:')!.name;
  expect(artName)
    .not
    .toEqual(testFile.gitmojis.find(({ code }) => code === ':art:')!.name);
  expect(coffinName)
    .not
    .toEqual(testFile.gitmojis.find(({ code }) => code === ':coffin:')!.name);
  expect(artName).toEqual(userTypeNames[':art:']);
  expect(coffinName).toEqual(userTypeNames[':coffin:']);
})