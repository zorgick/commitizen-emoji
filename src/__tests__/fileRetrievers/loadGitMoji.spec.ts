import path from 'path';
import fs from 'fs';
import lib from 'lib';

import testFile from '../fixtures/testFile.json';

const setup = () => {
  const rm = fs.promises.rm;
  const unlink = fs.promises.unlink;
  const pathToGimojis = path.join(__dirname, '..', '..', 'data', 'gitmojis.json')
  const pathToGimojisDir = path.dirname(pathToGimojis);

  return {
    unlink,
    rm,
    pathToGimojis,
    pathToGimojisDir,
  }
}

test('creates directory, if it doesn\'t exist yet', async () => {
  const {
    rm,
    pathToGimojisDir,
  } = setup();
  if (fs.existsSync(pathToGimojisDir)) {
    await rm(pathToGimojisDir, { recursive: true });
  }
  expect(fs.existsSync(pathToGimojisDir)).toEqual(false);

  await lib.loadGitmoji();

  expect(fs.existsSync(pathToGimojisDir)).toEqual(true);
});

test('loads via network (mock) missing gitmojis file', async () => {
  const {
    unlink,
    pathToGimojis,
  } = setup();
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
  const {
    unlink,
    pathToGimojis,
  } = setup();
  expect(fs.existsSync(pathToGimojis)).toEqual(true);
  const result = await lib.loadGitmoji();

  expect(result).toEqual(expect.objectContaining(testFile.gitmojis))
});
