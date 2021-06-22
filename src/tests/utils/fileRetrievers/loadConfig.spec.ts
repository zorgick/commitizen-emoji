import path from 'path';
import fs from 'fs';
import utils from 'utils';

import testCzrc from '../../fixtures/testCzrc.json';


test('loads json file and returns commitizenEmoji config', async () => {
  const pathToCzrc = path.join(
    __dirname,
    '..',
    '..',
    'fixtures',
    'testCzrc.json',
  );
  const loadConfigSpy = jest.spyOn(utils, 'loadConfig');

  expect(fs.existsSync(pathToCzrc)).toEqual(true);

  const result = await utils.loadConfig(pathToCzrc);

  expect(result).toEqual(expect.objectContaining(testCzrc.config.commitizenEmoji))
  loadConfigSpy.mockRestore();
});

test('loads .czrc file (string) and returns commitizenEmoji config', async () => {
  const pathToRawCzrc = path.join(
    __dirname,
    '..',
    '..',
    'fixtures',
    '.testRawCzrc',
  );
  const loadConfigSpy = jest.spyOn(utils, 'loadConfig');

  expect(fs.existsSync(pathToRawCzrc)).toEqual(true);

  const result = await utils.loadConfig(pathToRawCzrc);

  expect(result).toEqual(expect.objectContaining(testCzrc.config.commitizenEmoji))
  loadConfigSpy.mockRestore();
});

test('returns null if file is nonexistant', async () => {
  const pathToNowhere = '/path/does/not/exist';
  const loadConfigSpy = jest.spyOn(utils, 'loadConfig');

  expect(fs.existsSync(pathToNowhere)).toEqual(false);

  const result = await utils.loadConfig(pathToNowhere);

  expect(result).toEqual(null)
  loadConfigSpy.mockRestore();
});
