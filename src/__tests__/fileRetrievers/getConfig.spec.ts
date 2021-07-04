import { ConfigType } from 'types';
import {
  DEFAULT_CONFIG,
  TYPE_NAMES,
} from 'consts';

import * as utils from '../../utils/fileRetrievers/loadConfig';
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

afterEach(() => {
  jest.resetAllMocks();
})

test('calls loadGitmoji and loadConfigFromUserRoot', async () => {
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot')
  const loadConfigSpy = jest.spyOn(utils, 'loadConfig')
  await utils.getConfig();
  expect(loadConfigFromUserRootSpy).toHaveBeenCalled();
  expect(loadConfigSpy).toHaveBeenCalled();
})

test('returns default config, if a user config was not found', async () => {
  const { defaultResultConfig } = setup();
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot')
  loadConfigFromUserRootSpy.mockResolvedValue(null)

  const result = await utils.getConfig();
  expect(result).toEqual(defaultResultConfig);
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
  });
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot')
  loadConfigFromUserRootSpy.mockResolvedValue(baseUserConfig)

  await expect(utils.getConfig())
    .rejects
    .toThrowError('emoji is a required field');
})

test('reads user config with user types and returs combined config with\
selected gitmojitypes with changed type names', async () => {
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

  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot')
  loadConfigFromUserRootSpy.mockResolvedValue(baseUserConfig)

  const result = await utils.getConfig();

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
