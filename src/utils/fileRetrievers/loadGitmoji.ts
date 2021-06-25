import fs from 'fs';
import util from 'util';
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

const writeFile = util.promisify(fs.writeFile);

/** 
 * This function loads up-to-date version of gitmoji file via network
 * OR uses local version if it exists
 * @return {Object} gitmoji-types object
 */
export const loadGitmoji: LoadGitmojiType = async () => {
  const filePath = path.join(__dirname, '..', '..', 'data', 'gitmojis.json');
  let gitmojiTypes: GitmojiObjectType[] = [];

  if (fs.existsSync(filePath)) {
    // Read contents from existing file
    gitmojiTypes = await loadLocalFile<GitmojiObjectType[]>(filePath);
  } else {
    // or download gitmojis.json, if it doesn't exist yet
    try {
      const gitmojiJson: ResponseGitmojiType = await fetch('https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json')
        .then(res => res.json());
      gitmojiTypes = gitmojiJson.gitmojis;
      await writeFile(filePath, JSON.stringify(gitmojiTypes, undefined, 2));
    } catch (e) {
      /* istanbul ignore next */
      throw Error(ERROR_GITMOJI_FETCH);
    }
  }
  return gitmojiTypes;
};

