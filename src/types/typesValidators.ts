import {
  MapInstance,
  CodeNamesType,
} from './index';

// DTOs

// Functions

export type ValidateUserTypeNameType = <T extends MapInstance<any, any>>(
  emojiPair: [string, any],
  defaultTypeNames: T,
) => void;
export type ValidateSelectedEmojiCodesType = <T extends MapInstance<any, any>>(
  emojiCode: any,
  defaultCodeNames: CodeNamesType[],
) => void;
