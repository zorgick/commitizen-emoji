import {
  TYPE_NAMES,
} from 'consts';
import {
  MapTypeNamesType,
  CodeNamesType,
  GitmojiObjectType
} from 'types'

import {
  validateUserTypeName,
} from '../index'

/**
 * The purpose of this function is to map default
 * gitmoji type names with user defined ones if provided
 * or with author's default type names.
 @return {Array.<GitmojiObjectType>} list of gitmojis with changed type names
 */
export const mapTypeNames: MapTypeNamesType = (gitmojiTypes, userTypeNames) => {
  const defaultPreferedTypeNames = new Map(TYPE_NAMES);
  type DefaultsMapType = typeof defaultPreferedTypeNames;

  // if user type names are given we need to replace
  // default type names with user ones
  if (userTypeNames) {
    Object.entries(userTypeNames).forEach(([code, name]: [string, any]) => {
      // this will throw if user emoji code or type name are corrupted
      // (non-existant or of a wrong format)
      validateUserTypeName<DefaultsMapType>([code, name], defaultPreferedTypeNames);

      // set user defined type names to gitmoji codes.
      // Name is in fact of type string, but ts accepts only literals here
      // from default TYPE_NAMES
      defaultPreferedTypeNames.set(code as CodeNamesType, name as any);
    });
  }

  return gitmojiTypes.map(gitMojiObject => ({
    ...gitMojiObject,
    name: defaultPreferedTypeNames.get(gitMojiObject.code) as string,
  }));
};
