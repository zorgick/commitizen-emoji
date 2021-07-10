import lib from 'lib';
import {
  GitmojiObjectType,
  StringObjectType,
} from 'types'
import {
  TYPE_NAMES,
  CONVENTIONAL_NAMES,
} from 'consts'
import { gitmojis } from '../fixtures/testFile.json'

const setup = ({
  redefinedTypes,
  redefinedTypeNames,
  redefinedSelectedTypes,
}: {
  redefinedTypes?: GitmojiObjectType[];
  redefinedTypeNames?: StringObjectType;
  redefinedSelectedTypes?: string[];
}) => {
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
  const typeNamesByCode = {
    ':art:': 'lavoila',
    ':coffin:': 'dead',
  };
  const selectedTypesByCode = [':art:', ':zap:', ':fire:'];

  return {
    types: redefinedTypes || types,
    typeNamesByCode: redefinedTypeNames || typeNamesByCode,
    selectedTypesByCode: redefinedSelectedTypes || selectedTypesByCode,
  }
}

test('returns author\'s gitmojis names, if the user config is not provided', async () => {
  const result = await lib.joinTypes(gitmojis);
  const resultEmojiNames = result.map(({ name }) => name);
  const authorEmojiNames = TYPE_NAMES.map(([_, name]) => name);
  expect(resultEmojiNames).toEqual(authorEmojiNames);
})

test('returns author\'s gitmojis names, if the user type list is of a wrong format', async () => {
  // @ts-ignore
  const result = await lib.joinTypes(gitmojis, { types: {} });
  const resultEmojiNames = result.map(({ name }) => name);
  const authorEmojiNames = TYPE_NAMES.map(([_, name]) => name);
  expect(resultEmojiNames).toEqual(authorEmojiNames);
})

test('throws if any of user types is corrupted', async () => {
  const { types: types1 } = setup({
    redefinedTypes: [
      // @ts-ignore
      {
        name: '12',
        description: '12345',
        code: ':code:'
      }
    ]
  });
  await expect(lib.joinTypes(gitmojis, { types: types1 }))
    .rejects.toThrowError('emoji is a required field');
  const { types: types2 } = setup({
    redefinedTypes: [
      // @ts-ignore
      {
        emoji: '=)',
        name: '1',
        description: '12345',
        code: ':code:'
      }
    ]
  });
  await expect(lib.joinTypes(gitmojis, { types: types2 }))
    .rejects.toThrowError('name must be at least 2 characters');
})

test('returns only user types', async () => {
  const { types } = setup({});
  const result = await lib.joinTypes(gitmojis, {
    types,
    replaceTypes: true
  });
  expect(result).toEqual(types);
})

test('joins all gitmojis and user types', async () => {
  const { types } = setup({});
  const result = await lib.joinTypes(gitmojis, {
    types,
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = types.map(({ code }) => code);
  const gitmojisCodes = gitmojis.map(({ code }) => code);
  expect(resultCodes).toEqual([...gitmojisCodes, ...userTypesCodes]);
})

test('joins only selected gitmojis and user types', async () => {
  const { types, selectedTypesByCode } = setup({
    redefinedSelectedTypes: [':art:', ':coffin:'],
  });
  const result = await lib.joinTypes(gitmojis, {
    types,
    selectedTypesByCode,
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = types.map(({ code }) => code);
  const selectedGitmojisCodes = gitmojis.filter(({ code }) => {
    return code === ':art:' || code === ':coffin:'
  }).map(({ code }) => code);
  expect(resultCodes).toEqual([...selectedGitmojisCodes, ...userTypesCodes]);
})

test('joins gitmojis and user types,\
but changes names of some gitmojis types', async () => {
  const { types, typeNamesByCode } = setup({});
  const result = await lib.joinTypes(gitmojis, {
    types,
    typeNamesByCode,
  });
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const coffinNameFromResult = result.find(({ code }) => code === ':coffin:')!.name

  expect(artNameFromResult).toEqual(typeNamesByCode[':art:'])
  expect(coffinNameFromResult).toEqual(typeNamesByCode[':coffin:'])
})

test('joins some gitmojis and user types,\
but changes names of only selected gitmojis types', async () => {
  const { types, typeNamesByCode, selectedTypesByCode } = setup({});
  // @ts-ignore
  const authorsTypesMap = new Map(TYPE_NAMES)
  const result = await lib.joinTypes(gitmojis, {
    types,
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
  const { types, typeNamesByCode, } = setup({
    redefinedTypes: [
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
    ],
  });
  const result = await lib.joinTypes(gitmojis, {
    types,
    typeNamesByCode,
  });
  const artNameFromResult = result.find(({ code }) => code === ':art:')!.name
  const coffinNameFromResult = result.find(({ code }) => code === ':coffin:')!.name

  expect(artNameFromResult).toEqual(types[0].name)
  expect(coffinNameFromResult).toEqual(typeNamesByCode[':coffin:'])
})

test('joins selected gitmojis types with user names and user types,\
but opts for a user type with the same code', async () => {
  const { types, typeNamesByCode, selectedTypesByCode } = setup({
    redefinedTypes: [
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
    ],
  });
  // @ts-ignore
  const authorsTypesMap = new Map(TYPE_NAMES)
  const result = await lib.joinTypes(gitmojis, {
    types,
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
  expect(artNameFromResult).toEqual(types[0].name);
  expect(zapNameFromResult).toEqual(authorsTypesMap.get(':zap:'));
  expect(fireNameFromResult).toEqual(authorsTypesMap.get(':fire:'));
})

test('returns only user types and ignores usePack option', async () => {
  const { types, } = setup({});
  const result = await lib.joinTypes(gitmojis, {
    types,
    replaceTypes: true,
    usePack: 'conventional'
  });
  expect(result).toEqual(types);
})

test('returns merged types and ignores usePack option', async () => {
  const { types, } = setup({});
  const result = await lib.joinTypes(gitmojis, {
    types,
    usePack: 'conventional'
  });
  const resultCodes = result.map(({ code }) => code)

  const userTypesCodes = types.map(({ code }) => code);
  const gitmojisCodes = gitmojis.map(({ code }) => code);
  expect(resultCodes).toEqual([...gitmojisCodes, ...userTypesCodes]);
})

test('returns conventional pack of gitmojis, when usePack option tells so', async () => {
  const { typeNamesByCode, selectedTypesByCode } = setup({});
  const conventionalEntries = Object.entries(CONVENTIONAL_NAMES);
  const result = await lib.joinTypes(gitmojis, {
    typeNamesByCode,
    selectedTypesByCode,
    usePack: 'conventional',
  });
  const resultEntries = result.map(({ code, name }) => [code, name])

  expect(resultEntries).toEqual(expect.arrayContaining(conventionalEntries));
})
