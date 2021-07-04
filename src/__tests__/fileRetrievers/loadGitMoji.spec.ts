import path from 'path';
import fs from 'fs';
import util from 'util';
import lib from 'lib';

import testFile from '../fixtures/testFile.json';

const unlink = util.promisify(fs.unlink);
const pathToGimojis = path.join(__dirname, '..', '..', 'data', 'gitmojis.json')

test('loads via network (mock) missing gitmojis file', async () => {
  // remove file, if it exists
  if (fs.existsSync(pathToGimojis)) {
    await unlink(pathToGimojis);
  }
  expect(fs.existsSync(pathToGimojis)).toEqual(false);

  const result = await lib.loadGitmoji();

  expect(fs.existsSync(pathToGimojis)).toEqual(true);
  expect(result).toEqual(expect.objectContaining(testFile.gitmojis))
});

test('loads file from local fs', async () => {
  expect(fs.existsSync(pathToGimojis)).toEqual(true);
  const result = await lib.loadGitmoji();

  expect(result).toEqual(expect.objectContaining(testFile.gitmojis))
});
