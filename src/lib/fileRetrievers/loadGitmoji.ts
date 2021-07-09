import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

import {
  LoadGitmojiType,
  GitmojiObjectType,
  ResponseGitmojiType,
} from 'types'

import {
  ERROR_GITMOJI_FETCH,
} from 'consts'

import {
  loadLocalFile,
} from './index'

/** 
 * This function loads up-to-date version of gitmoji file via network
 * OR uses local version if it exists
 * @return {Object} gitmoji-types object
 */
export const loadGitmoji: LoadGitmojiType = async () => {
  const filePath = path.join(__dirname, '..', '..', 'data', 'gitmojis.json');
  const dirPath = path.dirname(filePath);
  let gitmojiTypes: GitmojiObjectType[] = [];

  // create directory if it doesn't exist yet
  if (!fs.existsSync(dirPath)) {
    await fs.promises.mkdir(dirPath);
  }
  if (fs.existsSync(filePath)) {
    // Read contents from existing file
    gitmojiTypes = await loadLocalFile<GitmojiObjectType[]>(filePath);
  } else {
    // or download gitmojis.json, if it doesn't exist yet
    try {
      const gitmojiJson: ResponseGitmojiType = await fetch('https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json')
        .then(res => res.json());
      gitmojiTypes = gitmojiJson.gitmojis;
      await fs.promises.writeFile(filePath, JSON.stringify(gitmojiTypes, undefined, 2));
    } catch (error) {
      /* istanbul ignore next */
      throw Error(ERROR_GITMOJI_FETCH + '\n\n\n' + error);
    }
  }
  return gitmojiTypes;
};

