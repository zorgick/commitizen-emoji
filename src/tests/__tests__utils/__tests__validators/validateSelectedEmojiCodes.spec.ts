import utils from 'utils';
import {
  TYPE_NAMES,
  ERROR_MISSING_EMOJI_CODE,
} from 'consts';

const defaultTypeCodeNames = TYPE_NAMES.map(([code]) => code);

test('throws on a missing code name', () => {
  expect(() => utils.validateSelectedEmojiCodes(':any:', defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(':any:'));
})

test('throws on a incorrect code name format', () => {
  expect(() => utils.validateSelectedEmojiCodes('art:', defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE('art:'));
  expect(() => utils.validateSelectedEmojiCodes(':art', defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(':art'));
  expect(() => utils.validateSelectedEmojiCodes('art', defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE('art'));
  expect(() => utils.validateSelectedEmojiCodes(false, defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(false));
  expect(() => utils.validateSelectedEmojiCodes([], defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE([]));
  expect(() => utils.validateSelectedEmojiCodes({}, defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE({}));
  expect(() => utils.validateSelectedEmojiCodes(() => { }, defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(() => { }));
  expect(() => utils.validateSelectedEmojiCodes(1, defaultTypeCodeNames))
    .toThrowError(ERROR_MISSING_EMOJI_CODE(1));
})

test('returns without error on a correct emoji code', () => {
  expect(utils.validateSelectedEmojiCodes(':art:', defaultTypeCodeNames))
    .toEqual(undefined);
})
