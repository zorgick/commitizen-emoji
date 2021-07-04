import utils from 'utils';
import {
  TYPE_NAMES,
  ERROR_TYPE_NAME_FORMAT,
  ERROR_MISSING_EMOJI_CODE,
} from 'consts';

// @ts-ignore
const defaultTypeNames = new Map(TYPE_NAMES);

test('throws on wrong types of a type name', () => {
  expect(() => utils.validateUserTypeName([':any:', true], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(true))
  expect(() => utils.validateUserTypeName([':any:', undefined], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(undefined))
  expect(() => utils.validateUserTypeName([':any:', 2], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(2))
  expect(() => utils.validateUserTypeName([':any:', {}], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT({}))
  expect(() => utils.validateUserTypeName([':any:', []], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT([]))
  expect(() => utils.validateUserTypeName([':any:', () => { }], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(() => { }))
  expect(() => utils.validateUserTypeName([':any:', null], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(null))
  expect(() => utils.validateUserTypeName([':any:', NaN], defaultTypeNames))
    .toThrowError(ERROR_TYPE_NAME_FORMAT(NaN))
})

test('throws on a missing code name', () => {
  expect(() => utils.validateUserTypeName([':any:', 'test'], defaultTypeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(':any:'))
})

test('throws on a incorrect code name format', () => {
  expect(() => utils.validateUserTypeName(['art:', 'test'], defaultTypeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE('art:'))
  expect(() => utils.validateUserTypeName([':art', 'test'], defaultTypeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(':art'))
  expect(() => utils.validateUserTypeName(['art', 'test'], defaultTypeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE('art'))
})

test('passes validation', () => {
  expect(utils.validateUserTypeName([':art:', 'test'], defaultTypeNames))
    .toEqual(undefined)
})
