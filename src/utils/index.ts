export * from './fileRetrievers';
export * from './combiners';
export * from './validators';
// exports for tests
import * as fileRetrievers from './fileRetrievers';
import * as combiners from './combiners';
import * as validators from './validators';

export default {
  ...fileRetrievers,
  ...combiners,
  ...validators,
}
