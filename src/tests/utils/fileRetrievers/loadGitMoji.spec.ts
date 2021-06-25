import path from 'path';
import fs from 'fs';
import util from 'util';
import utils from 'utils';

import testFile from '../../fixtures/testFile.json';

const unlink = util.promisify(fs.unlink);
const pathToGimojis = path.join(__dirname, '..', '..', '..', 'data', 'gitmojis.json')

test('loads via network (mock) missing gitmojis file', async () => {
  // remove file, if it exists
  if (fs.existsSync(pathToGimojis)) {
    await unlink(pathToGimojis);
  }
  expect(fs.existsSync(pathToGimojis)).toEqual(false);

  const result = await utils.loadGitmoji();

  expect(fs.existsSync(pathToGimojis)).toEqual(true);
  expect(result).toEqual(expect.objectContaining(testFile.gitmojis))
  loadGitmojiSpy.mockRestore();
});

test('loads file from local fs', async () => {
  expect(fs.existsSync(pathToGimojis)).toEqual(true);
  const result = await utils.loadGitmoji();

  expect(result).toEqual(expect.objectContaining(testFile.gitmojis))
});
