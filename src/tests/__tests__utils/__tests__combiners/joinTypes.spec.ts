import utils from 'utils';
import {
  TYPE_NAMES,
  CONVENTIONAL_NAMES,
} from 'consts'
import { gitmojis } from '../../fixtures/testFile.json'

test('returns author\'s gitmojis names, if the user config is not provided', async () => {
  const result = await utils.joinTypes(gitmojis);
  const resultEmojiNames = result.map(({ name }) => name);
  const authorEmojiNames = TYPE_NAMES.map(([_, name]) => name);
  expect(resultEmojiNames).toEqual(authorEmojiNames);
})

test('returns author\'s gitmojis names, if the user type list is of a wrong format', async () => {
  // @ts-ignore
  const result = await utils.joinTypes(gitmojis, { types: {} });
  const resultEmojiNames = result.map(({ name }) => name);
  const authorEmojiNames = TYPE_NAMES.map(([_, name]) => name);
  expect(resultEmojiNames).toEqual(authorEmojiNames);
})

test('throws if any of user types is corrupted', async () => {
  await expect(utils.joinTypes(gitmojis, {
    types: [
      // @ts-ignore
      {
        name: '12',
        description: '12345',
        code: ':code:'
      }
    ]
  })).rejects.toThrowError('emoji is a required field');
  await expect(utils.joinTypes(gitmojis, {
    types: [
      // @ts-ignore
      {
        emoji: '=)',
        name: '1',
        description: '12345',
        code: ':code:'
      }
    ]
  })).rejects.toThrowError('name must be at least 2 characters');
  // etc. See tests for validation
})

test('returns only user types', async () => {
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
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    replaceTypes: true
  });
  expect(result).toEqual(userTypes);
})

test('joins all gitmojis and user types', async () => {
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
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = userTypes.map(({ code }) => code);
  const gitmojisCodes = gitmojis.map(({ code }) => code);
  expect(resultCodes).toEqual([...gitmojisCodes, ...userTypesCodes]);
})

test('joins only selected gitmojis and user types', async () => {
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
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    selectedTypesByCode: [':art:', ':coffin:']
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = userTypes.map(({ code }) => code);
  const selectedGitmojisCodes = gitmojis.filter(({ code }) => {
    return code === ':art:' || code === ':coffin:'
  }).map(({ code }) => code);
  expect(resultCodes).toEqual([...selectedGitmojisCodes, ...userTypesCodes]);
})

test('joins gitmojis and user types,\
but changes names of some gitmojis types', async () => {
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
  const typeNamesByCode = {
    ':art:': 'lavoila',
    ':coffin:': 'dead',
  };
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    typeNamesByCode,
  });
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const coffinNameFromResult = result.find(({ code }) => code === ':coffin:')!.name

  expect(artNameFromResult).toEqual(typeNamesByCode[':art:'])
  expect(coffinNameFromResult).toEqual(typeNamesByCode[':coffin:'])
})

test('joins some gitmojis and user types,\
but changes names of only selected gitmojis types', async () => {
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
  // @ts-ignore
  const authorsTypesMap = new Map(TYPE_NAMES)
  const typeNamesByCode = {
    ':art:': 'lavoila',
    ':coffin:': 'dead',
  };
  const selectedTypesByCode = [':art:', ':zap:', ':fire:'];
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    typeNamesByCode,
    selectedTypesByCode
  });
  expect(result).toHaveLength(5);
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const zapNameFromResult = result.find(({ code }) => code === ':zap:')!.name
  const fireNameFromResult = result.find(({ code }) => code === ':fire:')!.name
  const coffinTypeFromResult = result.find(({ code }) => code === ':coffin:')


  expect(coffinTypeFromResult).toBeUndefined();
  expect(artNameFromResult).toEqual(typeNamesByCode[':art:']);
  expect(zapNameFromResult).toEqual(authorsTypesMap.get(':zap:'));
  expect(fireNameFromResult).toEqual(authorsTypesMap.get(':fire:'));
})

test('joins and changes names of some gitmojis types,\
but opts for a user type with the same code', async () => {
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
  ];
  const typeNamesByCode = {
    ':art:': 'lavoila',
    ':coffin:': 'dead',
  };
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    typeNamesByCode,
  });
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const coffinNameFromResult = result.find(({ code }) => code === ':coffin:')!.name

  expect(artNameFromResult).toEqual(userTypes[0].name)
  expect(coffinNameFromResult).toEqual(typeNamesByCode[':coffin:'])
})

test('joins selected gitmojis types with user names and user types,\
but opts for a user type with the same code', async () => {
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
  ];
  // @ts-ignore
  const authorsTypesMap = new Map(TYPE_NAMES)
  const typeNamesByCode = {
    ':art:': 'lavoila',
    ':coffin:': 'dead',
  };
  const selectedTypesByCode = [':art:', ':zap:', ':fire:'];
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    typeNamesByCode,
    selectedTypesByCode
  });
  // notice that one of userTypes replaces one of gitmojis types
  expect(result).toHaveLength(4);
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const zapNameFromResult = result.find(({ code }) => code === ':zap:')!.name
  const fireNameFromResult = result.find(({ code }) => code === ':fire:')!.name
  const coffinTypeFromResult = result.find(({ code }) => code === ':coffin:')


  expect(coffinTypeFromResult).toBeUndefined();
  expect(artNameFromResult).toEqual(userTypes[0].name);
  expect(zapNameFromResult).toEqual(authorsTypesMap.get(':zap:'));
  expect(fireNameFromResult).toEqual(authorsTypesMap.get(':fire:'));
})

test('returns only user types and ignores usePack option', async () => {
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
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    replaceTypes: true,
    usePack: 'conventional'
  });
  expect(result).toEqual(userTypes);
})

test('returns merged types and ignores usePack option', async () => {
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
  const result = await utils.joinTypes(gitmojis, {
    types: userTypes,
    usePack: 'conventional'
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = userTypes.map(({ code }) => code);
  const gitmojisCodes = gitmojis.map(({ code }) => code);
  expect(resultCodes).toEqual([...gitmojisCodes, ...userTypesCodes]);
})

test('returns conventional pack of gitmojis, when usePack option tells so', async () => {
  const conventionalEntries = Object.entries(CONVENTIONAL_NAMES);
  const result = await utils.joinTypes(gitmojis, {
    usePack: 'conventional'
  });
  const resultEntries = result.map(({ code, name }) => [code, name])

  expect(resultEntries).toEqual(expect.arrayContaining(conventionalEntries));
})
