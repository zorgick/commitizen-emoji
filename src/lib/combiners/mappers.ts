import {
  TYPE_NAMES,
} from 'consts';
import {
  MapTypeNamesType,
  CodeNamesType,
  GitmojiObjectType,
  MapSelectedCodesType,
  ReplaceDefaultTypeNamesType,
} from 'types';

import {
  validateUserTypeName,
} from '../index';

export const mapSelectedCodes: MapSelectedCodesType = (selectedTypeNames) => {
  let typePairs = TYPE_NAMES;
  if (selectedTypeNames && Array.isArray(selectedTypeNames)) {
    typePairs = TYPE_NAMES.filter(([code]) => selectedTypeNames.includes(code));
  }
  return typePairs;
};

export const replaceDefaultTypeNames: ReplaceDefaultTypeNamesType = (
  selectedTypePairs,
  userTypeNames
) => {
  // @ts-ignore
  const defaultTypeNames = new Map<string, string>(TYPE_NAMES);
  // @ts-ignore
  const preferedTypeNames = new Map<string, string>(selectedTypePairs);
  type DefaultsMapType = typeof preferedTypeNames;

  // if user type names are given we need to replace
  // the default type names with the user ones
  if (userTypeNames) {
    Object.entries(userTypeNames).forEach(([code, name]: [string, any]) => {
      try {
        // this will throw if a user emoji code or a type name are corrupted
        // (non-existent or of a wrong format)
        validateUserTypeName<DefaultsMapType>(
          [code, name],
          preferedTypeNames
        );

        // set user defined type names to gitmoji codes.
        // Name is in fact of type string, but ts accepts only literals here
        // from default TYPE_NAMES
        preferedTypeNames.set(code as CodeNamesType, name as any);
      } catch (error) {
        // The above try block may throw, if a selected emoji set
        // doesn't include emoji code that exists in the default gitmoji set. 
        // If it is so, then do not fall and continue iteration.
        // But do fall if a user type name is of a wrong type.
        if (error.message.includes('type name') || !defaultTypeNames.has(code)) {
          throw error;
        }
      }
    });
  }
  return preferedTypeNames;
};

export const mapTypeNames: MapTypeNamesType = (
  gitmojiTypes,
  {
    selectedTypeNames,
    userTypeNames = null,
  } = {}
) => {
  // choose only selected set of emojis to
  // not iterate over all of them;
  // OR use the whole set of default emojis
  const typePairs = mapSelectedCodes(selectedTypeNames);
  const preferedTypeNames = replaceDefaultTypeNames(typePairs, userTypeNames);

  // leave only selected set of gitmojis
  // and change their names
  return gitmojiTypes
    .filter(({ code }) => preferedTypeNames.has(code))
    .map((gitMojiObject) => ({
      ...gitMojiObject,
      name: preferedTypeNames.get(gitMojiObject.code) as string,
    }));
};
