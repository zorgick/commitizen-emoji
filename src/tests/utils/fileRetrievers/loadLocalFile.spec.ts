import path from 'path';
import utils from 'utils';

import testFile from '../../fixtures/testFile.json';

test('returns null if a file path is not provided', async () => {
  const loadLocalFileSpy = jest.spyOn(utils, 'loadLocalFile');
  const result = await utils.loadLocalFile();

  expect(loadLocalFileSpy).toHaveBeenCalled();
  expect(result).toEqual(null);
  loadLocalFileSpy.mockRestore();
});

test('returns null if a file doesn\'t exist on a dedicated path', async () => {
  const loadLocalFileSpy = jest.spyOn(utils, 'loadLocalFile');
  const result = await utils.loadLocalFile('/path/does/not/exist');
  expect(result).toEqual(null);

  loadLocalFileSpy.mockRestore();
});

test('returns null if path is not provided', async () => {
  const loadLocalFileSpy = jest.spyOn(utils, 'loadLocalFile');
  const result = await utils.loadLocalFile();
  expect(result).toEqual(null);

  loadLocalFileSpy.mockRestore();
});

test('reads and returns contents of a simple text file', async () => {
  const pathToFile = path.join(__dirname, '..', '..', 'fixtures', 'testFile.txt');
  const loadLocalFileSpy = jest.spyOn(utils, 'loadLocalFile');
  const result = await utils.loadLocalFile(pathToFile);
  expect(result).toContain("I'm a test file")

  loadLocalFileSpy.mockRestore();
});

test('reads and returns object from a json file', async () => {
  const pathToFile = path.join(__dirname, '..', '..', 'fixtures', 'testFile.json');
  const loadLocalFileSpy = jest.spyOn(utils, 'loadLocalFile');
  const result = await utils.loadLocalFile(pathToFile);
  expect(result).toEqual(testFile)

  loadLocalFileSpy.mockRestore();
});
