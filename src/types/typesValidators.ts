import {
  MapInstance,
  CodeNamesType,
  CommonObjectType,
} from './index';

// DTOs

// Functions

export type ValidateUserTypeListType = (
  typeList: CommonObjectType[],
) => void;
export type ValidateUserTypeNameType = <T extends MapInstance<any, any>>(
  emojiPair: [string, any],
  defaultTypeNames: T,
) => void;
export type ValidateSelectedEmojiCodesType = (
  emojiCode: any,
  defaultCodeNames: CodeNamesType[],
) => void;
