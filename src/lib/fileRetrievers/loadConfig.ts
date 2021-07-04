import findUp from 'find-up';
import os from 'os';
import path from 'path';

import {
  ConfigType,
  CommitizenConfigType,
  LoadConfigType,
  GetConfigType,
} from 'types'

import {
  DEFAULT_CONFIG,
} from 'consts';

import {
  uniteConfigs,
} from '../index'

import {
  loadLocalFile,
  loadGitmoji,
} from './index'

export const loadConfig: LoadConfigType = async (filePath) => {
  const configFile = await loadLocalFile<CommitizenConfigType | null>(filePath);
  let configObject = configFile;

  if (typeof configFile === 'string') {
    configObject = JSON.parse(configFile);
  }

  if (configObject?.config?.commitizenEmoji) {
    return configObject.config.commitizenEmoji;
  }
  return null;
};

// reads user config from user's root directory (with package.json)
export const loadConfigFromUserRoot: LoadConfigType = async (filePath) => {
  if (!filePath) {
    return null;
  }

  const resolvedPath = await findUp(filePath);
  return loadConfig(resolvedPath);
};

export const getConfig: GetConfigType = async () => {
  const gitmojiTypes = await loadGitmoji();

  const defaultConfig: ConfigType = DEFAULT_CONFIG;

  const userConfig =
    (await loadConfigFromUserRoot('.czrc')) ||
    (await loadConfigFromUserRoot('package.json')) ||
    (await loadConfig(path.join(os.homedir(), '.czrc')));

  return await uniteConfigs(defaultConfig, userConfig, gitmojiTypes);
}
