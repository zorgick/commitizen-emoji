import lib from 'lib';
import { ConfigType } from 'types';
import {
  DEFAULT_CONFIG,
  TYPE_NAMES,
} from 'consts';

import { gitmojis } from '../fixtures/testFile.json';

const setup = (adjustedConfig?: Partial<ConfigType>) => {
  // @ts-ignore
  const defaultTypeNames = new Map<string, string>(TYPE_NAMES);
  const gitmojiTypes = gitmojis
    .map((gitMojiObject) => ({
      ...gitMojiObject,
      name: defaultTypeNames.get(gitMojiObject.code) as string,
    }));

  const maxNameLength = gitmojiTypes.reduce(
    (maxLength, type) => (type.name.length > maxLength ? type.name.length : maxLength),
    0
  )
  const configs: {
    config: ConfigType;
    gitmojiTypes: typeof gitmojiTypes;
    maxNameLength: number;
  } = {
    config: {
      ...DEFAULT_CONFIG,
      types: gitmojiTypes,
      ...adjustedConfig,
    },
    gitmojiTypes,
    maxNameLength,
  };

  return configs;
}

test('pads each name to the length of the longest name', () => {
  const { config, maxNameLength } = setup();
  const result = lib.selectEmojiOptions(config);
  // get the length of the substring in a type name before emoji and substract
  // 2 blank spaces hard coded in the function
  const resultNamesLengthes = result.map(({ name }) =>
    name.split(/\S+\s+[A-Z]/)[0].length - 2);
  expect(resultNamesLengthes).toEqual(expect.arrayContaining([maxNameLength]));
})

test('uses symbol instead of gitmoji code', () => {
  const types = [
    {
      emoji: "=)",
      code: ":happy:",
      description: "Happy test.",
      name: "happy",
    },
    {
      emoji: "=(",
      code: ":sad:",
      description: "Sad test.",
      name: "sad",
    },
  ];
  const expectedSymbols = types.map(({ emoji }) => emoji)
  const { config, maxNameLength } = setup({
    types,
    symbol: true,
  });
  const result = lib.selectEmojiOptions(config);
  const resultSymbols = result.map(({ value }) => value.emoji);
  expect(resultSymbols).toEqual(expectedSymbols);
})
