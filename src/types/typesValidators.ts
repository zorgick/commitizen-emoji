import {
  MapInstance,
} from './index';

// DTOs

// Functions

export type ValidateUserTypeNameType = <T extends MapInstance<any, any>>(
  emojiPair: [string, any],
  defaultTypeNames: T,
) => void;
