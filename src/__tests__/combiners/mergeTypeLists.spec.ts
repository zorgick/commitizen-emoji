import lib from 'lib';
import { gitmojis } from '../fixtures/testFile.json'

test('returns default gitmoji types appended with user emoji types', () => {
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
  const result = lib.mergeTypeLists(gitmojis, userTypes);
  expect(result).toEqual([...gitmojis, ...userTypes]);
})

test('returns default gitmoji types with inserted user emoji types', () => {
  const gitmojisTypes = [...gitmojis];
  const userTypes = [
    {
      emoji: "=)",
      code: ":art:",
      description: "Happy test.",
      name: "happy",
    },
    {
      emoji: "=(",
      code: ":coffin:",
      description: "Sad test.",
      name: "sad",
    },
  ];
  const result = lib.mergeTypeLists(gitmojis, userTypes);
  const artIndex = gitmojisTypes.findIndex(({ code }) => code === ':art:');
  const coffinIndex = gitmojisTypes.findIndex(({ code }) => code === ':coffin:');
  // @ts-ignore
  gitmojisTypes[artIndex] = userTypes[0];
  // @ts-ignore
  gitmojisTypes[coffinIndex] = userTypes[1];
  expect(result).toEqual(gitmojisTypes);
})

test('returns default gitmoji types with inserted and added user emoji types', () => {
  const gitmojisTypes = [...gitmojis];
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
  const result = lib.mergeTypeLists(gitmojis, userTypes);
  const artIndex = gitmojisTypes.findIndex(({ code }) => code === ':art:');
  // @ts-ignore
  gitmojisTypes[artIndex] = userTypes[0];
  expect(result).toEqual([...gitmojisTypes, userTypes[1]]);
})

test('inserts the latest user type of the same code', () => {
  const gitmojisTypes = gitmojis.slice(0, 3);
  const userTypes = [
    {
      emoji: "=)",
      code: ":zap:",
      description: "Happy test.",
      name: "happy",
    },
    {
      emoji: "=(",
      code: ":zap:",
      description: "Sad test.",
      name: "sad",
    },
  ];
  const result = lib.mergeTypeLists(gitmojisTypes, userTypes);
  const zapIndex = gitmojisTypes.findIndex(({ code }) => code === ':zap:');
  // @ts-ignore
  gitmojisTypes[zapIndex] = userTypes[1];
  expect(result).toHaveLength(3);
  expect(result).toEqual(gitmojisTypes);
})
