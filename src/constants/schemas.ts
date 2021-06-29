import * as yup from 'yup';

export const USER_TYPES_SCHEME = yup.array().of(yup.object().shape({
  emoji: yup
    .string()
    .min(1, 'emoji must include at least 1 character')
    .required(),
  code: yup
    .string()
    .required()
    .matches(/:\S+:/, 'code must be of ":code:" format'),
  description: yup
    .string()
    .min(5)
    .required(),
  name: yup
    .string()
    .min(2)
    .required(),
}));
