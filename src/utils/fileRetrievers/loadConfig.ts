import findUp from 'find-up';
import os from 'os';
import path from 'path';
import {
  ConfigType,
  CommitizenConfigType,
  LoadConfigType,
} from 'types'
import {
  loadLocalFile,
} from './index'

/** 
 * This function loads commitizen config file from a specified path
 * @return {Object} user's commitizenEmoji config object
 */
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

/** 
 * This function loads commitizen config file from a
 * user's project rootDir directory
 * @return {Object} user's commitizenEmoji config object
 */
export const loadConfigFromUserRoot: LoadConfigType = async (filePath) => {
  if (!filePath) {
    return null;
  }

  const resolvedPath = await findUp(filePath);
  return loadConfig(resolvedPath);
};
