export const ERROR_TYPE_NAME_FORMAT = (name: any) =>
  `Provided type name "${name}" is not a string.
Please, provide a correct string type.`

export const ERROR_MISSING_EMOJI_CODE = (code: string) =>
  `Provided emoji code "${code}" doesn't exist in gitmoji type codes.
Please, check the code name or its format.`

export const ERROR_GITMOJI_FETCH =
  'Failed to fetch gitmoji JSON, please refer to\
https://github.com/zorgick/commitizen-emoji/issues for help.'
