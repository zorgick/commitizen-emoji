import {
  ValidateUserTypeListType,
} from 'types';
import {
  USER_TYPES_SCHEME,
} from 'consts';

export const validateUserTypeList: ValidateUserTypeListType = async (typeList) => {
  try {
    await USER_TYPES_SCHEME.validate(typeList, { strict: true, abortEarly: true });
  } catch (error) {
    const validationError: any = new Error(error.errors[0]);
    validationError.errorInfo = error.params;
    validationError.stack = '';
    throw validationError;
  }
}
