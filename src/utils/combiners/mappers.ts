import {
  TYPE_NAMES,
} from 'consts';
import {
  MapTypeNamesType,
  CodeNamesType,
  GitmojiObjectType,
  MapSelectedCodesType,
} from 'types'

import {
  validateUserTypeName,
} from '../index'

export const mapSelectedCodes: MapSelectedCodesType = (selectedTypeNames) => {
  let typePairs = TYPE_NAMES;
  if (selectedTypeNames && Array.isArray(selectedTypeNames)) {
    typePairs = TYPE_NAMES.filter(([code]) => selectedTypeNames.includes(code));
  }
  return typePairs;
}

export const mapTypeNames: MapTypeNamesType = (
  gitmojiTypes,
  {
    selectedTypeNames,
    userTypeNames,
  } = {}
) => {
  const typePairs = mapSelectedCodes(selectedTypeNames);
  // @ts-ignore
  const defaultPreferedTypeNames = new Map<string, string>(typePairs);
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

  return gitmojiTypes
    .filter(({ code }) => defaultPreferedTypeNames.has(code))
    .map((gitMojiObject) => ({
      ...gitMojiObject,
      name: defaultPreferedTypeNames.get(gitMojiObject.code) as string,
    }));
};
