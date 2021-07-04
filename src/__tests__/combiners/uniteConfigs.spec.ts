import { ConfigType } from 'types';
import {
  DEFAULT_CONFIG,
  CONVENTIONAL_NAMES,
  TYPE_NAMES,
} from 'consts';
import utils from 'utils';

import { gitmojis } from '../fixtures/testFile.json';

const setup = (adjustedConfig?: Partial<ConfigType>) => {
  // @ts-ignore
  const defaultTypeNames = new Map<string, string>(TYPE_NAMES);
  const gitmojiTypes = gitmojis
    .map((gitMojiObject) => ({
      ...gitMojiObject,
      name: defaultTypeNames.get(gitMojiObject.code) as string,
    }));
  const baseUserConfig: Partial<ConfigType> = {
    scopes: ['user', 'config'],
    symbol: true,
    skipQuestions: ['breakingBody', 'issues'],
    questions: {
      type: 'Select user type:',
      scope: 'Select user scope:',
      subject: 'Provide a user commit title:',
      body: 'Provide a user commit description:',
    },
    subjectMaxLength: 100,
    issuesPrefix: 'https://test.com',
    conventionalFormat: true,
    ...adjustedConfig
  };
  const configs: {
    baseUserConfig: Partial<ConfigType>;
    defaultResultConfig: Partial<ConfigType>;
    gitmojiTypes: typeof gitmojiTypes;
  } = {
    baseUserConfig,
    defaultResultConfig: {
      ...DEFAULT_CONFIG,
      types: gitmojiTypes,
    },
    gitmojiTypes,
  };

  return configs;
}

test('returns default config, when user config is not provided', async () => {
  const { defaultResultConfig } = setup();
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, null, gitmojis);
  expect(result).toEqual(defaultResultConfig);
})

test('returns default config with author\'s types when user config doesn\'t have any', async () => {
  const { baseUserConfig, defaultResultConfig } = setup();
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const expectedConfig = {
    ...defaultResultConfig,
    ...baseUserConfig,
  };
  expect(result).toEqual(expectedConfig);
})

test('throws if user config has corrupted types', async () => {
  const { baseUserConfig } = setup({
    types: [
      // @ts-ignore
      {
        name: '12',
        description: '12345',
        code: ':code:'
      }
    ]
  })
  await expect(utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis))
    .rejects
    .toThrowError('emoji is a required field');
})

test('returns user config with replaced user types', async () => {
  const { baseUserConfig } = setup({
    types: [
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
    ],
    replaceTypes: true,
  });
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const expectedConfig = {
    ...DEFAULT_CONFIG,
    ...baseUserConfig,
  };
  expect(result).toEqual(expectedConfig);
})

test('returns user config with user types combined with default ones', async () => {
  const userTypes = [
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
  const { baseUserConfig, gitmojiTypes } = setup({
    types: userTypes,
  });
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const expectedConfig = {
    ...DEFAULT_CONFIG,
    ...baseUserConfig,
    types: [
      ...gitmojiTypes,
      ...userTypes
    ]
  };
  expect(result).toEqual(expectedConfig);
})

test('returns user config with user types combined with selected gitmojitypes', async () => {
  const userTypes = [
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
  const { baseUserConfig, gitmojiTypes } = setup({
    types: userTypes,
    selectedTypesByCode: [':art:', ':coffin:'],
  });
  const selectedGitmojis = gitmojiTypes.filter(
    ({ code }) => code === ':art:' || code === ':coffin:'
  )
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const expectedConfig = {
    ...DEFAULT_CONFIG,
    ...baseUserConfig,
    types: [
      ...selectedGitmojis,
      ...userTypes
    ]
  };
  expect(result).toEqual(expectedConfig);
})

test('returns user config with user types combined with selected gitmojitypes\
with changed type names', async () => {
  const userTypes = [
    {
      emoji: "=)",
      code: ":art:",
      description: "Happy test.",
      name: "happy",
    },
    {
      emoji: "=(",
      code: ":sad:",
      description: "Sad test.",
      name: "sad",
    },
    {
      emoji: "=|",
      code: ":fire:",
      description: "Beware.",
      name: "beware",
    },
  ];
  const { baseUserConfig, gitmojiTypes } = setup({
    types: userTypes,
    selectedTypesByCode: [':art:', ':coffin:', ':fire:'],
    typeNamesByCode: {
      ':coffin:': 'dead',
      // ingored, because user didn't select it above 
      ':zap:': 'flash',
      // will be renamed, but replaced later with user's type with
      // the same code 
      ':fire:': 'this-is-fine',
    }
  });
  const selectedGitmojis = gitmojiTypes.filter(
    ({ code }) => code === ':art:' || code === ':coffin:' || code === ':fire:'
  );
  const coffinGitmojiIndex = selectedGitmojis.findIndex(
    ({ code }) => code === ':coffin:'
  );
  const artGitmojiIndex = selectedGitmojis.findIndex(
    ({ code }) => code === ':art:'
  );
  const fireGitmojiIndex = selectedGitmojis.findIndex(
    ({ code }) => code === ':fire:'
  );
  // replace  gitmoji objects completely
  // @ts-ignore
  selectedGitmojis[artGitmojiIndex] = userTypes[0];
  // @ts-ignore
  selectedGitmojis[fireGitmojiIndex] = userTypes[2];
  // change only name
  // @ts-ignore
  selectedGitmojis[coffinGitmojiIndex].name = 'dead';
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const expectedConfig = {
    ...DEFAULT_CONFIG,
    ...baseUserConfig,
    types: [
      ...selectedGitmojis,
      userTypes[1]
    ]
  };
  expect(result.types).toHaveLength(4);
  expect(result).toEqual(expectedConfig);
})

test('returns user config with conventional emoji pack', async () => {
  const conventionalEntries = Object.entries(CONVENTIONAL_NAMES);
  const { baseUserConfig } = setup({
    selectedTypesByCode: [':art:', ':coffin:'],
    usePack: 'conventional',
  });
  const result = await utils.uniteConfigs(DEFAULT_CONFIG, baseUserConfig, gitmojis);
  const resultEntries = result.types.map(({ code, name }) => [code, name])
  expect(result.types).toHaveLength(9);
  expect(resultEntries).toEqual(expect.arrayContaining(conventionalEntries));
})
