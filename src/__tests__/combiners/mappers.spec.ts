import lib from 'lib';
import {
  GitmojiObjectType,
} from 'types'
import {
  TYPE_NAMES,
  ERROR_TYPE_NAME_FORMAT,
  ERROR_MISSING_EMOJI_CODE,
} from 'consts'

import testFile from '../fixtures/testFile.json'

test('returns default type names if user type names are not given', () => {
  const result = lib.mapTypeNames(testFile.gitmojis as GitmojiObjectType[])
  expect(result).not.toBeNull();
  const newNames = result.map(({ name }) => name);
  const preferedNames = TYPE_NAMES.map(([_, name]) => name);
  expect(newNames).not.toEqual([...preferedNames, 'lala']);
  expect(newNames).toEqual(preferedNames);
})

test('throws if one of user type names is not a string', () => {
  expect(() => lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    {
      userTypeNames: { ':art:': true } as any
    }
  )).toThrowError(ERROR_TYPE_NAME_FORMAT(true))
})

test('throws if one of user emoji codes is not valid', () => {
  expect(() => lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    {
      userTypeNames: { 'art:': 'name' } as any
    }
  )).toThrowError(ERROR_MISSING_EMOJI_CODE('art:'))
  expect(() => lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    {
      userTypeNames: { ':sth:': 'name' } as any
    }
  )).toThrowError(ERROR_MISSING_EMOJI_CODE(':sth:'))
})

test('returns a given set of selected emojis', () => {
  const selectedTypeNames = [':art:', ':bug:']
  const result = lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    { selectedTypeNames }
  )
  expect(result).not.toBeNull();
  expect(result).toHaveLength(2);
  expect(result.find(({ code }) => code === ':art:')).toBeTruthy();
  expect(result.find(({ code }) => code === ':bug:')).toBeTruthy();
})

test('returns user redefined type names', () => {
  const userTypeNames = {
    ':art:': 'voila',
    ':coffin:': 'dead',
  }
  const result = lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    { userTypeNames }
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

test('returns only selected set of gitmojis with user defined type names\
and author\'s type names for unmapped emoji codes', () => {
  const userTypeNames = {
    ':art:': 'voila',
    ':coffin:': 'dead',
  }
  const selectedTypeNames = [':art:', ':bug:']
  const result = lib.mapTypeNames(
    testFile.gitmojis as GitmojiObjectType[],
    {
      userTypeNames,
      selectedTypeNames,
    }
  )
  expect(result).not.toBeNull();
  expect(result).toHaveLength(2);
  const artEmoji = result.find(({ code }) => code === ':art:');
  const bugEmoji = result.find(({ code }) => code === ':bug:');
  expect(artEmoji).toBeTruthy();
  expect(bugEmoji).toBeTruthy();

  const artName = artEmoji!.name;
  const bugName = bugEmoji!.name;
  const [_, bugEmojiName] = TYPE_NAMES.find(([code]) => code === ':bug:')!;
  expect(artName)
    .not
    .toEqual(testFile.gitmojis.find(({ code }) => code === ':art:')!.name);
  expect(artName).toEqual(userTypeNames[':art:']);
  expect(bugName).toEqual(bugEmojiName);
})
