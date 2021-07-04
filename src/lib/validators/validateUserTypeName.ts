import {
  ValidateUserTypeNameType,
} from 'types'
import {
  ERROR_TYPE_NAME_FORMAT,
  ERROR_MISSING_EMOJI_CODE,
} from 'consts';

export const validateUserTypeName: ValidateUserTypeNameType = ([code, name], defaultTypeNames) => {
  // typescript assumes that entries returns array of string pairs
  // but in fact second value can be of any type
  if (typeof name !== 'string') {
    throw new Error(ERROR_TYPE_NAME_FORMAT(name));
  }

  if (!defaultTypeNames.has(code)) {
    throw new Error(ERROR_MISSING_EMOJI_CODE(code));
  }
};
