export * from './fileRetrievers';
export * from './combiners';
export * from './validators';
export * from './formatters';
// exports for tests
import * as fileRetrievers from './fileRetrievers';
import * as combiners from './combiners';
import * as validators from './validators';
import * as formatters from './formatters';

export default {
  ...fileRetrievers,
  ...combiners,
  ...validators,
  ...formatters,
}
