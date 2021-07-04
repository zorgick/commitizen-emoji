import path from 'path';
import util from 'util';
import fs from 'fs';

import {
  LoadLocalFileType,
} from 'types'

const readFile = util.promisify(fs.readFile);

/** 
 * This function loads any local file.
 * If the file is of type json, then it parses it
 * @return {Object} gitmoji-types object
 */
export const loadLocalFile: LoadLocalFileType = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = await readFile(filePath, 'utf8')
  if (path.extname(filePath) === '.json') {
    return JSON.parse(fileContents);
  }
  return fileContents;
};
