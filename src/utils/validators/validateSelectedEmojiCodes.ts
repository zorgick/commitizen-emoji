import {
  ValidateSelectedEmojiCodesType,
} from 'types'
import {
  ERROR_MISSING_EMOJI_CODE,
} from 'consts';

export const validateSelectedEmojiCodes: ValidateSelectedEmojiCodesType = (
  code,
  defaultCodeNames
) => {
  if (!defaultCodeNames.includes(code)) {
    throw new Error(ERROR_MISSING_EMOJI_CODE(code));
  }
};
