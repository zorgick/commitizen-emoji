import path from 'path';
import fs from 'fs';

import {
  LoadLocalFileType,
} from 'types'

/** 
 * This function loads any local file.
 * If the file is of type json, then it parses it
 * @return {Object} gitmoji-types object
 */
export const loadLocalFile: LoadLocalFileType = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  if (path.extname(filePath) === '.json') {
    return JSON.parse(fileContents);
  }
  return fileContents;
};
