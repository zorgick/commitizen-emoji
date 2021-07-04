import {
  ConfigType,
  UniteConfigsType,
} from 'types'

import {
  mapTypeNames,
  joinTypes,
} from './index'

export const uniteConfigs: UniteConfigsType = async (
  defaultConfig,
  userConfig,
  gitmojiTypes
) => {
  let unifiedConfig: Partial<ConfigType> = { ...defaultConfig };

  // return default config and type names if userConfig is not provided
  if (!userConfig) {
    unifiedConfig.types = mapTypeNames([...gitmojiTypes])
    return unifiedConfig as ConfigType;
  }
  // get all options except types to override the default config
  const { types, ...remainingUserConfig } = userConfig;
  unifiedConfig = {
    ...unifiedConfig,
    ...remainingUserConfig,
  }
  const result = await joinTypes(gitmojiTypes, userConfig)
  unifiedConfig.types = result

  return unifiedConfig as ConfigType;
};
