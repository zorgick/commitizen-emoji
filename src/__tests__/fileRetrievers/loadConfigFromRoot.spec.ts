import fs from 'fs';
import utils from 'utils';

import testCzrc from '../fixtures/testCzrc.json';

test('returns null if file is nonexistant', async () => {
  const pathToNowhere = 'none';
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot');

  expect(fs.existsSync(pathToNowhere)).toEqual(false);

  const result = await utils.loadConfigFromUserRoot(pathToNowhere);

  expect(result).toEqual(null)
  loadConfigFromUserRootSpy.mockRestore();
});

test('returns null if no file path is provided', async () => {
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot');

  const result = await utils.loadConfigFromUserRoot();

  expect(result).toEqual(null)
  loadConfigFromUserRootSpy.mockRestore();
});

test('loads package.json file and returns commitizenEmoji config', async () => {
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot');

  const result = await utils.loadConfigFromUserRoot('testPackage.json');

  expect(result).toEqual(expect.objectContaining(testCzrc.config.commitizenEmoji))
  loadConfigFromUserRootSpy.mockRestore();
});

test('loads .czrc file and returns commitizenEmoji config', async () => {
  const loadConfigFromUserRootSpy = jest.spyOn(utils, 'loadConfigFromUserRoot');

  const result = await utils.loadConfigFromUserRoot('.testCzrc');

  expect(result).toEqual(expect.objectContaining(testCzrc.config.commitizenEmoji))
  loadConfigFromUserRootSpy.mockRestore();
});
