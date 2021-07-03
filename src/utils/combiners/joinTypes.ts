import {
  JoinTypesType,
  GitmojiObjectType,
} from 'types';

import {
  CONVENTIONAL_TYPES,
  CONVENTIONAL_NAMES
} from 'consts';

import {
  mapTypeNames,
  mergeTypeLists,
} from './index';

import {
  validateUserTypeList,
} from '../index';

export const joinTypes: JoinTypesType = async (gitmojiTypes, userConfig) => {
  let unifiedTypes: GitmojiObjectType[] = [];
  const hasUserTypes = userConfig && Reflect.has(userConfig, 'types')
    && Array.isArray(userConfig.types) && userConfig.types.length;

  // fall in case any user type doesn't conform to the 
  // gitmoji types format
  if (hasUserTypes) {
    await validateUserTypeList(userConfig!.types!);
  }

  // use replaced types if flag is on and types are provided
  if (hasUserTypes && userConfig!.replaceTypes) {
    unifiedTypes = [...userConfig!.types!];
  } else if (hasUserTypes) {
    // before merging types we need to select user preferred types OR all of them
    // and assign preferred type names (user's or author's)
    unifiedTypes = mergeTypeLists(mapTypeNames(gitmojiTypes, {
      selectedTypeNames: userConfig!.selectedTypesByCode,
      userTypeNames: userConfig!.typeNamesByCode,
    }), userConfig!.types!);
  } else if (userConfig?.usePack === 'conventional') {
    unifiedTypes = mapTypeNames(gitmojiTypes, {
      selectedTypeNames: CONVENTIONAL_TYPES,
      userTypeNames: CONVENTIONAL_NAMES,
    })
  } else {
    // userConfig has no configuration concerning emoji types,
    // so use an author's default type names
    unifiedTypes = mapTypeNames(gitmojiTypes)
  }

  return unifiedTypes;
}
